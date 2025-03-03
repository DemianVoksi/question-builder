'use client';

import { mockQuestions, mockQuestionsType } from '@/lib/mockQuestions';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import SingleQuestion from './singleQuestion';

const QuestionsListWrapper = () => {
	const searchParams = useSearchParams();
	const searchPar = searchParams.get('search')?.toLowerCase();
	const difficultyPar = searchParams.get('difficulty')?.toLowerCase();
	const approvedPar = searchParams.get('approved');
	const categoryPar = searchParams.get('category')?.toLowerCase();
	const questionPar = searchParams.get('question')?.toLowerCase() ?? '';

	const filteredQuestions: mockQuestionsType[] = mockQuestions.filter((mq) => {
		let matches = true;
		if (questionPar) {
			matches =
				matches &&
				mq.question.toLowerCase().includes(questionPar.toLowerCase());
		}

		// if (searchPar) {
		// 	const searchMatch =
		// 		mq.question.toLowerCase().includes(searchPar.toLowerCase()) ||
		// 		mq.answer1.toLowerCase().includes(searchPar.toLowerCase()) ||
		// 		mq.answer2.toLowerCase().includes(searchPar.toLowerCase()) ||
		// 		mq.answer3.toLowerCase().includes(searchPar.toLowerCase()) ||
		// 		mq.answer4.toLowerCase().includes(searchPar.toLowerCase());
		// 	matches = matches && searchMatch;
		// }
		if (difficultyPar && difficultyPar !== 'all') {
			matches =
				matches && mq.difficulty.toLowerCase() === difficultyPar.toLowerCase();
		}
		if (approvedPar && approvedPar !== 'all') {
			matches =
				matches && mq.approved === (approvedPar?.toLowerCase() === 'true');
		}
		if (categoryPar && categoryPar !== 'all') {
			matches =
				matches &&
				mq.tags.some((tag) =>
					tag.toLowerCase().includes(categoryPar.toLowerCase())
				);
		}
		return matches;
	});

	return (
		<div className='h-full overflow-y-auto px-4 mt-2'>
			<div className='space-y-1 pb-4'>
				{filteredQuestions.map((question) => (
					<SingleQuestion key={question.id} {...question} />
				))}
			</div>
		</div>
	);
};

export default QuestionsListWrapper;
