import type { FileNode } from "#/components/ui-extensions/CodeEditor"

export const slide5Files: FileNode[] = [
  {
    name: "src",
    children: [{ name: "main.ts" }],
  },
]

export const slide5Contents: Record<string, string> = {
  "src/main.ts": `// TODO: code will be added later`,
}

export const slide5DefaultFile = "src/main.ts"
