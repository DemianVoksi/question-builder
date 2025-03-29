'use client';

import { fetchQuestions } from '@/db/actions';
import { useStateContext } from '@/lib/contextProvider';
import { StructuredQuestionType } from '@/types/types';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect } from 'react';
import SingleQuestion from './singleQuestion';

const QuestionsListWrapper = () => {
	const {
		allQuestions,
		setAllQuestions,
		filteredQuestions,
		setFilteredQuestions,
	} = useStateContext();
	const searchParams = useSearchParams();
	const searchPar = searchParams.get('search')?.toLowerCase();
	const difficultyPar = searchParams.get('difficulty')?.toLowerCase();
	const approvedPar = searchParams.get('approved');
	const categoryPar = searchParams.get('category')?.toLowerCase();
	const questionPar = searchParams.get('question')?.toLowerCase() ?? '';

	useEffect(() => {
		const getQuestions = async () => {
			try {
				const questions = await fetchQuestions();
				setAllQuestions(questions);
			} catch (error) {
				console.error('Error fetching questions:', error);
			}
		};
		getQuestions();
	}, []);

	useEffect(() => {
		if (!allQuestions) return;

		const filtered = allQuestions.filter((question) => {
			let matches = true;

			if (questionPar) {
				matches =
					matches && question.questionText.toLowerCase().includes(questionPar);
			}
			if (difficultyPar && difficultyPar !== 'all') {
				matches =
					matches && question.difficulty.toLowerCase() === difficultyPar;
			}
			if (approvedPar && approvedPar !== 'all') {
				matches = matches && question.approved === (approvedPar === 'true');
			}
			if (categoryPar && categoryPar !== 'all') {
				matches = matches && question.category.toLowerCase() === categoryPar;
			}
			return matches;
		});

		setFilteredQuestions(filtered);
	}, [allQuestions, questionPar, difficultyPar, approvedPar, categoryPar]);

	if (!filteredQuestions) return <div>Loading questions...</div>;

	return (
		<div className='h-full overflow-y-auto px-4 mt-2'>
			<div className='space-y-1 pb-4'>
				{filteredQuestions!.map((question) => (
					<SingleQuestion key={question.questionId} {...question} />
				))}
			</div>
		</div>
	);
};

export default QuestionsListWrapper;
