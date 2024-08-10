import { drizzle } from 'drizzle-orm/d1';
import { json } from 'itty-router';
import { ZodError, z } from 'zod';

import * as schema from './schema';
import { user, playground } from './schema';
import { and, eq, param, sql } from 'drizzle-orm';

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
					// Fetch a specific user by ID, alongside their playground
					const id = params.get('id') as string;
					const res = await db.query.user.findFirst({
						where: (user, { eq }) => eq(user.id, id),
						with:{
							playground: {
								orderBy: (playground, { desc }) => [desc(playground.createdAt)],
							}
						}
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
		// Handle '/api/playground' endpoint
		else if(path === '/api/playground') {
			if (method === "PUT"){
				const initSchema = z.object({
					name: z.string(),
					type: z.enum([
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
					]),
					userId: z.string(),
					visibility: z.enum(["public", "private"]),
				})

				// Validate the frontend request using Zod.
				// It ensures the body of the request adheres 
				// to the previously defined schema.
				const body = await request.json()
				const { name, type, userId, visibility} = initSchema.parse(body)

				// Let's find out how many playgrounds 
				// the user creating this new playground already has
				const userPlaygrounds = await db
						.select()
						.from(playground)
						.where(eq(playground.userId, userId))
						.all()
				
				if (userPlaygrounds.length >= 10) {
					return new Response("You reached the maximum # of playgrounds.", {
						status: 400,
					})
				}

				// Create a record in the playground table
				const pg = await db
						.insert(playground)
						.values({name, type, userId, visibility, createdAt: new Date() })
						.returning()
						.get()

				// Tell the Storage worker to create a new space of this playground.
				// NOTE: This endpoint in the storage worker is yet to be implemented
				const initStorageRequest = new Request(
					`${env.STORAGE_WORKER_URL}/api/init`,
					{
						method: "POST",
						body: JSON.stringify({playgroundId: pg.id, type}),
						headers: {
							"Content-Type": "application/json",
							Authorization: `${env.AUTH_KEY}`,
						}
					}
				)

				await env.STORAGE.fetch(initStorageRequest)

				// Return success response
				return new Response(pg.id, { status: 200})

			}
			else if (method === "GET"){
				const params = url.searchParams
				// if the request has an id, GET the playgrounds associated with it
				// otherwise return ALL playgrounds :)
				if (params.has("id")){
					const id = params.get("id") as string
					const res = await db.query.playground.findFirst({
						where: (sandbox, { eq }) => eq(sandbox.id, id),
					})
					return json(res ?? {})
				}
				else {
					const res = await db.select().from(playground).all()
					return json(res ?? {})
				}
			}
			else if (method === "DELETE"){
				const params = url.searchParams
				if (params.has("id")){
					const id = params.get("id") as string
					
					// Delete the playground the user created from the "playground" table
					await db.delete(playground).where(eq(playground.id, id))

					// Now, send an HTTP "DELETE" request to the Storage worker's "/api/project"
					// endpoint to delete the files associated with the playground
					const deleteStorageRequest = new Request(
						`${env.STORAGE_WORKER_URL}/api/project`,
						{
							method: "DELETE",
							body: JSON.stringify({ playgroundId: id }),
							headers : {
								"Content-Type": "application/json",
								Authorization: `${env.AUTH_KEY}`,
							}
						}
					)

					await env.STORAGE.fetch(deleteStorageRequest)

					return success
				}
				else {
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
