import cors from "cors";
import express from "express";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { randomUUID } from "node:crypto";
import multer from "multer";
import simpleGit from "simple-git";
import unzipper from "unzipper";
import {
  analyzeProjectDirectory,
  isProjectDirectorySafe,
  resolveProjectDirectory,
} from "./analyzer.js";

const PORT = Number(process.env.PORT ?? 4000);
const ROOT_DIRECTORY = process.cwd();
const TEMP_DIRECTORY = path.join(ROOT_DIRECTORY, "temp");
const MAX_UPLOAD_SIZE = 50 * 1024 * 1024;

await fsp.mkdir(TEMP_DIRECTORY, { recursive: true });

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "1mb" }));

function createProjectId() {
  return randomUUID();
}

function getProjectPaths(projectId) {
  const projectDirectory = resolveProjectDirectory(TEMP_DIRECTORY, projectId);

  if (!isProjectDirectorySafe(TEMP_DIRECTORY, projectDirectory)) {
    throw new Error("Unsafe project path");
  }

  return {
    projectDirectory,
    uploadDirectory: path.join(projectDirectory, "upload"),
    extractedDirectory: path.join(projectDirectory, "extracted"),
    repositoryDirectory: path.join(projectDirectory, "repository"),
  };
}

function ensureDirectory(directoryPath) {
  fs.mkdirSync(directoryPath, { recursive: true });
}

function cleanupProjectDirectory(projectDirectory) {
  return fsp.rm(projectDirectory, { recursive: true, force: true });
}

function isSafeZipEntry(destinationDirectory, entryPath) {
  const normalizedEntryPath = entryPath.replace(/\\/g, "/");
  if (!normalizedEntryPath || normalizedEntryPath.startsWith("/") || normalizedEntryPath.includes("..")) {
    return false;
  }

  const resolvedPath = path.resolve(destinationDirectory, normalizedEntryPath);
  const relativePath = path.relative(destinationDirectory, resolvedPath);
  return relativePath && !relativePath.startsWith("..") && !path.isAbsolute(relativePath);
}

async function extractZipArchive(zipFilePath, destinationDirectory) {
  ensureDirectory(destinationDirectory);

  const archive = await unzipper.Open.file(zipFilePath);

  if (!archive.files.length) {
    throw new Error("Empty ZIP archive");
  }

  let extractedFileCount = 0;

  for (const entry of archive.files) {
    const normalizedEntryPath = entry.path.replace(/\\/g, "/");

    if (!normalizedEntryPath || normalizedEntryPath.startsWith("__MACOSX/") || normalizedEntryPath.endsWith("/")) {
      continue;
    }

    if (!isSafeZipEntry(destinationDirectory, normalizedEntryPath)) {
      throw new Error(`Unsafe archive path: ${normalizedEntryPath}`);
    }

    const extractedPath = path.resolve(destinationDirectory, normalizedEntryPath);
    ensureDirectory(path.dirname(extractedPath));

    if (entry.type === "Directory") {
      ensureDirectory(extractedPath);
      continue;
    }

    await pipeline(entry.stream(), fs.createWriteStream(extractedPath));
    extractedFileCount += 1;
  }

  if (extractedFileCount === 0) {
    throw new Error("ZIP archive does not contain extractable files");
  }
}

function validateGitHubRepoUrl(repoUrl) {
  let parsedUrl;

  try {
    parsedUrl = new URL(repoUrl);
  } catch {
    return null;
  }

  if (parsedUrl.protocol !== "https:" || parsedUrl.hostname.toLowerCase() !== "github.com") {
    return null;
  }

  const segments = parsedUrl.pathname.split("/").filter(Boolean);

  if (segments.length !== 2) {
    return null;
  }

  const [owner, repositoryWithPossibleExtension] = segments;
  const repository = repositoryWithPossibleExtension.replace(/\.git$/i, "");

  if (!owner || !repository) {
    return null;
  }

  return {
    owner,
    repository,
    cloneUrl: `https://github.com/${owner}/${repository}.git`,
  };
}

async function cloneRepository(cloneUrl, destinationDirectory) {
  ensureDirectory(path.dirname(destinationDirectory));
  await fsp.rm(destinationDirectory, { recursive: true, force: true });

  const git = simpleGit({ baseDir: path.dirname(destinationDirectory) });
  await git.clone(cloneUrl, destinationDirectory, ["--depth", "1"]);
}

function getUploadedFile(req) {
  const files = req.files ?? {};
  const candidates = [files.file, files.zip, files.archive].flat().filter(Boolean);
  return candidates[0] ?? null;
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      try {
        const projectId = req.projectId;
        const { uploadDirectory } = getProjectPaths(projectId);
        ensureDirectory(uploadDirectory);
        callback(null, uploadDirectory);
      } catch (error) {
        callback(error);
      }
    },
    filename: (_req, file, callback) => {
      const originalExtension = path.extname(file.originalname ?? "");
      callback(null, `project-${Date.now()}${originalExtension || ".zip"}`);
    },
  }),
  limits: { fileSize: MAX_UPLOAD_SIZE },
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post(
  "/api/upload-zip",
  (req, _res, next) => {
    req.projectId = createProjectId();
    next();
  },
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "zip", maxCount: 1 },
    { name: "archive", maxCount: 1 },
  ]),
  async (req, res) => {
    const projectId = req.projectId;
    const uploadedFile = getUploadedFile(req);

    if (!uploadedFile) {
      res.status(400).json({ error: "A ZIP file must be uploaded using file, zip, or archive" });
      return;
    }

    const { projectDirectory, extractedDirectory } = getProjectPaths(projectId);

    try {
      ensureDirectory(projectDirectory);
      await extractZipArchive(uploadedFile.path, extractedDirectory);

      res.status(201).json({
        projectId,
        path: extractedDirectory,
      });
    } catch (error) {
      await cleanupProjectDirectory(projectDirectory);
      res.status(400).json({
        error: error instanceof Error ? error.message : "Unable to process ZIP archive",
      });
    }
  }
);

app.post("/api/analyze-zip", async (req, res) => {
  const { projectId } = req.body ?? {};

  if (typeof projectId !== "string" || !projectId.trim()) {
    res.status(400).json({ error: "projectId is required" });
    return;
  }

  const { projectDirectory, extractedDirectory } = getProjectPaths(projectId.trim());

  try {
    const projectStats = await fsp.stat(extractedDirectory);
    if (!projectStats.isDirectory()) {
      res.status(404).json({ error: "Extracted project directory not found" });
      return;
    }

    const report = await analyzeProjectDirectory(extractedDirectory);
    res.json(report);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Project not found";
    const statusCode = message.includes("ENOENT") ? 404 : 400;
    if (statusCode === 404) {
      await cleanupProjectDirectory(projectDirectory);
    }
    res.status(statusCode).json({ error: message });
  }
});

app.post("/api/analyze-github", async (req, res) => {
  const { repoUrl } = req.body ?? {};

  if (typeof repoUrl !== "string" || !repoUrl.trim()) {
    res.status(400).json({ error: "repoUrl is required" });
    return;
  }

  const parsedRepo = validateGitHubRepoUrl(repoUrl.trim());

  if (!parsedRepo) {
    res.status(400).json({ error: "repoUrl must be a valid https://github.com/{owner}/{repo} URL" });
    return;
  }

  const projectId = createProjectId();
  const { projectDirectory, repositoryDirectory } = getProjectPaths(projectId);

  try {
    ensureDirectory(projectDirectory);
    await cloneRepository(parsedRepo.cloneUrl, repositoryDirectory);
    const report = await analyzeProjectDirectory(repositoryDirectory);

    res.json(report);
  } catch (error) {
    await cleanupProjectDirectory(projectDirectory);

    const message = error instanceof Error ? error.message : "Unable to clone repository";
    const lowerMessage = message.toLowerCase();
    const statusCode = lowerMessage.includes("authentication") || lowerMessage.includes("permission") || lowerMessage.includes("repository not found") || lowerMessage.includes("not found") ? 403 : 502;

    res.status(statusCode).json({
      error: message,
    });
  }
});

app.use((error, _req, res, _next) => {
  res.status(500).json({
    error: error instanceof Error ? error.message : "Internal server error",
  });
});

app.listen(PORT, () => {
  process.stdout.write(`Dala Enhancer Pro backend running on http://127.0.0.1:${PORT}\n`);
});