'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { Button } from './ui/button';

const SignInGithub = () => {
	const handleSignIn = async () => {
		await signIn();
	};

	return (
		<Card className='mx-auto w-[400px] sm:mt-[10%] md:sm:mt-[20%] xl:mt-[10%]'>
			<CardHeader className='space-y-1 flex flex-row justify-center items-center'>
				<CardTitle className='text-2xl font-bold'>
					Sign in with Github
				</CardTitle>
			</CardHeader>
			<CardContent className='w-full flex flex-row justify-center'>
				<Button
					type='submit'
					variant='black'
					className='w-[75%]'
					onClick={handleSignIn}
				>
					<FaGithub /> GitHub
				</Button>
			</CardContent>
		</Card>
	);
};

export default SignInGithub;
