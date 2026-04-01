import type { FileNode } from "#/components/ui-extensions/CodeEditor"

export const slide4Files: FileNode[] = [
  {
    name: "src",
    children: [{ name: "main.ts" }],
  },
]

export const slide4Contents: Record<string, string> = {
  "src/main.ts": `// TODO: code will be added later`,
}

export const slide4DefaultFile = "src/main.ts"
