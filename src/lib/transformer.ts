import { ProjectFile, EnhancementPlan } from './types';

export function applyPlan(files: ProjectFile[], plan: EnhancementPlan, approvals: string[]): ProjectFile[] {
  const newFiles = [...files.map(f => ({ ...f }))];
  
  const allDependencies: Record<string, string> = {
    "lucide-react": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest"
  };

  for (const step of plan.steps) {
    if (!approvals.includes(step.id)) continue;

    if (step.dependencies) {
      Object.assign(allDependencies, step.dependencies);
    }

    if (step.files_to_create) {
      step.files_to_create.forEach(f => {
        addOrReplaceFile(newFiles, f.path, f.template);
      });
    }

    if (step.files_to_modify) {
      step.files_to_modify.forEach(m => {
        const file = newFiles.find(f => f.path.endsWith(m.path));
        if (!file) return;

        if (m.type === 'css_append') {
          if (!file.content.includes('Dala Enhancer Pro')) {
            file.content += "\
\
/* Dala Enhancer Pro */\
:root { --primary-dala: #ffffff; }";
          }
        } else if (m.type === 'route_injection') {
          file.content = injectRoute(file.content, step.name);
        } else if (m.type === 'package_json') {
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
  const isAuth = featureName.includes('Auth');
  const isDash = featureName.includes('Dashboard');
  
  if (isAuth && !content.includes('AuthSystem')) {
    content = "import { AuthSystem as Login } from './components/auth/AuthSystem';\
" + content;
    if (content.includes('<Routes>')) {
      content = content.replace('<Routes>', '<Routes>\
<Route path="/login" element={<Login />} />');
    }
  }

  if (isDash && !content.includes('DashboardOverview')) {
    content = "import { DashboardOverview as Dashboard } from './pages/Dashboard';\
" + content;
    if (content.includes('<Routes>')) {
      content = content.replace('<Routes>', '<Routes>\
<Route path="/dashboard" element={<Dashboard />} />');
    }
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