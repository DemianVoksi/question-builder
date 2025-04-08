import { deleteQuestion } from '@/db/actions';
import { mockQuestionsType } from '@/lib/mockQuestions';
import { StructuredQuestionType } from '@/types/types';
import { time } from 'console';
import React from 'react';
import EditQuestionForm from './editQuestionForm';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from './ui/accordion';
import { Button } from './ui/button';

interface SingleQuestionProps extends StructuredQuestionType {}

const SingleQuestion = ({
	questionId,
	questionText,
	difficulty,
	category,
	authorId,
	authorEmail,
	submittedAt,
	approved,
	approvedBy,
	answers,
	tags,
}: SingleQuestionProps) => {
	function handleAnswerColor(answerTrue: boolean) {
		if (answerTrue) {
			return 'text-green-700';
		} else {
			return 'text-red-700';
		}
	}

	function handleDifficultyColor(difficulty: string) {
		if (difficulty === 'easy') {
			return 'text-green-700';
		}
		if (difficulty === 'medium') {
			return 'text-orange-400';
		}
		if (difficulty === 'hard') {
			return 'text-red-700';
		}
	}

	const correctAnswer = answers.filter((answer) => {
		answer.isTrue === true;
	});

	async function handleDeleteQuestion() {
		// await deleteQuestion(id);
	}

	function parseTimeSubmitted(timeSubmitted: Date) {
		const day = String(timeSubmitted.getDate()).padStart(2, '0');
		const month = String(timeSubmitted.getMonth() + 1).padStart(2, '0');
		const year = timeSubmitted.getFullYear();
		const hours = String(timeSubmitted.getHours()).padStart(2, '0');
		const minutes = String(timeSubmitted.getMinutes()).padStart(2, '0');

		return `${day}.${month}.${year} ${hours}:${minutes}`;
	}

	return (
		<div className='w-full flex flex-col items-start font-lato'>
			<Accordion
				type='single'
				collapsible
				className='w-[100%] border border-zinc-200 rounded-md px-2'
			>
				<AccordionItem value={questionId.toString()} className='w-full'>
					<AccordionTrigger className='flex flex-row justify-between w-full'>
						<p className='text-left w-full'>{questionText}</p>
					</AccordionTrigger>
					<AccordionContent className='w-full flex flex-row'>
						<div className='flex flex-col gap-2 border-r border-zinc-200 px-3'>
							{answers.map((answer, index) => (
								<p className={handleAnswerColor(answer.isTrue)} key={index}>
									{index + 1}. {answer.answer}
								</p>
							))}
						</div>
						<div className='flex flex-col gap-2 border-r border-zinc-200 px-3'>
							<div className='flex flex-row'>
								<p className='mr-1'>Difficulty:</p>
								<p className={handleDifficultyColor(difficulty)}>
									{difficulty}
								</p>
							</div>
							<div>Category: {category}</div>
							<div>Author: {authorEmail}</div>
							<div>
								Submitted at: {submittedAt && parseTimeSubmitted(submittedAt)}
							</div>
						</div>
						<div className='flex flex-col gap-2 w-[20%] border-r border-zinc-200 px-3'>
							<p className='flex w-full justify-center'>Tags: </p>
							<div className='flex flex-row flex-wrap max-w-[100%] justify-center'>
								{tags.map((tag, index) => (
									<p
										key={index}
										className='my-1 mr-1 bg-gradient-to-r from-zinc-100 to-zinc-200 dark:text-black rounded-md px-2 py-2'
									>
										{tag}
									</p>
								))}
							</div>
						</div>
						<div className='flex flex-col gap-2 border-r border-zinc-200 px-3'>
							<div>Approved: {approved ? 'Yes' : 'No'}</div>
							{approvedBy && <div>Approved by: {approvedBy}</div>}
						</div>
						<div className='flex flex-1 flex-col justify-end items-end pr-2 space-y-2'>
							<div>
								<EditQuestionForm
									questionId={questionId}
									questionText={questionText}
									difficulty={difficulty}
									category={category}
									authorId={authorId}
									authorEmail={authorEmail}
									submittedAt={submittedAt}
									approved={approved}
									approvedBy={approvedBy}
									answers={answers}
									tags={tags}
								/>
							</div>
							<Button variant='danger'>Delete Question</Button>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default SingleQuestion;
