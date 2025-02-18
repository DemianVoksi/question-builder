import { mockQuestionsType } from '@/lib/mockQuestions';
import React from 'react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from './ui/accordion';
import { Button } from './ui/button';

const SingleQuestion = ({
	question,
	answer1,
	answer2,
	answer3,
	answer4,
	correctAnswer,
	tags,
	tag1,
	tag2,
	tag3,
	tag4,
	tag5,
	tag6,
	tag7,
	difficulty,
	category,
	id,
	author,
	timeSubmitted,
	approved,
	approvedBy,
}: mockQuestionsType) => {
	function handleAnswerColor(answer: string) {
		if (correctAnswer === answer) {
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

	function parseTimeSubmitted(timeSubmitted: string) {
		const date = new Date(timeSubmitted);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');

		return `${day}.${month}.${year} ${hours}:${minutes}`;
	}

	return (
		<div className='w-full flex flex-col items-start'>
			<Accordion
				type='single'
				collapsible
				className='w-[100%] border border-zinc-200 rounded-md px-2'
			>
				<AccordionItem value={id.toString()} className='w-full'>
					<AccordionTrigger className='flex flex-row justify-between w-full'>
						<p className='text-left w-full'>{question}</p>
					</AccordionTrigger>
					<AccordionContent className='w-full flex flex-row'>
						<div className='flex flex-col gap-2 border-r border-zinc-200 px-3'>
							<p className={handleAnswerColor(answer1)}>1. {answer1}</p>
							<p className={handleAnswerColor(answer2)}>2. {answer2}</p>
							<p className={handleAnswerColor(answer3)}>3. {answer3}</p>
							<p className={handleAnswerColor(answer4)}>4. {answer4}</p>
						</div>
						<div className='flex flex-col gap-2 border-r border-zinc-200 px-3'>
							<div className='flex flex-row'>
								<p className='mr-1'>Difficulty:</p>
								<p className={handleDifficultyColor(difficulty)}>
									{difficulty}
								</p>
							</div>
							<div>Category: {category}</div>
							<div>Author: {author}</div>
							<div>Submitted at: {parseTimeSubmitted(timeSubmitted)}</div>
						</div>
						<div className='flex flex-col gap-2 w-[20%] border-r border-zinc-200 px-3'>
							<p className='flex w-full justify-center'>Tags: </p>
							<div className='flex flex-row flex-wrap max-w-[100%] justify-center'>
								{tags.map((tag) => (
									<p className='my-1 mr-1 bg-gradient-to-r from-zinc-100 to-zinc-200 dark:text-black rounded-md px-2 py-2'>
										{tag}
									</p>
								))}
							</div>
						</div>
						<div className='flex flex-col gap-2 border-r border-zinc-200 px-3'>
							<div>Approved: {approved ? 'Yes' : 'No'}</div>
							{approvedBy && <div>Approved by: {approvedBy}</div>}
						</div>
						<div className='flex flex-1 flex-col justify-around items-end pr-2'>
							<Button variant='success'>Edit Question</Button>
							<Button variant='danger'>Delete Question</Button>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default SingleQuestion;
