import type { FileNode } from "#/components/ui-extensions/CodeEditor"

export const slide2Files: FileNode[] = [
  {
    name: "src",
    children: [
      {
        name: "bus",
        children: [
          { name: "publisher.ts" },
          { name: "subscriber.ts" },
        ],
      },
      {
        name: "db",
        children: [
          { name: "client.ts" },
        ],
      },
    ],
  },
]

export const slide2Contents: Record<string, string> = {
  "src/bus/publisher.ts": `import { sql } from "drizzle-orm";
import { closeDb } from "../../db/client";
import { db } from "../../db/drizzle";
import { events } from "../../db/schema/01-events";

const CHANNEL = "dev_events";

type BusEvent = {
  type: "project.updated" | "developer.joined";
  projectId?: string;
  developerId?: string;
  at: string;
};

async function publish(event: BusEvent): Promise<void> {
  const payload = JSON.stringify(event);

  await db.insert(events).values({ channel: CHANNEL, payload: event });
  await db.execute(sql\`SELECT pg_notify(\${CHANNEL}, \${payload})\`);

  console.log("Published event:", event);
}

async function main(): Promise<void> {
  await publish({
    type: "project.updated",
    projectId: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    at: new Date().toISOString(),
  });

  await publish({
    type: "developer.joined",
    developerId: "55555555-5555-5555-5555-555555555555",
    at: new Date().toISOString(),
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await closeDb();
  });`,

  "src/bus/subscriber.ts": `import { pool } from "../../db/client";

const CHANNEL = "dev_events";

async function main(): Promise<void> {
  // LISTEN requires a dedicated connection — drizzle uses a pool
  // and releases connections, so we hold one from the shared pool.
  const client = await pool.connect();

  client.on("notification", (msg) => {
    if (msg.channel !== CHANNEL) {
      return;
    }

    const payload = msg.payload ?? "";
    try {
      console.log("[event]", JSON.parse(payload));
    } catch {
      console.log("[event-raw]", payload);
    }
  });

  await client.query(\`LISTEN \${CHANNEL}\`);
  console.log(\`Listening on channel: \${CHANNEL}\`);

  const shutdown = async () => {
    console.log("\\nStopping subscriber...");
    client.release();
    await pool.end();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});`,

  "src/db/client.ts": `import 'dotenv/config';
import { Pool, type QueryResultRow } from 'pg';

const DATABASE_URL = process.env.DATABASE_URL ?? 'postgres://postgres:postgres@localhost:5432/pg_magic';

export const pool = new Pool({
  connectionString: DATABASE_URL,
  max: 10
});`,
}

export const slide2DefaultFile = "src/bus/publisher.ts"
