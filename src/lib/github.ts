import JSZip from "jszip";
import { ProjectFile } from "./types";

/**
 * Parses a GitHub URL into owner, repo, and branch/ref
 */
export function parseGithubUrl(url: string) {
  try {
    const cleanUrl = url.replace(/\/$/, "");
    const parts = cleanUrl.split("/");
    
    // Standard format: https://github.com/owner/repo
    const githubIndex = parts.indexOf("github.com");
    if (githubIndex === -1 || parts.length < githubIndex + 3) {
      throw new Error("Invalid GitHub URL format");
    }

    const owner = parts[githubIndex + 1];
    const repo = parts[githubIndex + 2];
    
    // Handle branch/ref if present: https://github.com/owner/repo/tree/main
    let branch = "main";
    if (parts[githubIndex + 3] === "tree" && parts[githubIndex + 4]) {
      branch = parts[githubIndex + 4];
    }

    return { owner, repo, branch };
  } catch (error) {
    throw new Error("Failed to parse GitHub repository URL.");
  }
}

/**
 * Fetches a repository archive from GitHub and converts it to ProjectFile format
 */
export async function fetchGithubRepo(url: string, token?: string): Promise<{ name: string; files: ProjectFile[] }> {
  const { owner, repo, branch } = parseGithubUrl(url);
  
  // Use the GitHub API to get the ZIP archive
  // Note: zipball/ref is a redirect to the actual zip download
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/zipball/${branch}`;
  
  const headers: HeadersInit = {
    "Accept": "application/vnd.github.v3+json",
  };
  
  if (token) {
    headers["Authorization"] = `token ${token}`;
  }

  const response = await fetch(apiUrl, { headers });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Repository not found or access denied. Private repositories require a token.");
    }
    if (response.status === 403 && response.headers.get("x-ratelimit-remaining") === "0") {
      throw new Error("GitHub API rate limit exceeded. Please provide a token to increase limits.");
    }
    throw new Error(`GitHub API Error: ${response.statusText}`);
  }

  const blob = await response.blob();
  const zip = new JSZip();
  const content = await zip.loadAsync(blob);
  
  const files: ProjectFile[] = [];
  
  // The first folder in the zipball is usually "owner-repo-commitsh"
  // We want to skip this root folder to get the actual project structure
  const entries = Object.entries(content.files);
  const rootFolder = entries[0]?.[0].split("/")[0] + "/";

  for (const [path, zipFile] of entries) {
    if (!zipFile.dir) {
      const contentStr = await zipFile.async("string");
      // Remove the dynamic root folder prefix
      const cleanPath = path.startsWith(rootFolder) ? path.substring(rootFolder.length) : path;
      files.push({ path: cleanPath, content: contentStr });
    }
  }

  return { 
    name: repo, 
    files 
  };
}