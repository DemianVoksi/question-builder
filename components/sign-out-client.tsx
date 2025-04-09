'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

export default function SignOutClient() {
	const router = useRouter();

	return (
		<Button
			variant='black'
			onClick={() => {
				signOut({ redirect: false });
				router.replace('/');
			}}
		>
			Sign out
		</Button>
	);
}
