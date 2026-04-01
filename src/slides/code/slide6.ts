import type { FileNode } from "#/components/ui-extensions/CodeEditor"

export const slide6Files: FileNode[] = [
  {
    name: "src",
    children: [{ name: "main.ts" }],
  },
]

export const slide6Contents: Record<string, string> = {
  "src/main.ts": `// TODO: code will be added later`,
}

export const slide6DefaultFile = "src/main.ts"
