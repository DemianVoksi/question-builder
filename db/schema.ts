import { relations } from 'drizzle-orm';
import {
	boolean,
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
} from 'drizzle-orm/pg-core';

// Enums
export const difficultyEnum = pgEnum('difficulty_type', [
	'easy',
	'medium',
	'hard',
]);
export const roleEnum = pgEnum('role_type', [
	'administrator',
	'moderator',
	'user',
]);

// Users table
export const users = pgTable('users', {
	id: integer('id').primaryKey(),
	email: text('email').notNull(),
	emailVerified: timestamp('email_verified'),
	image: text('image'),
	role: roleEnum('role').notNull().default('user'),
	createdAt: timestamp('created_at').defaultNow(),
});

// Questions table
export const questions = pgTable('questions', {
	id: integer('id').primaryKey(),
	question: text('question').notNull(),
	authorId: integer('author_id').references(() => users.id),
	submittedAt: timestamp('submitted_at').defaultNow(),
	difficulty: difficultyEnum('difficulty').notNull(),
	category: text('category').notNull(),
	approved: boolean('approved').default(false),
	approvedBy: integer('approved_by').references(() => users.id),
});

// Answers table
export const answers = pgTable('answers', {
	id: integer('id').primaryKey(),
	answer: text('answer').notNull(),
	isTrue: boolean('is_true').notNull(),
	questionId: integer('question_id').references(() => questions.id),
});

// Tags table
export const tags = pgTable('tags', {
	id: integer('id').primaryKey(),
	tag: text('tag').notNull(),
	questionId: integer('question_id').references(() => questions.id),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
	questions: many(questions),
	approvedQuestions: many(questions),
}));

export const questionsRelations = relations(questions, ({ one, many }) => ({
	author: one(users, {
		fields: [questions.authorId],
		references: [users.id],
	}),
	approvedBy: one(users, {
		fields: [questions.approvedBy],
		references: [users.id],
	}),
	answers: many(answers),
	tags: many(tags),
}));

export const answersRelations = relations(answers, ({ one }) => ({
	question: one(questions, {
		fields: [answers.questionId],
		references: [questions.id],
	}),
}));

export const tagsRelations = relations(tags, ({ one }) => ({
	question: one(questions, {
		fields: [tags.questionId],
		references: [questions.id],
	}),
}));
