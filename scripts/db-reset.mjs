#!/usr/bin/env node
/**
 * Fresh-migrate the Owlighting Supabase database.
 *
 * Required env vars (one of):
 *   • DATABASE_URL  — PostgreSQL connection string from Supabase Dashboard:
 *                     Project Settings → Database → Connection string → URI
 *                     (use the "Session pooler" mode, port 5432).
 *   • POSTGRES_URL  — same thing, alternate name (Vercel/Supabase integration default).
 *
 * Usage:
 *   1. Add DATABASE_URL to .env.local
 *   2. npm install (the `pg` dependency is wired in package.json)
 *   3. node scripts/db-reset.mjs
 *
 * What it does:
 *   - DROPs every owlighting table (CASCADE)
 *   - Recreates the full schema
 *   - Seeds default content
 *
 * SAFE TO RE-RUN. INSERTs use ON CONFLICT DO NOTHING so existing rows are
 * preserved. DESTRUCTIVE: schema.sql drops tables first — any data in those
 * tables is wiped.
 */

import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";
import { config } from "dotenv";

config({ path: ".env.local" });
config({ path: ".env" });

const connectionString =
  process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  console.error("\n❌ Missing DATABASE_URL.");
  console.error(
    "   Add it to .env.local — get it from Supabase Dashboard → Project Settings → Database",
  );
  console.error('   Format: postgresql://postgres:<password>@<host>:5432/postgres\n');
  process.exit(1);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

async function runFile(client, label, sqlPath) {
  console.log(`\n→ ${label}  (${sqlPath})`);
  const sql = readFileSync(join(root, sqlPath), "utf8");
  await client.query(sql);
  console.log(`  ✓ ${label} done`);
}

const client = new pg.Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

console.log("\n🦉 Owlighting DB reset");
console.log(`   target: ${connectionString.replace(/:[^:@]+@/, ":***@")}`);

try {
  await client.connect();
  await runFile(client, "Drop + recreate schema", "supabase/schema.sql");
  await runFile(client, "Seed default content", "supabase/seed.sql");
  console.log("\n✅ Done. Visit /admin to verify, or check the public site.\n");
} catch (err) {
  console.error("\n❌ Failed:", err.message);
  console.error(
    "\n   You can also run the SQL manually:",
    "\n     Supabase Dashboard → SQL Editor → paste supabase/schema.sql, run",
    "\n     then paste supabase/seed.sql, run.\n",
  );
  process.exit(1);
} finally {
  await client.end();
}
