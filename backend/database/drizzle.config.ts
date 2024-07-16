// drizzle.config.ts
//
// Purpose: This file configures Drizzle ORM for our project.
// It tells Drizzle:
// - Where to find our database schema
// - Where to output migration files
// - What type of database we're using (SQLite on Cloudflare D1)
// - How to connect to our database
//
// This configuration is used by Drizzle CLI commands (npm generate) 
// and potentially by our application code to manage database 
// operations and migrations.

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID as string,
    databaseId: process.env.CLOUDFLARE_DATABASE_ID as string,
    token: process.env.CLOUDFLARE_API_TOKEN as string,
  },
  verbose: true,
});

// RESOURCES: https://orm.drizzle.team/kit-docs/config-reference (see: "D1Credentials" section)