'use client';

import Navbar from '@/components/navbar';
import QuestionBuilderWrapper from '@/components/questionBuilderWrapper';
import QuestionsListWrapper from '@/components/questionsListWrapper';

export default function Home() {
	return (
		<div className='items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]'>
			<Navbar />
			<main className='flex flex-col gap-8 row-start-2 items-center justify-center sm:items-start border border-red-700 w-full'>
				<QuestionBuilderWrapper />
				<QuestionsListWrapper />
			</main>
		</div>
	);
}
