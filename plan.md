
Plan for Dala Enhancer App:

1.  **Project Setup & Integration**:
    *   Verify existing dependencies (framer-motion is already installed).
    *   Ensure `src/lib/utils.ts` is available for the `cn` utility.

2.  **Component Integration**:
    *   **Background Boxes**:
        *   Create `src/components/ui/background-boxes.tsx`.
        *   Modify the `colors` array in `BoxesCore` to use exclusively white, black, and gray tones to match the "only white and black backgrounds" requirement.
    *   **Background Boxes Demo**:
        *   Create `src/components/ui/demo.tsx`.
        *   Modify the demo styling to use a black/white theme (e.g., `bg-black`, `text-white`).

3.  **Hero Page Update**:
    *   Update `src/components/landing/Hero.tsx` to integrate the `Boxes` component into the background for a modern, animated look.
    *   Ensure the hero content remains accessible and readable on top of the background boxes.

4.  **Core Features Implementation (Existing Plan preserved)**:
    *   **Project Input**: Implement UI for ZIP upload and GitHub URL.
    *   **Analysis Engine**: Simulate scanning and display checklist.
    *   **Enhancement System**: One-click actions for UI, Dashboard, Auth, and Performance.
    *   **Integrations**: Shortcuts for Chapa, Telegram, Analytics, etc.
    *   **Preview System**: Split-screen comparison.
    *   **Results & Export**: Applied enhancements list and ZIP download.
    *   **Dashboard**: List user projects and status.

5.  **UI/UX Design**:
    *   Maintain a clean, modern SaaS-style UI with the new animated background.
    *   Ensure accessibility (high contrast for text on animated backgrounds).
    *   Mobile-first responsive design for all new components.
