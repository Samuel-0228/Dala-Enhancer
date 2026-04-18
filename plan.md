# GitHub Authentication & Private Repository Access Plan

Integrate GitHub Personal Access Token (PAT) authentication to allow the application to analyze both public and private repositories authorized by the user.

## 1. Implement GitHub Integration Logic (`src/lib/github.ts`)
- Create the missing `src/lib/github.ts` utility.
- Implement `fetchGithubRepo(url: string, token?: string)`:
    - Parse the GitHub URL to extract owner, repo, and branch.
    - Fetch the repository archive (ZIP) using the GitHub API.
    - Include the `Authorization: Bearer <token>` header if a token is provided.
    - Handle both public access and authenticated access.
    - Use `JSZip` to extract the content into `ProjectFile[]` format.

## 2. Enhance Uploader UI (`src/components/enhancer/Uploader.tsx`)
- Add a "Settings" or "Auth" section to the Remote Source Injection area.
- Include a secure input field for the GitHub Personal Access Token.
- Implement a "Save Token" toggle (using `sessionStorage` for security).
- Update the connection logic to pass the token to the `fetchGithubRepo` function.
- Add clear messaging about why a token is needed (for private repos or rate limiting).

## 3. Localization Support
- Update translation files (en, am, om) if necessary (though I will stick to English if existing patterns allow, or use the LanguageContext).

## 4. Validation
- Verify that public repos still work without a token.
- Verify that the Authorization header is correctly applied when a token is present.
- Ensure large repositories are handled gracefully.
