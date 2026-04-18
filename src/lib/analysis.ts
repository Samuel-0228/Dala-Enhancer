import { ProjectFile, AnalysisResult, AnalysisIssue } from './types';

export function analyzeProject(files: ProjectFile[]): AnalysisResult {
  const issues: AnalysisIssue[] = [];
  const suggestions: string[] = [];
  
  const componentFiles = files.filter(f => f.path.includes('/components/') || f.path.includes('components/'));
  const pageFiles = files.filter(f => f.path.includes('/pages/') || f.path.includes('/routes/') || f.path.includes('/app/') || f.path.includes('pages/') || f.path.includes('app/'));
  const serviceFiles = files.filter(f => f.path.includes('/services/') || f.path.includes('/api/') || f.path.includes('/lib/') || f.path.includes('lib/'));

  const stats = {
    components: componentFiles.length,
    pages: pageFiles.length,
    services: serviceFiles.length,
    totalFiles: files.length,
  };

  const packageJson = files.find(f => f.path.endsWith('package.json'));
  let framework: 'react' | 'nextjs' | 'unknown' = 'unknown';
  let frameworkVersion = '';
  
  if (packageJson) {
    try {
      const pkg = JSON.parse(packageJson.content);
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      if (deps['next']) {
        framework = 'nextjs';
        frameworkVersion = deps['next'].replace(/[^0-9.]/g, '');
      } else if (deps['react']) {
        framework = 'react';
        frameworkVersion = deps['react'].replace(/[^0-9.]/g, '');
      }
    } catch (e) {
      if (packageJson.content.includes('"next"')) framework = 'nextjs';
      else if (packageJson.content.includes('"react"')) framework = 'react';
    }
  }

  // Improved Feature Detection
  const hasAuth = files.some(f => 
    f.path.toLowerCase().includes('auth') || 
    f.path.toLowerCase().includes('login') || 
    f.path.toLowerCase().includes('signup') ||
    f.content.includes('firebase/auth') ||
    f.content.includes('@supabase/auth') ||
    f.content.includes('next-auth') ||
    f.content.includes('@clerk/nextjs')
  );

  const hasPayments = files.some(f => 
    f.content.includes('chapa') || 
    f.content.includes('stripe') ||
    f.content.includes('@stripe/stripe-js') ||
    f.path.toLowerCase().includes('payment') ||
    f.path.toLowerCase().includes('checkout')
  );

  const hasDashboard = files.some(f => 
    f.path.toLowerCase().includes('dashboard') || 
    f.path.toLowerCase().includes('admin') ||
    f.path.toLowerCase().includes('overview')
  );

  const hasTailwind = files.some(f => 
    f.content.includes('tailwind') || 
    f.path.includes('tailwind.config') ||
    f.path.includes('postcss.config')
  );

  const hasShadcn = files.some(f => 
    f.path.includes('components/ui') ||
    f.content.includes('lucide-react') && f.content.includes('clsx')
  );

  const hasTypescript = files.some(f => f.path.endsWith('.ts') || f.path.endsWith('.tsx'));

  // Issues and Suggestions
  if (!hasAuth) {
    issues.push({ 
      type: 'missing_feature', 
      name: 'auth', 
      suggestion: 'Implement Secure Authentication',
      severity: 'high' 
    });
    suggestions.push('Add Login/Signup pages and Auth Context for secure user sessions.');
  }
  
  if (!hasPayments) {
    issues.push({ 
      type: 'missing_feature', 
      name: 'payments', 
      suggestion: 'Integrate Chapa Payments',
      severity: 'medium'
    });
    suggestions.push('Add Chapa payment service to enable local and international transactions.');
  }
  
  if (!hasDashboard) {
    issues.push({ 
      type: 'missing_feature', 
      name: 'dashboard', 
      suggestion: 'Add Administration Dashboard',
      severity: 'medium'
    });
    suggestions.push('Create a centralized overview panel to monitor project metrics.');
  }

  if (!hasTailwind && !hasShadcn) {
    issues.push({ 
      type: 'ui', 
      issue: 'Outdated UI Stack', 
      suggestion: 'Modernize with Tailwind & Shadcn',
      severity: 'medium' 
    });
    suggestions.push('Adopt utility-first CSS and pre-built accessible components.');
  }

  if (!hasTypescript && stats.totalFiles > 10) {
    issues.push({ 
      type: 'performance', 
      issue: 'Type Safety Risks', 
      suggestion: 'Migrate to TypeScript',
      severity: 'low'
    });
    suggestions.push('Improve codebase maintainability and prevent runtime errors.');
  }

  const hasLazy = files.some(f => f.content.includes('lazy(') || f.content.includes('dynamic('));
  if (!hasLazy && pageFiles.length > 3) {
    issues.push({ 
      type: 'performance', 
      issue: 'Suboptimal Loading', 
      suggestion: 'Implement Code Splitting',
      severity: 'low'
    });
    suggestions.push('Use React.lazy or Next.js dynamic imports to reduce initial bundle size.');
  }

  // Scoring Logic
  let baseScore = 100;
  if (!hasAuth) baseScore -= 15;
  if (!hasPayments) baseScore -= 15;
  if (!hasDashboard) baseScore -= 10;
  if (!hasTailwind) baseScore -= 10;
  if (!hasTypescript) baseScore -= 5;
  if (!hasLazy && pageFiles.length > 5) baseScore -= 5;
  if (framework === 'unknown') baseScore -= 20;
  if (stats.totalFiles < 3) baseScore -= 10;

  return {
    framework,
    frameworkVersion,
    hasBackend: files.some(f => f.path.includes('api/') || f.path.includes('server/') || f.path.includes('/api/')),
    structureValid: stats.totalFiles > 0,
    score: Math.max(0, Math.min(100, baseScore)),
    issues,
    suggestions,
    stats
  };
}