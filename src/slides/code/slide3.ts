import type { FileNode } from "#/components/ui-extensions/CodeEditor"

export const slide3Files: FileNode[] = [
  {
    name: "src",
    children: [
      {
        name: "schema.ts",
      },
      { name: "main.ts" },
    ],
  },
]

export const slide3Contents: Record<string, string> = {
  "src/schema.ts": `import { index, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const projectDocs = pgTable("project_docs", {
  id: uuid("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  metadata: jsonb("metadata").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
}, (table) => [
  index("idx_project_docs_repo_name").on(sql\`(\${table.metadata}->'repo'->>'name')\`),
])`,

  "src/main.ts": `import { sql } from "drizzle-orm"
import { db } from "../../db/drizzle"
import { projectDocs } from "../../db/schema/02-jsonb"

async function main(): Promise<void> {
  console.log("\\nJSONB nested query: repo.name = hackmap")
  const byRepo = await db
    .select({
      id: projectDocs.id,
      title: projectDocs.title,
      repoName: sql<string>\`\${projectDocs.metadata}->'repo'->>'name'\`,
    })
    .from(projectDocs)
    .where(sql\`\${projectDocs.metadata}->'repo'->>'name' = 'hackmap'\`)
  console.table(byRepo)

  console.log("\\nJSONB array filter: tags contains postgis")
  const byTag = await db
    .select({
      id: projectDocs.id,
      title: projectDocs.title,
      tags: sql<string>\`\${projectDocs.metadata}->'tags'\`,
    })
    .from(projectDocs)
    .where(sql\`\${projectDocs.metadata}->'tags' @> '["postgis"]'::jsonb\`)
  console.table(byTag)

  console.log("\\nJSONB deep filter: ci.pipeline.status = green")
  const byPipeline = await db
    .select({
      id: projectDocs.id,
      title: projectDocs.title,
      pipelineStatus: sql<string>\`\${projectDocs.metadata}->'ci'->'pipeline'->>'status'\`,
    })
    .from(projectDocs)
    .where(sql\`\${projectDocs.metadata}->'ci'->'pipeline'->>'status' = 'green'\`)
  console.table(byPipeline)
}`,
}

export const slide3DefaultFile = "src/schema.ts"
