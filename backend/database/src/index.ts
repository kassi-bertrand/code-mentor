import { drizzle } from 'drizzle-orm/d1';
import { json } from 'itty-router';
import { ZodError, z } from 'zod';

import * as schema from './schema';
import { user } from './schema';
import { and, eq, sql } from 'drizzle-orm';

export interface Env {
	// Environment variables written here were defined first defined in wrangler.example.toml
	DB: D1Database;
	STORAGE: any;
	AUTH_KEY: string;
	STORAGE_WORKER_URL: string;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		// Defining types of Responses and code this Worker can return when invoked
		const success = new Response('Success', { status: 200 });
		const invalidRequest = new Response('Invalid Request', { status: 400 });
		const notFound = new Response('Not Found', { status: 404 });
		const methodNotAllowed = new Response('Method Not Allowed', { status: 405 });

		// Extracting basic information from the request
		const url = new URL(request.url);
		const path = url.pathname;
		const method = request.method;

		// Authenticating the request
		if (request.headers.get('Authorization') !== env.AUTH_KEY) {
			return new Response('Unauthorized', { status: 401 });
		}

		// Initialize database connection
		const db = drizzle(env.DB, { schema });

		// Handle '/api/user' endpoint
		if (path === '/api/user') {
			if (method === 'GET') {
				const params = url.searchParams
				if (params.has('id')) {
					// Fetch a specific user by ID
					const id = params.get('id') as string;
					const res = await db.query.user.findFirst({
						where: (user, { eq }) => eq(user.id, id),
						// TODO: In addition of the user information, Grab the "playgrounds" associated with the user.
					});
					return json(res ?? {});
				} else {
					// Fetch all users
					const res = await db.select().from(user).all();
					return json(res ?? {});
				}
			}
			else if (method === 'POST'){
				// Define schema for user data validation
				const userSchema = z.object({
					id: z.string(),
					name: z.string(),
					email: z.string().email(),
				})

				// Parse and validate request body
				const body = await request.json()
				const {id, name, email} = userSchema.parse(body)

				// Insert user infos into the "user" table inside the database
				const res = await db
								.insert(user)
								.values({id, name, email})
								.returning()
								.get()

				return json({ res })
			}
			else if (method === 'DELETE'){
				const params = url.searchParams
				if(params.has("id")){
					// Delete user by ID
					const id = params.get("id") as string
					await db.delete(user).where(eq(user.id, id))
					return success
				} else {
					return invalidRequest
				}
			}
			else {
				return methodNotAllowed
			}
		}
		else return notFound

	},
} satisfies ExportedHandler<Env>;
