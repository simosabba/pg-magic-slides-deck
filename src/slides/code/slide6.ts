import type { FileNode } from "#/components/ui-extensions/CodeEditor"

export const slide6Files: FileNode[] = [
  {
    name: "src",
    children: [{ name: "seed.ts" }, { name: "main.ts" }],
  },
]

export const slide6Contents: Record<string, string> = {
  "src/seed.ts": `  await query(\`
    INSERT INTO hackathons (id, name, city, starts_at, required_stack_id, location) VALUES
      (
        'a1111111-1111-1111-1111-111111111111',
        'Punkaton 2026',
        'Turin',
        '2026-04-11T09:00:00Z',
        1,
        ST_SetSRID(ST_MakePoint(7.6869, 45.0703), 4326)::geography
      ),
      (
        'a2222222-2222-2222-2222-222222222222',
        'Roma Data Sprint',
        'Rome',
        '2026-06-10T09:00:00Z',
        2,
        ST_SetSRID(ST_MakePoint(12.4964, 41.9028), 4326)::geography
      )
    ON CONFLICT (id) DO UPDATE
    SET name = EXCLUDED.name,
        city = EXCLUDED.city,
        starts_at = EXCLUDED.starts_at,
        required_stack_id = EXCLUDED.required_stack_id,
        location = EXCLUDED.location
  \`);

  await query(\`
    INSERT INTO developer_locations (developer_id, location, updated_at) VALUES
      ('11111111-1111-1111-1111-111111111111', ST_SetSRID(ST_MakePoint(8.2075, 44.8982), 4326)::geography, now()),
      ('22222222-2222-2222-2222-222222222222', ST_SetSRID(ST_MakePoint(12.5000, 41.9000), 4326)::geography, now()),
      ('33333333-3333-3333-3333-333333333333', ST_SetSRID(ST_MakePoint(7.6869, 45.0703), 4326)::geography, now()),
      ('44444444-4444-4444-4444-444444444444', ST_SetSRID(ST_MakePoint(8.6200, 45.4494), 4326)::geography, now()),
      ('55555555-5555-5555-5555-555555555555', ST_SetSRID(ST_MakePoint(11.2558, 43.7696), 4326)::geography, now())
    ON CONFLICT (developer_id) DO UPDATE
    SET location = EXCLUDED.location,
        updated_at = EXCLUDED.updated_at
  \`);

  console.log("Seed completed.");`,

  "src/main.ts": `import { and, eq, sql } from "drizzle-orm";
import { db } from "../../db/drizzle";
import { developers, developerStacks, stacks } from "../../db/schema/00-core";
import { developerLocations, hackathons } from "../../db/schema/05-geo";

const HACKATHON_NAME = "Punkaton 2026";
const RADIUS_METERS = 150_000;

async function main(): Promise<void> {
  console.log(
    \`\\nDevelopers within \${RADIUS_METERS / 1000}km of \${HACKATHON_NAME}:\`,
  );
  const nearby = await db
    .select({
      developer: developers.name,
      homeCity: developers.homeCity,
      hackathon: hackathons.name,
      distanceKm: sql<number>\`round((ST_Distance(\${developerLocations.location}, \${hackathons.location}) / 1000)::numeric, 2)\`,
    })
    .from(developerLocations)
    .innerJoin(developers, eq(developers.id, developerLocations.developerId))
    .innerJoin(hackathons, eq(hackathons.name, HACKATHON_NAME))
    .where(
      sql\`ST_DWithin(\${developerLocations.location}, \${hackathons.location}, \${RADIUS_METERS})\`,
    )
    .orderBy(
      sql\`ST_Distance(\${developerLocations.location}, \${hackathons.location})\`,
    );
  console.table(nearby);

  console.log("\\nNearby developers with required stack match:");
  const matching = await db
    .select({
      developer: developers.name,
      requiredStack: stacks.name,
      distanceKm: sql<number>\`round((ST_Distance(\${developerLocations.location}, \${hackathons.location}) / 1000)::numeric, 2)\`,
    })
    .from(developerLocations)
    .innerJoin(developers, eq(developers.id, developerLocations.developerId))
    .innerJoin(hackathons, eq(hackathons.name, HACKATHON_NAME))
    .innerJoin(stacks, eq(stacks.id, hackathons.requiredStackId))
    .innerJoin(
      developerStacks,
      and(
        eq(developerStacks.developerId, developers.id),
        eq(developerStacks.stackId, hackathons.requiredStackId),
      ),
    )
    .where(
      sql\`ST_DWithin(\${developerLocations.location}, \${hackathons.location}, \${RADIUS_METERS})\`,
    )
    .orderBy(
      sql\`ST_Distance(\${developerLocations.location}, \${hackathons.location})\`,
    );
  console.table(matching);
}`,
}

export const slide6DefaultFile = "src/seed.ts"
