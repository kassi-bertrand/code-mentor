import { ZodError, z } from 'zod';
import startercode from './startercode';

export interface Env {
	R2: R2Bucket
	AUTH_KEY: string
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const success = new Response("Success", { status: 200 })
		const invalidRequest = new Response("Invalid Request", { status: 400 })
		const notFound = new Response("Not Found", { status: 404 })
		const methodNotAllowed = new Response("Method Not Allowed", { status: 405 })

		if (request.headers.get("Authorization") !== env.AUTH_KEY){
			return new Response("Unauthorized", { status: 401 })
		}

		const url = new URL(request.url)
		const path = url.pathname
		const method = request.method

		if (path == '/api/init' && method == "POST") {
			const initSchema = z.object({
				playgroundId: z.string(),
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
				])
			})

			const body = await request.json()
			const { playgroundId, type } = initSchema.parse(body)

			await Promise.all(
				startercode[type].map(
					async (file) => {
						await env.R2.put(`projects/${playgroundId}/${file.name}`, file.body)
					}
				)
			)

			return success
		}
		else {
			return notFound
		}
	},
} satisfies ExportedHandler<Env>;
