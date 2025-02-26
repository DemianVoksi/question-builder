import z from 'zod';

export const QuestionFormSchema = z.object({
	question: z.string().min(1),
	answers: z.object({
		choice1: z.string().min(1, 'Choice 1 is required'),
		choice2: z.string().min(1, 'Choice 2 is required'),
		choice3: z.string().min(1, 'Choice 3 is required'),
		choice4: z.string().min(1, 'Choice 4 is required'),
	}),
	correctAnswer: z.enum(['choice1', 'choice2', 'choice3', 'choice4'], {
		message: 'You must select a correct answer',
	}),
	tags: z
		.array(
			z.object({
				tag: z.string(),
			})
		)
		.max(7),
	difficulty: z.enum(['easy', 'medium', 'hard']),
	category: z.string().min(1),
	approved: z.boolean().optional(),
	// id
	// author
	// time submitted
	// approved by
});

{
	/*
On submit: 
1) Question:
- question from input
- difficulty from input
- category from input
- author id from session
- submitted at from time now
- approved false
- approved by null
- id uuid

2) Answers:
- map over answers from input
- each answer answer from input, question id from question id

3) Correct answer:
- correct answer from input, question id from question id

4) Tags: 
- map over tags from input, question id from question id
  
*/
}

export type QuestionFormType = z.infer<typeof QuestionFormSchema>;

export type QuestionType = {
	id: string;
	question: string;
	authorId: string;
	submittedAt: Date;
	difficulty: 'easy' | 'medium' | 'hard';
	category: string;
	approved: boolean;
	approvedBy: string | null;
};

export type QuestionAnswersTagsType = {
	question: string;
	answer1: string;
	answer2: string;
	answer3: string;
	answer4: string;
	correctAnswer: string;
	category: string;
	tags: string[];
	// tag1?: string;
	// tag2?: string;
	// tag3?: string;
	// tag4?: string;
	// tag5?: string;
	// tag6?: string;
	// tag7?: string;
	difficulty: string;
	id: string;
	author: string;
	timeSubmitted: Date;
	approved: boolean;
	approvedBy: string | null;
};
