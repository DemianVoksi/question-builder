'use server';

import { auth } from '@/auth';
import { db } from '@/db/drizzle';
import { answers, questions, tags, users } from '@/db/schema';
import { AllQuestionsQueryType, StructuredQuestionType } from '@/types/types';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';

function generateId() {
	const uuid = uuidv4();
	return uuid;
}

function restructureQuestions(
	data: AllQuestionsQueryType[]
): StructuredQuestionType[] {
	const questionMap = new Map<string, StructuredQuestionType>();

	data.forEach((row) => {
		if (!questionMap.has(row.questionId)) {
			questionMap.set(row.questionId, {
				questionId: row.questionId,
				questionText: row.questionText,
				difficulty: row.difficulty,
				category: row.category,
				authorId: row.authorId,
				authorEmail: row.authorEmail,
				submittedAt: row.submittedAt,
				approved: row.approved,
				approvedBy: row.approvedBy,
				answers: [],
				tags: [],
			});
		}

		const question = questionMap.get(row.questionId)!;

		// Add answer if it exists and isn't already in answers array
		if (row.answerId && !question.answers.some((a) => a.id === row.answerId)) {
			question.answers.push({
				id: row.answerId,
				answer: row.answerText!,
				isTrue: row.answerIsCorrect!,
			});
		}

		// Add tag if it exists and isn't already in tags array
		if (row.tagName && !question.tags.includes(row.tagName)) {
			question.tags.push(row.tagName);
		}
	});

	return Array.from(questionMap.values());
}

export async function fetchQuestions() {
	const session = await auth();

	if (!session?.user?.id) {
		throw new Error('User not found');
	} else {
		const allQuestionsQuery: AllQuestionsQueryType[] = await db
			.select({
				//question
				questionId: questions.id,
				questionText: questions.question,
				difficulty: questions.difficulty,
				category: questions.category,
				authorId: questions.authorId,
				authorEmail: users.email,
				submittedAt: questions.submittedAt,
				approved: questions.approved,
				approvedBy: questions.approvedBy,
				// answers
				answerId: answers.id,
				answerText: answers.answer,
				answerIsCorrect: answers.isTrue,
				// tags
				tagId: tags.id,
				tagName: tags.tag,
			})
			.from(questions)
			.leftJoin(answers, eq(questions.id, answers.questionId))
			.leftJoin(tags, eq(questions.id, tags.questionId))
			.innerJoin(users, eq(questions.authorId, users.id));

		const finalFetched = restructureQuestions(allQuestionsQuery);
		return finalFetched;
	}
}

export async function addQuestion(
	questionId: string,
	question: string,
	difficulty: 'easy' | 'medium' | 'hard',
	category: string
) {
	const session = await auth();

	if (!session?.user?.id) {
		throw new Error('User not found');
	}

	try {
		const userId = session?.user?.id!;
		const newQuestion = await db.insert(questions).values({
			id: questionId,
			question: question,
			authorId: userId,
			submittedAt: new Date(),
			difficulty: difficulty,
			category: category,
			approved: false,
			approvedBy: null,
		});
		revalidatePath('/');
	} catch (error) {
		throw new Error('Failed to add question');
	}
}

export async function editQuestion(
	questionId: string,
	question: string,
	difficulty: 'easy' | 'medium' | 'hard',
	category: string,
	approved: boolean | null,
	approvedBy: string | null
) {
	const session = await auth();

	if (!session?.user?.id) {
		throw new Error('User not found');
	}

	try {
		const userId = session?.user?.id!;
		const newQuestion = await db
			.update(questions)
			.set({
				id: questionId,
				question: question,
				authorId: userId,
				submittedAt: new Date(),
				difficulty: difficulty,
				category: category,
				approved: approved,
				approvedBy: approvedBy,
			})
			.where(eq(questions.id, questionId));
		revalidatePath('/');
	} catch (error) {
		throw new Error('Failed to edit question');
	}
}

export async function addAnswer(
	answer: string,
	isTrue: boolean,
	questionId: string
) {
	const session = await auth();

	if (!session?.user?.id) {
		throw new Error('User not found');
	}

	try {
		const userId = session?.user?.id!;
		const newAnswer = await db.insert(answers).values({
			id: generateId(),
			answer: answer,
			isTrue: isTrue,
			questionId: questionId,
		});
	} catch (error) {
		throw new Error('Failed to add answer');
	}
}

export async function editAnswer(
	answer: string,
	isTrue: boolean,
	questionId: string
) {
	const session = await auth();

	if (!session?.user?.id) {
		throw new Error('User not found');
	} else {
		const newAnswer = await db
			.update(answers)
			.set({
				id: generateId(),
				answer: answer,
				isTrue: isTrue,
				questionId: questionId,
			})
			.where(eq(answers.id, questionId));
	}
}

export async function addTag(tag: string, questionId: string) {
	const session = await auth();

	if (!session?.user?.id) {
		throw new Error('User not found');
	}

	try {
		const userId = session?.user?.id!;
		const newTag = await db.insert(tags).values({
			id: generateId(),
			tag: tag,
			questionId: questionId,
		});
	} catch (error) {
		throw new Error('Failed to add tag');
	}
}

export async function editTag(tag: string, questionId: string) {
	const session = await auth();

	if (!session?.user?.id) {
		throw new Error('User not found');
	} else {
		const newTag = await db
			.update(tags)
			.set({
				id: generateId(),
				tag: tag,
				questionId: questionId,
			})
			.where(eq(tags.id, questionId));
	}
}

export async function deleteQuestion(id: string) {
	const session = await auth();

	if (!session?.user?.id) {
		throw new Error('User not found');
	} else {
		await db.delete(questions).where(eq(questions.id, id));
		await db.delete(answers).where(eq(answers.questionId, id));
		await db.delete(tags).where(eq(tags.questionId, id));
	}
}
