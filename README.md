# Dala - Enhancer

Dala Enhancer Pro is a developer-focused transformation platform that upgrades raw web projects into production-ready applications. It accepts real project inputs via ZIP upload or GitHub repositories, performs deep static code analysis, and generates a structured improvement plan based on actual project data.

Once approved by the user, it applies real code-level enhancements such as authentication systems, payment integrations (Chapa), dashboard modules, and architectural improvements. The system then exports a fully upgraded and deployable project package.

The platform is designed to bridge the gap between early-stage generated projects and production-grade software by introducing a structured analysis, planning, and transformation pipeline.

## 🚀 Features

- ⚡️ **Vite** - Fast build tool and development server
- ⚛️ **React 18** - Latest React with hooks support
- 🎯 **TypeScript** - Type safety and better developer experience
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧩 **shadcn/ui** - Beautifully designed components built with Radix UI
- 📦 **Path Mapping** - Clean imports with `@/` prefix
- 🔌 **Real backend API** - ZIP upload, GitHub clone, and static analysis endpoints

## 📦 Included shadcn/ui Components

- Button
- Card
- Input
- Label
- Badge
- Dialog
- And more...

## 🛠️ Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start development server**

   ```bash
   npm run dev
   ```

3. **Start the backend API**

   ```bash
   npm run dev:backend
   ```

   Or run both frontend and backend together:

   ```bash
   npm run dev:full
   ```

4. **Build for production**

   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🔧 Backend API

The backend listens on port `4000` and exposes these real endpoints:

- `POST /api/upload-zip` - multipart ZIP upload using `file`, `zip`, or `archive`
- `POST /api/analyze-zip` - analyze an extracted project by `projectId`
- `POST /api/analyze-github` - clone and analyze a public GitHub repository by `repoUrl`
- `GET /api/health` - health check

During local development, Vite proxies `/api` requests to the backend server.

## 📁 Project Structure

```
src/
├── components/
│   └── ui/              # shadcn/ui components
├── lib/
│   └── utils.ts         # Utility functions
├── App.tsx              # Main application component
├── index.css            # Global styles with Tailwind
└── main.tsx             # Application entry point
```

## 🎨 Customization

### Adding New shadcn/ui Components

This template is pre-configured with shadcn/ui. You can add more components by creating them in the `src/components/ui/` directory.

### Tailwind Configuration

The Tailwind configuration is set up with shadcn/ui color variables. You can customize colors and other design tokens in:

- `tailwind.config.js` - Tailwind configuration
- `src/index.css` - CSS custom properties for themes

### TypeScript Configuration

Path mapping is configured for clean imports:

```typescript
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

## 📚 Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

**⚡ Powered by [Dala](https://dala.gebeya.com)**

---

Built for Dala ambassadors competition.
