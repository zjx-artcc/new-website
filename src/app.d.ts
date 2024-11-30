import type { User, WebSession } from '@prisma/client';
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null;
			session: WebSession | null;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
