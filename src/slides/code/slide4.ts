import type { FileNode } from "#/components/ui-extensions/CodeEditor"

export const slide4Files: FileNode[] = [
  {
    name: "src",
    children: [
      { name: "main.ts" },
      { name: "schema.ts" },
      { name: "embeddings.ts" },
    ],
  },
]

export const slide4Contents: Record<string, string> = {
  "src/main.ts": `import { eq, sql } from "drizzle-orm"
import { db } from "../../db/drizzle"
import { embedQuery, toSql } from "../../db/embeddings"
import { projectStacks, stacks } from "../../db/schema/00-core"
import { projectDocs } from "../../db/schema/02-jsonb"

const SEARCH_TEXT = "deployment strategy with blue green rollout"

async function main(): Promise<void> {
  // Step 1: Convert the search text into a 384-dim embedding using all-MiniLM-L6-v2
  console.log(\`\\nEmbedding search query: "\${SEARCH_TEXT}"\`)
  const queryVector = await embedQuery(SEARCH_TEXT)
  const queryVectorSql = toSql(queryVector)
  console.log(\`Vector (first 5 dims): [\${queryVector.slice(0, 5).map((v) => v.toFixed(4)).join(", ")}, ...]\`)

  // Step 2: Find the most similar documents using L2 distance (<->)
  console.log("\\nTop-k vector similarity search:")
  const topK = await db
    .select({
      id: projectDocs.id,
      title: projectDocs.title,
      distance: sql<number>\`\${projectDocs.embedding} <-> \${queryVectorSql}::vector\`,
    })
    .from(projectDocs)
    .orderBy(sql\`\${projectDocs.embedding} <-> \${queryVectorSql}::vector\`)
    .limit(3)
  console.table(topK)

  // Step 3: Hybrid search — combine vector similarity with a metadata filter
  console.log("\\nHybrid search: stack = TypeScript + vector ranking")
  const hybrid = await db
    .select({
      id: projectDocs.id,
      title: projectDocs.title,
      stackName: stacks.name,
      distance: sql<number>\`\${projectDocs.embedding} <-> \${queryVectorSql}::vector\`,
    })
    .from(projectDocs)
    .innerJoin(projectStacks, eq(projectStacks.projectId, projectDocs.projectId))
    .innerJoin(stacks, eq(stacks.id, projectStacks.stackId))
    .where(eq(stacks.name, "TypeScript"))
    .orderBy(sql\`\${projectDocs.embedding} <-> \${queryVectorSql}::vector\`)
    .limit(5)
  console.table(hybrid)
}`,

  "src/schema.ts": `import { sql } from "drizzle-orm"
import { customType, index, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { projects } from "./00-core"
import { VECTOR_DIMENSION } from "./03-vector"

const pgVector = customType<{ data: string }>({
  dataType() {
    return \`vector(\${VECTOR_DIMENSION})\`
  }
})

export const projectDocs = pgTable("project_docs", {
  id: uuid("id").primaryKey(),
  projectId: uuid("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  metadata: jsonb("metadata").notNull(),
  embedding: pgVector("embedding"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
}, (table) => [
  index("idx_project_docs_repo_name").on(sql\`(\${table.metadata}->'repo'->>'name')\`),
])`,

  "src/embeddings.ts": `import { pipeline, type FeatureExtractionPipeline } from "@huggingface/transformers"

const MODEL_NAME = "Xenova/all-MiniLM-L6-v2"

let extractor: FeatureExtractionPipeline | null = null

async function getExtractor(): Promise<FeatureExtractionPipeline> {
  if (!extractor) {
    console.log(\`Loading embedding model: \${MODEL_NAME} ...\`)
    extractor = await (pipeline as Function)("feature-extraction", MODEL_NAME) as FeatureExtractionPipeline
    console.log("Model loaded.")
  }
  return extractor
}

export async function embed(texts: string[]): Promise<number[][]> {
  const ext = await getExtractor()
  const output = await ext(texts, { pooling: "mean", normalize: true })
  return output.tolist() as number[][]
}

export async function embedQuery(text: string): Promise<number[]> {
  const [vector] = await embed([text])
  return vector
}

export function toSql(vector: number[]): string {
  return \`[\${vector.join(",")}]\`
}`,
}

export const slide4DefaultFile = "src/main.ts"
