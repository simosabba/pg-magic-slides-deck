import type { FileNode } from "#/components/ui-extensions/CodeEditor"

export const slide5Files: FileNode[] = [
  {
    name: "src",
    children: [{ name: "seed.ts" }, { name: "main.ts" }],
  },
]

export const slide5Contents: Record<string, string> = {
  "src/seed.ts": `import { sql } from "drizzle-orm"
import { db } from "../../db/drizzle"
import { GRAPH_NAME } from "../../db/schema/04-graph"

async function setupGraph(): Promise<void> {
  // Load the Apache AGE extension and set the search path to include its catalog
  await db.execute(sql.raw("LOAD 'age'"))
  await db.execute(sql.raw('SET search_path = ag_catalog, "\$user", public'))

  // Idempotent graph creation — only create if it doesn't already exist
  await db.execute(sql.raw(\`
    DO \\$\\$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM ag_catalog.ag_graph WHERE name = '\${GRAPH_NAME}') THEN
        PERFORM ag_catalog.create_graph('\${GRAPH_NAME}');
      END IF;
    END\\$\\$;
  \`))

  // Wipe all existing nodes and edges for a clean slate (DETACH DELETE removes relationships too)
  await db.execute(sql.raw(\`
    SELECT * FROM cypher('\${GRAPH_NAME}', \\$\\$
      MATCH (n)
      DETACH DELETE n
      RETURN count(n)
    \\$\\$) AS (deleted agtype);
  \`))

  // Create graph nodes: Developer, Stack and Project — each with label and properties
  await db.execute(sql.raw(\`
    SELECT * FROM cypher('\${GRAPH_NAME}', \\$\\$
      CREATE
        (:Developer {id:'11111111-1111-1111-1111-111111111111', name:'Alice Rossi'}),
        (:Developer {id:'22222222-2222-2222-2222-222222222222', name:'Marco Bianchi'}),
        (:Developer {id:'33333333-3333-3333-3333-333333333333', name:'Giulia Verdi'}),
        (:Stack {name:'TypeScript'}),
        (:Stack {name:'PostgreSQL'}),
        (:Project {id:'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', name:'PromptHub'}),
        (:Project {id:'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', name:'OpsGraph'}),
        (:Project {id:'cccccccc-cccc-cccc-cccc-cccccccccccc', name:'HackMap'})
      RETURN 1
    \\$\\$) AS (created agtype);
  \`))

  // Create edges: MATCH finds existing nodes, CREATE adds directed relationships between them
  await db.execute(sql.raw(\`
    SELECT * FROM cypher('\${GRAPH_NAME}', \\$\\$
      MATCH (alice:Developer {name:'Alice Rossi'}), (ts:Stack {name:'TypeScript'}), (ph:Project {name:'PromptHub'})
      CREATE (alice)-[:USES]->(ts), (alice)-[:WORKS_ON]->(ph)
      RETURN 1
    \\$\\$) AS (ok agtype);
  \`))

  await db.execute(sql.raw(\`
    SELECT * FROM cypher('\${GRAPH_NAME}', \\$\\$
      MATCH (marco:Developer {name:'Marco Bianchi'}), (pg:Stack {name:'PostgreSQL'}), (og:Project {name:'OpsGraph'})
      CREATE (marco)-[:USES]->(pg), (marco)-[:WORKS_ON]->(og)
      RETURN 1
    \\$\\$) AS (ok agtype);
  \`))

  await db.execute(sql.raw(\`
    SELECT * FROM cypher('\${GRAPH_NAME}', \\$\\$
      MATCH (giulia:Developer {name:'Giulia Verdi'}), (ts:Stack {name:'TypeScript'}), (hm:Project {name:'HackMap'})
      CREATE (giulia)-[:USES]->(ts), (giulia)-[:WORKS_ON]->(hm)
      RETURN 1
    \\$\\$) AS (ok agtype);
  \`))

  // Create project dependency chain: HackMap -> PromptHub -> OpsGraph
  await db.execute(sql.raw(\`
    SELECT * FROM cypher('\${GRAPH_NAME}', \\$\\$
      MATCH (ph:Project {name:'PromptHub'}), (og:Project {name:'OpsGraph'}), (hm:Project {name:'HackMap'})
      CREATE (hm)-[:DEPENDS_ON]->(ph), (ph)-[:DEPENDS_ON]->(og)
      RETURN 1
    \\$\\$) AS (ok agtype);
  \`))
}`,

  "src/main.ts": `import { sql } from "drizzle-orm"
import { db } from "../../db/drizzle"
import { GRAPH_NAME } from "../../db/schema/04-graph"

async function main(): Promise<void> {
  // Variable-length traversal: *1..3 follows DEPENDS_ON edges up to 3 hops deep
  // collect(DISTINCT ...) aggregates all reached nodes into an array
  console.log("\\nCypher path query: dependencies from HackMap")
  const deps = await db.execute(sql.raw(\`
    SELECT * FROM cypher('\${GRAPH_NAME}', \\$\\$
      MATCH (p:Project {name:'HackMap'})-[:DEPENDS_ON*1..3]->(dep:Project)
      RETURN p.name AS project, collect(DISTINCT dep.name) AS dependencies
    \\$\\$) AS (project agtype, dependencies agtype);
  \`))
  console.table(deps.rows)
  // In pure SQL this would require a recursive CTE — in Cypher it's a single MATCH pattern

  // Composite query: two MATCH clauses combined — find developers who USES TypeScript
  // AND work on a project that transitively DEPENDS_ON OpsGraph (up to 2 hops)
  console.log("\\nCypher query: developers who use TypeScript and work on a project depending on OpsGraph")
  const experts = await db.execute(sql.raw(\`
    SELECT * FROM cypher('\${GRAPH_NAME}', \\$\\$
      MATCH (d:Developer)-[:USES]->(:Stack {name:'TypeScript'})
      MATCH (d)-[:WORKS_ON]->(p:Project)-[:DEPENDS_ON*1..2]->(:Project {name:'OpsGraph'})
      RETURN d.name AS developer, p.name AS project
    \\$\\$) AS (developer agtype, project agtype);
  \`))
  console.table(experts.rows)
  // Multiple MATCH clauses act as an implicit AND — both patterns must be satisfied
}`,
}

export const slide5DefaultFile = "src/seed.ts"
