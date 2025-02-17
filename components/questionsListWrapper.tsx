import { mockQuestions, mockQuestionsType } from '@/lib/mockQuestions';
import React from 'react';
import SingleQuestion from './singleQuestion';

const QuestionsListWrapper = () => {
	const questions: mockQuestionsType[] = mockQuestions;

	return (
		<div className='border border-green-700 w-full flex flex-col justify-center items-center overflow-y-scroll'>
			{questions.map((question) => (
				<SingleQuestion key={question.id} {...question} />
			))}
		</div>
	);
};

export default QuestionsListWrapper;
