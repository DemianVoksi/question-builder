import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { db } from './db/drizzle';

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [GitHub, Google],
	adapter: DrizzleAdapter(db) as Adapter,
	callbacks: {
		async session({ session, user }) {
			session.user.id = user.id;
			return session;
		},
		async signIn({ user }) {
			const allowedEmail = ['demian.voksi@gmail.com'];
			if (allowedEmail.includes(user.email!)) {
				return true;
			} else {
				return false;
			}
		},
	},
});
