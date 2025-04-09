import { auth } from '@/auth';
import Navbar from '@/components/navbar';
import SignOutClient from '@/components/sign-out-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

const Profile = async () => {
	const session = await auth();

	if (!session?.user) {
		redirect('/api/auth/signin?callbackUrl=/profile');
	}
	return (
		<div className='min-w-[100%] h-screen flex flex-col relative font-[family-name:var(--font-geist-sans)]'>
			<Navbar />
			<main className='flex flex-col h-[100%] w-[100%] items-center justify-center'>
				<Card className='h-[50%] xl:w-[25%] md:w-[50%] sm:w-[75%] flex flex-col'>
					<CardHeader className='w-full border-b-2 flex flex-row items-center justify-between'>
						<CardTitle className='flex flex-row items-center justify-center'>
							{session?.user?.name}
						</CardTitle>
						<div className='h-full'>
							<Image
								className='rounded-[50px]'
								width='100'
								height='100'
								src={`${session?.user?.image}`}
								alt='Picture of the author'
							/>
						</div>
					</CardHeader>
					<CardContent className='mt-4'>
						<p>{session?.user?.email}</p>
					</CardContent>
					<CardContent>
						<SignOutClient />
					</CardContent>
				</Card>
			</main>
		</div>
	);
};

export default Profile;
