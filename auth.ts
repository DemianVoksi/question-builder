import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [GitHub, Google],
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
