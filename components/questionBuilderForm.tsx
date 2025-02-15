'use client';

import React from 'react';

import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { QuestionFormSchema, QuestionFormType } from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogTrigger } from '@radix-ui/react-dialog';
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

const QuestionBuilderForm = () => {
	const form = useForm<QuestionFormType>({
		resolver: zodResolver(QuestionFormSchema),
		defaultValues: {
			question: '',
			answers: {
				choice1: '',
				choice2: '',
				choice3: '',
				choice4: '',
			},
		},
	});

	const { fields, append, remove } = useFieldArray({
		name: 'tags',
		control: form.control,
	});

	const onInvalid = (errors: any) => console.error(errors);

	function processData(data: QuestionFormType) {
		const correctAnswerChoice = data.correctAnswer.toString();
		const correctAnswerKey = correctAnswerChoice as keyof typeof data.answers;
		const finalCorrect = data.answers[correctAnswerKey];
		console.log('Answers:', data.answers);
		console.log('Correct answer:', finalCorrect);
		console.log('Difficulty:', data.difficulty);
	}

	function submitter(data: QuestionFormType) {
		processData(data);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Add question</Button>
			</DialogTrigger>
			<DialogContent className='max-w-[1425px] h-[800px] flex flex-col'>
				<DialogHeader>
					<DialogTitle>Enter question</DialogTitle>
					<DialogDescription>
						Enter a new question here. Click submit when you're done.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(submitter, onInvalid)}>
						{/*
						Question
						*/}
						<FormField
							control={form.control}
							name='question'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder='Question...' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/*
						Answers
						*/}
						<FormField
							control={form.control}
							name='answers.choice1'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder='Choice 1' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='answers.choice2'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder='Choice 2' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='answers.choice3'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder='Choice 3' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='answers.choice4'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder='Choice 4' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/*
						Correct answer checkbox
						*/}
						{['choice1', 'choice2', 'choice3', 'choice4'].map(
							(choice, index) => (
								<FormField
									key={choice + 'Checkbox'}
									control={form.control}
									name='correctAnswer'
									render={({ field }) => (
										<FormItem className='flex items-center space-x-2'>
											<Checkbox
												checked={field.value === choice}
												onCheckedChange={() =>
													form.setValue(
														'correctAnswer',
														choice as
															| 'choice1'
															| 'choice2'
															| 'choice3'
															| 'choice4'
													)
												}
											/>
											<FormLabel>Choice {index + 1} is correct</FormLabel>
										</FormItem>
									)}
								/>
							)
						)}
						{/*
						Difficulty radio
						*/}
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
											// defaultValue={field.value}
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

						<Button type='submit'>submit</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default QuestionBuilderForm;
