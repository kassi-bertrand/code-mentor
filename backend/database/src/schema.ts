// This file defines the structure (schema) of our database tables using Drizzle ORM.
// Drizzle ORM allows us to define our database structure using TypeScript,
// which is more type-safe and easier to work with than raw SQL.

import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { sql, relations } from "drizzle-orm";

// Here we define a table named "user" in our SQLite database.
// Each property in this object represents a column in the table.
export const user = sqliteTable("user", {
  // The 'id' column:
  // - Uses text type for storing string values
  // - Automatically generates a unique ID using createId() function
  // - Is set as the primary key (unique identifier for each row)
  // - Has an additional unique constraint
  id: text("id")
        .$defaultFn(() => createId())
        .primaryKey()
        .unique(),

  // The 'name' column:
  // - Stores the user's name as text
  // - Cannot be null (must always have a value)
  name: text("name").notNull(),

  // The 'email' column:
  // - Stores the user's email as text
  // - Cannot be null
  email: text("email").notNull(),

  // The 'image' column
  // - Stores the path or URL to the user's profile image as text
  // - Can be null (optional), allowing users without a profile image
  image: text("image"),

  // The 'generations' column:
  // - Stores an integer value
  // - Defaults to 0 if no value is provided when creating a new user
  generations: integer("generations").default(0),
});


// Note: This schema will be used by Drizzle to:
// 1. Generate SQL to create/modify the database table
// 2. Provide TypeScript types for type-safe database operations in our code
// 3. As the project grows other tables will be defined in this very same file.
