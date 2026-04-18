export interface ProjectFile {
  path: string;
  content: string;
}

export interface AnalysisIssue {
  type: "missing_feature" | "ui" | "performance" | "structure";
  name?: string;
  issue?: string;
  suggestion: string;
  severity: "low" | "medium" | "high";
}

export interface AnalysisResult {
  framework: "react" | "nextjs" | "unknown";
  frameworkVersion?: string;
  hasBackend: boolean;
  structureValid: boolean;
  score: number;
  issues: AnalysisIssue[];
  suggestions: string[];
  stats: {
    components: number;
    pages: number;
    services: number;
    totalFiles: number;
  };
}

export interface PlanStep {
  id: string;
  action: "add_feature" | "refactor_ui" | "optimize_perf" | "modify_file";
  name: string;
  description: string;
  files_to_create?: { path: string; template: string }[];
  files_to_modify?: { path: string; type: "route_injection" | "package_json" | "css_append" }[];
  dependencies?: Record<string, string>;
}

export interface EnhancementPlan {
  steps: PlanStep[];
}

export type ProjectStatus = "idle" | "uploading" | "analyzing" | "enhancing" | "ready";

export type Language = 'en' | 'am' | 'om';