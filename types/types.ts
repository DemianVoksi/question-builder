import z from 'zod';

export const QuestionFormSchema = z.object({
	question: z.string().min(1),
	answers: z
		.object({
			choice1: z.string().min(1, 'Choice 1 is required'),
			choice2: z.string().min(1, 'Choice 2 is required'),
			choice3: z.string().min(1, 'Choice 3 is required'),
			choice4: z.string().min(1, 'Choice 4 is required'),
		})
		.superRefine((val, ctx) => {
			const choicesSet = new Set(Object.values(val));
			if (choicesSet.size != 4) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: `Answers must be unique.`,
					path: ['answers'],
				});
			}
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
	approved: z.boolean(),
	approvedBy: z.string().nullable(),
});

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
	difficulty: string;
	id: string;
	author: string;
	timeSubmitted: Date;
	approved: boolean;
	approvedBy: string | null;
};

export type AllQuestionsQueryType = {
	questionId: string;
	questionText: string;
	difficulty: 'easy' | 'medium' | 'hard';
	category: string;
	authorId: string;
	authorEmail: string;
	submittedAt: Date | null;
	approved: boolean;
	approvedBy: string | null;
	answerId: string | null;
	answerText: string | null;
	answerIsCorrect: boolean | null;
	tagId: string | null;
	tagName: string | null;
};

export type StructuredQuestionType = {
	questionId: string;
	questionText: string;
	difficulty: 'easy' | 'medium' | 'hard';
	category: string;
	authorId: string;
	authorEmail: string;
	submittedAt: Date | null;
	approved: boolean;
	approvedBy: string | null;
	answers: {
		id: string;
		answer: string;
		isTrue: boolean;
	}[];
	tags: string[];
};
