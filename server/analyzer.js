import fs from "node:fs/promises";
import path from "node:path";

const TEXT_EXTENSIONS = new Set([
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".mjs",
  ".cjs",
  ".json",
  ".css",
  ".scss",
  ".sass",
  ".less",
  ".html",
  ".htm",
  ".md",
  ".markdown",
  ".txt",
  ".yml",
  ".yaml",
  ".toml",
  ".env",
  ".gitignore",
  ".gitattributes",
]);

const IGNORED_DIRECTORIES = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  "coverage",
  ".next",
  ".turbo",
  ".cache",
  "temp",
  "uploads",
]);

const FEATURE_PATTERNS = {
  auth: [/\bauth\b/i, /\blogin\b/i, /\bsignup\b/i, /\bsign-up\b/i, /\bregister\b/i],
  payments: [/\bchapa\b/i, /\bstripe\b/i, /\bpayment\b/i, /\bcheckout\b/i],
  dashboard: [/\bdashboard\b/i, /\badmin\b/i],
  api: [/\baxios\b/i, /\bfetch\s*\(/i, /\/api\//i],
};

function normalizeRelativePath(filePath) {
  return filePath.split(path.sep).join("/");
}

function isInsideDirectory(parentDirectory, childPath) {
  const relative = path.relative(parentDirectory, childPath);
  return relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative);
}

function hasTextExtension(filePath) {
  const baseName = path.basename(filePath).toLowerCase();
  const extension = path.extname(filePath).toLowerCase();
  return TEXT_EXTENSIONS.has(extension) || baseName === "dockerfile" || baseName === "makefile" || baseName === "package.json" || baseName === "tailwind.config.js" || baseName === "tailwind.config.ts";
}

async function walkDirectory(rootDirectory, currentDirectory = rootDirectory, files = []) {
  const entries = await fs.readdir(currentDirectory, { withFileTypes: true });

  for (const entry of entries) {
    const absolutePath = path.join(currentDirectory, entry.name);
    const relativePath = normalizeRelativePath(path.relative(rootDirectory, absolutePath));

    if (entry.isDirectory()) {
      if (IGNORED_DIRECTORIES.has(entry.name)) {
        continue;
      }

      await walkDirectory(rootDirectory, absolutePath, files);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const stat = await fs.stat(absolutePath);
    const shouldRead = hasTextExtension(entry.name) || stat.size <= 256 * 1024;

    if (!shouldRead) {
      files.push({ absolutePath, relativePath, content: "", size: stat.size });
      continue;
    }

    let content = "";
    try {
      content = await fs.readFile(absolutePath, "utf8");
    } catch {
      content = "";
    }

    files.push({ absolutePath, relativePath, content, size: stat.size });
  }

  return files;
}

function getProjectPackageJson(files) {
  return files.find((file) => file.relativePath === "package.json") ?? null;
}

function parsePackageJson(packageJsonFile) {
  if (!packageJsonFile?.content) {
    return null;
  }

  try {
    return JSON.parse(packageJsonFile.content);
  } catch {
    return null;
  }
}

function collectDependencyNames(packageJson) {
  const dependencies = packageJson?.dependencies ?? {};
  const devDependencies = packageJson?.devDependencies ?? {};
  return new Set([...Object.keys(dependencies), ...Object.keys(devDependencies)]);
}

function detectFramework(files, packageJson) {
  const dependencyNames = collectDependencyNames(packageJson);
  const combinedContent = files.map((file) => file.content).join("\n");
  const relativePaths = files.map((file) => file.relativePath);

  if (dependencyNames.has("next") || relativePaths.some((filePath) => filePath === "next.config.js" || filePath === "next.config.mjs" || filePath === "next.config.ts")) {
    return "next";
  }

  if (dependencyNames.has("vue") || relativePaths.some((filePath) => filePath.endsWith(".vue"))) {
    return "vue";
  }

  if (dependencyNames.has("express") || combinedContent.includes("express()") || combinedContent.includes("from 'express'") || combinedContent.includes('from "express"')) {
    return "express";
  }

  if (dependencyNames.has("react") || relativePaths.some((filePath) => filePath.endsWith(".jsx") || filePath.endsWith(".tsx"))) {
    return "react";
  }

  if (relativePaths.some((filePath) => filePath.includes("app/") || filePath.includes("pages/") || filePath.includes("components/"))) {
    return "react";
  }

  return "unknown";
}

function detectProjectType(framework, files) {
  const relativePaths = files.map((file) => file.relativePath);
  const hasBackendCode = framework === "express" || relativePaths.some((filePath) => filePath.includes("server/") || filePath.includes("api/") || filePath.endsWith(".server.ts") || filePath.endsWith(".server.js"));
  const hasFrontendCode = framework === "react" || framework === "next" || framework === "vue" || relativePaths.some((filePath) => filePath.includes("src/") || filePath.includes("components/") || filePath.includes("pages/") || filePath.includes("routes/") || filePath.endsWith(".tsx") || filePath.endsWith(".jsx") || filePath.endsWith(".vue"));

  if (hasBackendCode && hasFrontendCode) {
    return "fullstack";
  }

  if (hasBackendCode) {
    return "backend";
  }

  return "frontend";
}

function detectFeatures(files) {
  const combinedContent = files.map((file) => `${file.relativePath}\n${file.content}`).join("\n");

  return {
    auth: FEATURE_PATTERNS.auth.some((pattern) => pattern.test(combinedContent)),
    payments: FEATURE_PATTERNS.payments.some((pattern) => pattern.test(combinedContent)),
    dashboard: FEATURE_PATTERNS.dashboard.some((pattern) => pattern.test(combinedContent)),
    api: FEATURE_PATTERNS.api.some((pattern) => pattern.test(combinedContent)),
  };
}

function detectStructure(files) {
  const relativePaths = files.map((file) => file.relativePath);

  return {
    hasComponents: relativePaths.some((filePath) => filePath.includes("/components/") || filePath.startsWith("components/") || filePath.includes("components/")),
    hasPages: relativePaths.some((filePath) => filePath.includes("/pages/") || filePath.startsWith("pages/") || filePath.includes("/routes/") || filePath.startsWith("routes/")),
    hasServices: relativePaths.some((filePath) => filePath.includes("/services/") || filePath.startsWith("services/") || filePath.includes("/api/") || filePath.startsWith("api/")),
  };
}

function detectUi(files, packageJson) {
  const dependencyNames = collectDependencyNames(packageJson);
  const combinedContent = files.map((file) => file.content).join("\n");
  const relativePaths = files.map((file) => file.relativePath);

  const hasTailwind = dependencyNames.has("tailwindcss") || relativePaths.some((filePath) => filePath === "tailwind.config.js" || filePath === "tailwind.config.ts" || filePath === "postcss.config.js" || filePath === "postcss.config.ts") || combinedContent.includes("@tailwind");
  const hasBootstrap = dependencyNames.has("bootstrap") || dependencyNames.has("react-bootstrap") || combinedContent.includes("bootstrap.min.css") || combinedContent.includes("from 'bootstrap'") || combinedContent.includes('from "bootstrap"');
  const inlineStyleMatches = combinedContent.match(/style\s*=\s*\{/g) ?? [];

  const issues = [];

  if (!hasTailwind && !hasBootstrap) {
    issues.push("No Tailwind or Bootstrap indicators found");
  }

  if (inlineStyleMatches.length > 10) {
    issues.push(`High inline style usage detected (${inlineStyleMatches.length} occurrences)`);
  }

  return {
    framework: hasTailwind ? "tailwind" : hasBootstrap ? "bootstrap" : "none",
    issues,
  };
}

function detectPerformance(files, packageJson) {
  const dependencyNames = collectDependencyNames(packageJson);
  const combinedContent = files.map((file) => file.content).join("\n");
  const dependencyCount = dependencyNames.size;
  const issues = [];
  const hasLazyLoading = /lazy\s*\(/.test(combinedContent) || /dynamic\s*\(/.test(combinedContent) || /import\s*\(/.test(combinedContent);

  if (dependencyCount > 35) {
    issues.push(`Large dependency list detected (${dependencyCount} dependencies)`);
  }

  if (!hasLazyLoading) {
    issues.push("No lazy loading or dynamic import patterns detected");
  }

  return {
    dependencyCount,
    issues,
  };
}

function buildSuggestions(features, structure, ui, performance) {
  const suggestions = [];

  if (!features.auth) {
    suggestions.push("Add authentication system");
  }

  if (!features.payments) {
    suggestions.push("Integrate Chapa payments");
  }

  if (!structure.hasComponents || !structure.hasPages || !structure.hasServices) {
    suggestions.push("Improve project structure");
  }

  if (!features.dashboard) {
    suggestions.push("Add dashboard module");
  }

  if (ui.issues.length > 0) {
    suggestions.push("Reduce UI styling overhead");
  }

  if (performance.issues.length > 0) {
    suggestions.push("Improve performance optimizations");
  }

  return [...new Set(suggestions)];
}

export async function analyzeProjectDirectory(projectDirectory) {
  const files = await walkDirectory(projectDirectory);
  const packageJsonFile = getProjectPackageJson(files);
  const packageJson = parsePackageJson(packageJsonFile);

  const framework = detectFramework(files, packageJson);
  const projectType = detectProjectType(framework, files);
  const features = detectFeatures(files);
  const structure = detectStructure(files);
  const ui = detectUi(files, packageJson);
  const performance = detectPerformance(files, packageJson);
  const suggestions = buildSuggestions(features, structure, ui, performance);

  return {
    framework,
    projectType,
    features,
    structure,
    ui,
    performance,
    suggestions,
  };
}

export function resolveProjectDirectory(rootDirectory, projectId) {
  return path.join(rootDirectory, projectId);
}

export function isProjectDirectorySafe(rootDirectory, projectDirectory) {
  return isInsideDirectory(rootDirectory, projectDirectory);
}

export { walkDirectory };