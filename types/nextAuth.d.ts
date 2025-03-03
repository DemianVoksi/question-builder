import NextAuth from 'next-auth';

declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
			email: string;
			image?: string | null;
			role?: string;
		} & DefaultSession['user'];
	}

	interface User {
		id: string;
		name?: string | null;
		email: string;
		role: string;
		emailVerified: Date | null;
		image?: string | null;
	}
}
