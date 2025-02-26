'use server';

import { auth } from '@/auth';
import { db } from '@/db/drizzle';
import { answers, questions, tags } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

function generateId() {
	const uuid = uuidv4();
	return uuid;
}

export async function fetchQuestions() {
	const session = await auth();

	if (!session?.user?.id) {
		throw new Error('User not found');
	} else {
		const userId = session?.user?.id!;
		const allQuestions = await db
			.select()
			.from(questions)
			.where(eq(questions.authorId, userId));

		return allQuestions;
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
	} else {
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
		return newQuestion;
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
	} else {
		const userId = session?.user?.id!;
		const newAnswer = await db.insert(answers).values({
			id: generateId(),
			answer: answer,
			isTrue: isTrue,
			questionId: questionId,
		});
		return newAnswer;
	}
}

export async function addTag(tag: string, questionId: string) {
	const session = await auth();

	if (!session?.user?.id) {
		throw new Error('User not found');
	} else {
		const userId = session?.user?.id!;
		const newTag = await db.insert(tags).values({
			id: generateId(),
			tag: tag,
			questionId: questionId,
		});
		return newTag;
	}
}

export async function editQuestion() {}

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
