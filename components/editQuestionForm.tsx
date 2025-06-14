'use client';

import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	editAnswer,
	editQuestion,
	editTag,
	fetchQuestions,
} from '@/db/actions';
import { useStateContext } from '@/lib/contextProvider';
import {
	QuestionFormSchema,
	QuestionFormType,
	StructuredQuestionType,
} from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogTrigger } from '@radix-ui/react-dialog';
import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Checkbox } from './ui/checkbox';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';
import { Switch } from './ui/switch';

const EditQuestionForm = (props: StructuredQuestionType) => {
	const [open, setOpen] = useState(false);
	const { setFilteredQuestions } = useStateContext();
	const { data: session } = useSession();
	const userEmail = session?.user?.id || null;

	const form = useForm<QuestionFormType>({
		resolver: zodResolver(QuestionFormSchema),
		defaultValues: {
			question: props.questionText,
			answers: {
				choice1: props.answers[0].answer,
				choice2: props.answers[1].answer,
				choice3: props.answers[2].answer,
				choice4: props.answers[3].answer,
			},
			correctAnswer: getCorrectAnswerChoice(props),
			difficulty: props.difficulty as 'easy' | 'medium' | 'hard',
			category: props.category,
			tags: props.tags.map((tag) => ({ tag })),
			approved: props.approved!,
		},
	});

	function getCorrectAnswerChoice(props: StructuredQuestionType) {
		if (props.answers[0].isTrue) return 'choice1';
		if (props.answers[1].isTrue) return 'choice2';
		if (props.answers[2].isTrue) return 'choice3';
		if (props.answers[3].isTrue) return 'choice4';
	}

	const { fields, append, remove } = useFieldArray({
		name: 'tags',
		control: form.control,
	});

	const onInvalid = (errors: any) => console.error(errors);

	async function processData(data: QuestionFormType) {
		try {
			const correctAnswerChoice = data.correctAnswer.toString();
			const correctAnswerKey = correctAnswerChoice as keyof typeof data.answers;
			const finalCorrect = data.answers[correctAnswerKey];
			const approvedBy = data.approvedBy || null;

			const isTrue = new Map();
			for (const [key, value] of Object.entries(data.answers)) {
				isTrue.set(key, value === correctAnswerKey ? true : false);
			}

			// edit question
			await editQuestion(
				props.questionId,
				data.question,
				data.difficulty,
				data.category,
				data.approved,
				approvedBy
			);

			// edit answers
			for (const value of Object.values(data.answers)) {
				editAnswer(value, value === finalCorrect, props.questionId);
			}

			// edit tags
			if (data.tags) {
				for (const tag of data.tags) {
					await editTag(tag.tag, props.questionId);
				}
			}

			setOpen(false);
			const newQuestions = await fetchQuestions();
			setFilteredQuestions(newQuestions);
		} catch (error) {
			console.error('Error editing question:', error);
		}
	}

	function submitter(data: QuestionFormType) {
		processData(data);
	}
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='success' className='font-lato'>
					Edit question
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-[1425px] h-[800px] flex flex-col font-lato'>
				<DialogHeader>
					<DialogTitle>Edit question</DialogTitle>
					<DialogDescription>
						Edit the question here. Click submit when you're done.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(submitter, onInvalid)}>
						<div className='flex flex-row'>
							<div className='flex flex-col w-[50%] space-y-3 mb-4'>
								<FormField
									control={form.control}
									name='question'
									render={({ field }) => (
										<FormItem className='flex flex-col items-start justify-center mb-1'>
											<FormLabel>Question:</FormLabel>
											<FormControl>
												<Input
													placeholder='Question...'
													{...field}
													className='w-[75%]'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='answers.choice1'
									render={({ field }) => (
										<FormItem className='flex flex-col items-start justify-center mb-1'>
											<FormLabel>Answer 1:</FormLabel>
											<FormControl>
												<Input
													placeholder='Answer 1'
													{...field}
													className='w-[75%]'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='answers.choice2'
									render={({ field }) => (
										<FormItem className='flex flex-col items-start justify-center mb-1'>
											<FormLabel>Answer 2:</FormLabel>
											<FormControl>
												<Input
													placeholder='Answer 2'
													{...field}
													className='w-[75%]'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='answers.choice3'
									render={({ field }) => (
										<FormItem className='flex flex-col items-start justify-center mb-1'>
											<FormLabel>Answer 3:</FormLabel>
											<FormControl>
												<Input
													placeholder='Answer 3'
													{...field}
													className='w-[75%]'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='answers.choice4'
									render={({ field }) => (
										<FormItem className='flex flex-col items-start justify-center'>
											<FormLabel>Answer 4:</FormLabel>
											<FormControl>
												<Input
													placeholder='Answer 4'
													{...field}
													className='w-[75%]'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className='flex flex-col space-x-2 pt-2'>
									<Label className='mb-2'>Choose correct answer:</Label>
									{['choice1', 'choice2', 'choice3', 'choice4'].map(
										(choice, index) => (
											<FormField
												key={choice + 'Checkbox'}
												control={form.control}
												name='correctAnswer'
												render={({ field }) => (
													<FormItem className='flex flex-row items-center space-x-2'>
														<Checkbox
															checked={field.value === choice}
															onCheckedChange={() => {
																if (field.value !== choice) {
																	field.onChange(choice);
																}
															}}
														/>
														<FormLabel className='h-full items-center m-0 leading-none '>
															Answer {index + 1} is correct
														</FormLabel>
													</FormItem>
												)}
											/>
										)
									)}
								</div>
								<div className='flex flex-col pt-2'>
									<FormField
										key='difficulty'
										control={form.control}
										name='difficulty'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Difficulty:</FormLabel>
												<FormControl>
													<RadioGroup
														onValueChange={field.onChange}
														defaultValue={field.value}
														value={field.value}
													>
														<div className='flex items-center space-x-2'>
															<RadioGroupItem value='easy' id='easy' />
															<Label htmlFor='easy'>Easy</Label>
														</div>
														<div className='flex items-center space-x-2'>
															<RadioGroupItem value='medium' id='medium' />
															<Label htmlFor='medium'>Medium</Label>
														</div>
														<div className='flex items-center space-x-2'>
															<RadioGroupItem value='hard' id='hard' />
															<Label htmlFor='hard'>Hard</Label>
														</div>
													</RadioGroup>
												</FormControl>
											</FormItem>
										)}
									/>
								</div>
							</div>
							<div className='w-[50%]'>
								<FormField
									key='category'
									control={form.control}
									name='category'
									render={({ field }) => (
										<FormItem className='mb-4'>
											<FormControl>
												<Select
													value={field.value}
													onValueChange={field.onChange}
												>
													<SelectTrigger className='w-[280px]'>
														<SelectValue placeholder='Category' />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='biology'>Biology</SelectItem>
														<SelectItem value='film-and-tv'>
															Film & TV
														</SelectItem>
														<SelectItem value='food-and-drinks'>
															Food & Drinks
														</SelectItem>
														<SelectItem value='geography'>Geography</SelectItem>
														<SelectItem value='history'>History</SelectItem>
														<SelectItem value='literature'>
															Literature
														</SelectItem>
														<SelectItem value='mathematics'>
															Mathematics
														</SelectItem>
														<SelectItem value='music'>Music</SelectItem>
														<SelectItem value='politics'>Politics</SelectItem>
														<SelectItem value='religion'>Religion</SelectItem>
														<SelectItem value='science'>Science</SelectItem>
														<SelectItem value='sport'>Sport</SelectItem>
														<SelectItem value='technology'>
															Technology
														</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
										</FormItem>
									)}
								/>
								<div className='space-y-3'>
									{fields.map((field, index) => (
										<div
											key={index}
											className='flex flex-row justify-end items-center w-full'
										>
											<FormField
												key={field.id}
												control={form.control}
												name={`tags.${index}.tag`}
												render={({ field }) => (
													<div className='flex items-center space-x-2 w-full'>
														<Input
															{...field}
															placeholder='Enter tag'
															className='w-[75%]'
														/>
														<Button
															type='button'
															variant='danger'
															onClick={() => remove(index)}
														>
															Remove tag
														</Button>
													</div>
												)}
											/>
										</div>
									))}
									{fields.length < 7 && (
										<Button
											type='button'
											variant='success'
											onClick={() => append({ tag: '' })}
										>
											Add Tag
										</Button>
									)}
								</div>
								<div className='mt-4'>
									{/* If the user has the position of admin */}
									<FormField
										key='approved'
										name='approved'
										control={form.control}
										render={({ field }) => (
											<div className='flex flex-col space-y-2'>
												<Label htmlFor='approved'>Approved:</Label>
												<Switch
													id='approved'
													checked={field.value}
													onCheckedChange={(checked) => {
														field.onChange(checked);
														if (checked) {
															form.setValue('approvedBy', userEmail);
														} else {
															form.setValue('approvedBy', null);
														}
													}}
												/>
											</div>
										)}
									/>
								</div>
							</div>
						</div>
						<div className='flex justify-center mt-4'>
							<Button type='submit' variant='black'>
								Edit question
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default EditQuestionForm;
