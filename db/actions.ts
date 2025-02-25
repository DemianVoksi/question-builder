'use server';

import { auth } from '@/auth';
import { db } from '@/db/drizzle';
import { answers, questions, tags } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
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

export async function addQuestion(question: any) {
	const session = await auth();

	if (!session?.user?.id) {
		throw new Error('User not found');
	} else {
		const userId = session?.user?.id!;

		const newQuestion = await db.insert(questions).values({
			id: generateId(),
			question: question.question,
			authorId: userId,
			submittedAt: new Date(),
			difficulty: question.difficulty,
			category: question.category,
			approved: false,
			approvedBy: null,
		});

		return newQuestion;
	}
}

export async function addAnswers(answers: any) {
	const session = await auth();

	if (!session?.user?.id) {
		throw new Error('User not found');
	} else {
		const userId = session?.user?.id!;

		// loop over answers and insert
	}
}

export async function addTags(tags: any) {
	const session = await auth();

	if (!session?.user?.id) {
		throw new Error('User not found');
	} else {
		const userId = session?.user?.id!;

		// loop over tags and insert
	}
}
