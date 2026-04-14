import { ProjectFile, EnhancementPlan } from './types';

export function applyPlan(files: ProjectFile[], plan: EnhancementPlan, approvals: string[]): ProjectFile[] {
  const newFiles = [...files.map(f => ({ ...f }))];
  
  const allDependencies: Record<string, string> = {};

  for (const step of plan.steps) {
    if (!approvals.includes(step.id)) continue;

    // Collect dependencies
    if (step.dependencies) {
      Object.assign(allDependencies, step.dependencies);
    }

    // Create new files
    if (step.files_to_create) {
      step.files_to_create.forEach(f => {
        addOrReplaceFile(newFiles, f.path, f.template);
      });
    }

    // Modify existing files
    if (step.files_to_modify) {
      step.files_to_modify.forEach(m => {
        const file = newFiles.find(f => f.path.endsWith(m.path));
        if (!file) return;

        if (m.type === 'css_append') {
          file.content += `

/* Dala Enhancer Pro: Design Refactor */
:root {
  --accent: #ffffff;
  --background: #000000;
  --foreground: #ffffff;
}
`;
        } else if (m.type === 'route_injection' && file.path.endsWith('App.tsx')) {
          file.content = injectRoute(file.content, step.name);
        } else if (m.type === 'package_json' && file.path.endsWith('package.json')) {
          file.content = updatePackageJson(file.content, allDependencies);
        }
      });
    }
  }

  return newFiles;
}

function addOrReplaceFile(files: ProjectFile[], path: string, content: string) {
  const existingIndex = files.findIndex(f => f.path === path);
  if (existingIndex !== -1) {
    files[existingIndex].content = content;
  } else {
    files.push({ path, content });
  }
}

function injectRoute(content: string, featureName: string): string {
  // Very basic route injection for React projects
  // Looks for common patterns like <Routes> or Switch
  const isAuth = featureName.includes('Auth');
  const isDash = featureName.includes('Dashboard');
  
  if (isAuth && !content.includes('Login')) {
    const importMatch = content.match(/import.*from/);
    if (importMatch) {
      content = `import { AuthSystem as Login } from './pages/Login';
` + content;
    }
    content = content.replace(/<Routes>|<Switch>/, (match) => 
      `${match}
          <Route path="/login" element={<Login />} />`
    );
  }

  if (isDash && !content.includes('Dashboard')) {
    const importMatch = content.match(/import.*from/);
    if (importMatch) {
      content = `import { DashboardOverview as Dashboard } from './pages/Dashboard';
` + content;
    }
    content = content.replace(/<Routes>|<Switch>/, (match) => 
      `${match}
          <Route path="/dashboard" element={<Dashboard />} />`
    );
  }

  return content;
}

function updatePackageJson(content: string, newDeps: Record<string, string>): string {
  try {
    const pkg = JSON.parse(content);
    pkg.dependencies = { ...pkg.dependencies, ...newDeps };
    return JSON.stringify(pkg, null, 2);
  } catch (e) {
    return content;
  }
}