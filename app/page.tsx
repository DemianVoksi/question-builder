'use client';

import Filter from '@/components/filter';
import Navbar from '@/components/navbar';
import QuestionBuilderWrapper from '@/components/questionBuilderWrapper';
import QuestionsListWrapper from '@/components/questionsListWrapper';

export default function Home() {
	return (
		<div className=' flex flex-col items-center h-screen font-[family-name:var(--font-geist-sans)]'>
			<Navbar />
			<main className='flex-1 flex flex-col row-start-2 items-center sm:items-start overflow-hidden w-full'>
				<QuestionBuilderWrapper />
				<div className='flex-1 w-full flex flex-row justify-between min-h-0'>
					<div className='w-1/4'>
						<Filter />
					</div>
					<div className='flex-1'>
						<QuestionsListWrapper />
					</div>
				</div>
			</main>
		</div>
	);
}
