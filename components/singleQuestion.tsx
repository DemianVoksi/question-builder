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
		<Accordion
			type='single'
			collapsible
			className='w-[75%] flex flex-row justify-center border border-red-700'
		>
			<AccordionItem value={id.toString()}>
				<AccordionTrigger>
					<p>{question}</p>
					<p>{difficulty}</p>
				</AccordionTrigger>
				<AccordionContent>
					{answer1}
					{answer2}
					{answer3}
					{answer4}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default SingleQuestion;
