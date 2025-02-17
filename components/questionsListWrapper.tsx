import { mockQuestions, mockQuestionsType } from '@/lib/mockQuestions';
import React from 'react';
import SingleQuestion from './singleQuestion';

const QuestionsListWrapper = () => {
	const questions: mockQuestionsType[] = mockQuestions;

	return (
		// <div className='w-full h-[calc(100vh-4rem)] flex flex-col justify-start  items-center overflow-y-auto px-4 border border-green-700'>
		// 	{questions.map((question) => (
		// 		<SingleQuestion key={question.id} {...question} />
		// 	))}
		// </div>
		<div className='h-full overflow-y-auto px-4 mt-2'>
			<div className='space-y-1 pb-4'>
				{questions.map((question) => (
					<SingleQuestion key={question.id} {...question} />
				))}
			</div>
		</div>
	);
};

export default QuestionsListWrapper;
