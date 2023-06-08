import { env } from "node:process";
import { z } from "zod";

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof EnvironmentVariables> {
			COLOR: `#${string}`;
		}
	}
}

const EnvironmentVariables = z.object({
	DEV: z.string().optional(),
	NAME: z.string(),
	PREFIX: z.string(),
	COLOR: z.string().startsWith("#"),

	DISCORD_ID: z.string(),
	DISCORD_TOKEN: z.string(),

	OWNER_ID: z.string(),
	GUILD_ID: z.string(),

	WEBHOOK_URL: z.string(),

	GCP_PROJECT_ID: z.string(),
	GOOGLE_APIS_KEY: z.string(),
	CUSTOM_SEARCH_ID: z.string(),
	MAKERSUITE_API_KEY: z.string(),

	GENIUS_TOKEN: z.string(),

	REPLICATE_TOKEN: z.string(),
	OPENAI_API_KEY: z.string(),
});

const result = EnvironmentVariables.safeParse(env);
if (result.success) console.log("✅ Environment variables verified");
else throw new Error(`❌ Environment variables not verified: ${result.error}`);