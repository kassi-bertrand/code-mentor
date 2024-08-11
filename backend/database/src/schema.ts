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


// Infer and export a TypeScript type named "User" based on the structure
// of the "user" table above
export type User = typeof user.$inferSelect

// Defines and exports relationships for the "user" table. It specifies that:
//  - a user can be associated with many "playground" entries
//  - a user can be associated with many "userToPlayground" entries
export const userRelations = relations(user, ({ many }) => ({
	playground: many(playground),
  // TODO: Establish a one-to-many relationship between the "user" and "usersToPlaygrounds" tables
}));

// Here we define a table named "playground" in our SQLite database.
export const playground = sqliteTable('playground', {
	id: text('id')
		.$defaultFn(() => createId())
		.primaryKey()
		.unique(),

	name: text('name').notNull(),

	language: text('language', {
		enum: [
			'typescript',
			'javascript',
			'python',
			'java',
			'ruby',
			'php',
			'csharp',
			'cpp',
			'go',
			'rust',
			'kotlin',
			'swift',
			'objective-c',
			'scala',
			'shell',
			'sql',
			'perl',
			'r',
			'dart',
			'lua',
			'groovy',
			'haskell',
			'erlang',
			'elixir',
			'clojure',
			'coffeescript',
			'ocaml',
			'fsharp',
			'scheme',
			'vbscript',
			'powershell',
			'matlab',
			'json',
			'xml',
			'yaml',
			'toml',
			'ini',
			'markdown',
			'html',
			'css',
			'scss',
			'less',
			'svg',
			'plaintext',
		],
	}).notNull(),

	visibility: text('visibility', { enum: ['public', 'private'] }),
	createdAt: integer('createdAt', { mode: 'timestamp_ms' }),

	// The id of the user who created the playground
	userId: text('user_id')
		.notNull()
		.references(() => user.id), // Establishes a foreign key relationship between the "userId" column and the "id" column of the "user" table
});


export type Playround = typeof playground.$inferSelect;

// Defines and exports relationships for the "playground" table. It specifies that:
//  - A playground can be associated with ONE "user" (i.e. author).
//  - A playground can be associated with MANY "userToPlaygrounds" entries.
export const playgroundRelations = relations(playground, ({one, many}) => ({
  author: one(user, {
    fields: [playground.userId], // Specifies that the "userId" field in the "playground" table is used for the relationship.
    references: [user.id], // Specifies that the "userId" field in the "playground" table references the "id" field in the "user" table.
  })
  // TODO:  Establish a one-to-many relationship between the "playground" and "usersToPlaygrounds" table. 
}));

// TODO:  Create a SQLite table called "usersToPlaygrounds". This table will serve as a join table (or junction table)
//        This table has the following columns:
//          - "userId": stores the id of a user, must NOT be null, has a foreign key relationship with the "id" column in the "user" table (user.id)
//          - "playgroundId": stores the ID of a playground, must NOT be null, has a foreign key relationship with the "id" column in the "playground" table (playground.id)
//          - "sharedOn": stores the timestamp of when the playground was shared with the user. Stored in milliseconds.
//        The purpose of this table is to facilitate two purposes:
//          1 - Track a "many-to-many" relationship between users and playgrounds. 
//              This is necessary because a single user can be associated with 
//              multiple sandboxes, and a single sandbox can be associated 
//              with multiple users.
//          2 - The sharedOn column adds additional functionality by recording 
//              the timestamp when a playground was shared with a user. This can 
//              be useful for tracking and auditing purposes, such as knowing 
//              when a user was granted access to a sandbox.
//

// TODO:  Implement "usersToPlaygrounds" relations. (Kassi will take care of this).

// Note: This schema will be used by Drizzle to:
// 1. Generate SQL to create/modify the database table
// 2. Provide TypeScript types for type-safe database operations in our code
// 3. As the project grows other tables will be defined in this very same file.
