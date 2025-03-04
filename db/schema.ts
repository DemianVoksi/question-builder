import type { AdapterAccount } from '@auth/core/adapters';
import { relations } from 'drizzle-orm';
import {
	boolean,
	integer,
	pgEnum,
	pgTable,
	primaryKey,
	text,
	timestamp,
} from 'drizzle-orm/pg-core';
import { v4 as uuidv4 } from 'uuid';

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
export const users = pgTable('user', {
	id: text('id')
		.notNull()
		.primaryKey()
		.$defaultFn(() => uuidv4()),
	name: text('name'),
	email: text('email').notNull(),
	emailVerified: timestamp('emailVerified'),
	image: text('image'),
	role: roleEnum('role').notNull().default('user'),
	createdAt: timestamp('created_at').defaultNow(),
});

// Questions table
export const questions = pgTable('question', {
	id: text('id')
		.notNull()
		.primaryKey()
		.$defaultFn(() => uuidv4()),
	question: text('question').notNull(),
	authorId: text('author_id')
		.notNull()
		.references(() => users.id),
	submittedAt: timestamp('submitted_at').defaultNow(),
	difficulty: difficultyEnum('difficulty').notNull(),
	category: text('category').notNull(),
	approved: boolean('approved').default(false),
	approvedBy: text('approved_by').references(() => users.id),
});

// Answers table
export const answers = pgTable('answer', {
	id: text('id')
		.notNull()
		.primaryKey()
		.$defaultFn(() => uuidv4()),
	answer: text('answer').notNull(),
	isTrue: boolean('is_true').notNull(),
	questionId: text('question_id').references(() => questions.id),
});

// Tags table
export const tags = pgTable('tag', {
	id: text('id')
		.notNull()
		.primaryKey()
		.$defaultFn(() => uuidv4()),
	tag: text('tag').notNull(),
	questionId: text('question_id').references(() => questions.id),
});

export const accounts = pgTable(
	'account',
	{
		userId: text('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		type: text('type').$type<AdapterAccount['type']>().notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: text('token_type'),
		scope: text('scope'),
		id_token: text('id_token'),
		session_state: text('session_state'),
	},
	(account) => [
		{
			compoundKey: primaryKey({
				columns: [account.provider, account.providerAccountId],
			}),
		},
	]
);

export const sessions = pgTable('session', {
	sessionToken: text('sessionToken').notNull().primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
	'verificationToken',
	{
		identifier: text('identifier').notNull(),
		token: text('token').notNull(),
		expires: timestamp('expires', { mode: 'date' }).notNull(),
	},
	(vt) => [
		{
			compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
		},
	]
);

// Relations
export const usersRelations = relations(users, ({ many }) => ({
	questions: many(questions, { relationName: 'questionAuthor' }),
	approvedQuestions: many(questions, { relationName: 'questionApprover' }),
}));

export const questionsRelations = relations(questions, ({ one, many }) => ({
	author: one(users, {
		fields: [questions.authorId],
		references: [users.id],
		relationName: 'questionAuthor',
	}),
	approvedBy: one(users, {
		fields: [questions.approvedBy],
		references: [users.id],
		relationName: 'questionApprover',
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
