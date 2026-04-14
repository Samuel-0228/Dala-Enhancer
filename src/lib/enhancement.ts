import { AnalysisResult, EnhancementPlan, PlanStep } from "./types";
import { TEMPLATES } from "./templates";

export const generatePlan = (analysis: AnalysisResult): EnhancementPlan => {
  const steps: PlanStep[] = [];

  analysis.issues.forEach((issue, index) => {
    const id = `step-${index}`;
    
    if (issue.type === "missing_feature") {
      if (issue.name === "payments") {
        steps.push({
          id,
          action: "add_feature",
          name: "Chapa Payment Suite",
          description: "Production-ready Chapa integration including service module and UI components.",
          files_to_create: [
            { path: "src/lib/chapa.ts", template: TEMPLATES.chapa },
            { path: "src/components/checkout/PaymentGateway.tsx", template: TEMPLATES.dashboard } // Reusing for demo or specialized template
          ],
          dependencies: { "axios": "^1.6.0" }
        });
      } else if (issue.name === "dashboard") {
        steps.push({
          id,
          action: "add_feature",
          name: "Elite Admin Dashboard",
          description: "High-performance overview panel with real-time metrics and responsive layout.",
          files_to_create: [
            { path: "src/pages/Dashboard.tsx", template: TEMPLATES.dashboard }
          ],
          files_to_modify: [
            { path: "src/App.tsx", type: "route_injection" }
          ]
        });
      } else if (issue.name === "auth") {
        steps.push({
          id,
          action: "add_feature",
          name: "Secure Auth Gateway",
          description: "Modern authentication system with login/signup views and session management.",
          files_to_create: [
            { path: "src/components/auth/AuthSystem.tsx", template: TEMPLATES.auth },
            { path: "src/pages/Login.tsx", template: TEMPLATES.auth }
          ],
          files_to_modify: [
            { path: "src/App.tsx", type: "route_injection" }
          ]
        });
      }
    } else if (issue.type === "ui") {
      steps.push({
        id,
        action: "refactor_ui",
        name: "Modern Design Language",
        description: "Injects premium minimalist aesthetic into the project base CSS.",
        files_to_modify: [
          { path: "src/index.css", type: "css_append" }
        ]
      });
    }
  });

  // Always add package.json update if we have dependencies
  const allDeps = steps.reduce((acc, step) => ({ ...acc, ...step.dependencies }), {});
  if (Object.keys(allDeps).length > 0) {
    steps.push({
      id: "step-pkg",
      action: "modify_file",
      name: "Dependency Alignment",
      description: "Synchronize package.json with new architectural requirements.",
      files_to_modify: [{ path: "package.json", type: "package_json" }]
    });
  }

  return { steps };
};