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
	// answers: z
	// 	.object({
	// 		choices: z
	// 			.array(
	// 				z.object({
	// 					answer: z.string().min(1),
	// 				})
	// 			)
	// 			.min(4)
	// 			.max(4),
	// 		correctAnswer: z.string().min(1),
	// 	})
	// 	.superRefine((data, ctx) => {
	// 		const isValidAnswer = data.choices.some(
	// 			(choice) => choice.answer === data.correctAnswer
	// 		);
	// 		if (!isValidAnswer) {
	// 			ctx.addIssue({
	// 				code: z.ZodIssueCode.custom,
	// 				path: ['correctAnswer'],
	// 				message: 'The correct answer must be one of the answers',
	// 			});
	// 		}
	// 	}),
	tags: z
		.array(
			z.object({
				tag: z.string(),
			})
		)
		.max(7),
	difficulty: z.enum(['easy', 'medium', 'hard']),
	category: z.string().min(1),
	// id
	// author
	// time submitted
	// approved
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
