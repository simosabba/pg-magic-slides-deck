import type { FileNode } from "#/components/ui-extensions/CodeEditor"

export const slide3Files: FileNode[] = [
  {
    name: "src",
    children: [
      {
        name: "db",
        children: [{ name: "schema.ts" }, { name: "queries.ts" }],
      },
    ],
  },
]

export const slide3Contents: Record<string, string> = {
  "src/db/schema.ts": `// TODO: code will be added later`,

  "src/db/queries.ts": `// TODO: code will be added later`,
}

export const slide3DefaultFile = "src/db/schema.ts"
