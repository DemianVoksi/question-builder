import { mockQuestionsType } from '@/lib/mockQuestions';
import React from 'react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from './ui/accordion';

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
	id,
	author,
	timeSubmitted,
	approved,
	approvedBy,
}: mockQuestionsType) => {
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
					<AccordionContent className='w-full'>
						<div className='flex flex-col gap-2'>
							<p>{answer1}</p>
							<p>{answer2}</p>
							<p>{answer3}</p>
							<p>{answer4}</p>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default SingleQuestion;
