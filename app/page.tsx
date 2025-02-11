'use client';

import Navbar from '@/components/navbar';
import QuestionBuilderWrapper from '@/components/questionBuilderWrapper';

export default function Home() {
	return (
		<div className='items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]'>
			<Navbar />
			<main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
				<QuestionBuilderWrapper />
			</main>
		</div>
	);
}
