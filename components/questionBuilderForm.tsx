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

	function submitter(data: QuestionFormType) {
		const correctChoice = data.correctAnswer.toString(); // choice1
		// const correctKey = Object.keys(data.answers).find(key => key === correctChoice)!
		const correctKey = correctChoice as keyof typeof data.answers;
		const finalCorrect = data.answers[correctKey];
		console.log(data.answers);
		console.log(finalCorrect);
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
						<Button type='submit'>submit</Button>
					</form>
				</Form>
				{/* <form
					className='flex flex-row'
					onSubmit={form.handleSubmit(submitter, onInvalid)}
				>
					<div className='flex flex-col w-[33%]'>
						<div className='mb-2'>
							<Label htmlFor='question' className='text-right'>
								Question:
							</Label>
							<Input id='name' placeholder='Question' className='w-[400px]' />
						</div>
						<div className='mb-2'>
							<Label htmlFor='answer1' className='text-right'>
								Answer 1:
							</Label>
							<Input
								id='answer1'
								placeholder='Answer 1'
								className='w-[400px]'
							/>
						</div>
						<div className='mb-2'>
							<Label htmlFor='answer2' className='text-right'>
								Answer 2:
							</Label>
							<Input
								id='answer2'
								placeholder='Answer 2'
								className='w-[400px]'
							/>
						</div>
						<div className='mb-2'>
							<Label htmlFor='answer3' className='text-right'>
								Answer 3:
							</Label>
							<Input
								id='answer3'
								placeholder='Answer 3'
								className='w-[400px]'
							/>
						</div>
						<div className='mb-2'>
							<Label htmlFor='answer4' className='text-right'>
								Answer 4:
							</Label>
							<Input
								id='answer4'
								placeholder='Answer 4'
								className='w-[400px]'
							/>
						</div>
						<div className='mb-2'>
							<Label htmlFor='correct-answer' className='text-right'>
								Correct answer:
							</Label>
							<Input
								id='correct-answer'
								placeholder='Correct answer'
								className='w-[400px]'
							/>
						</div>
					</div>
					<Card className='flex flex-col justify-center'>
						<CardContent className='flex flex-row justify-center'>
							<div className='flex flex-col pl-10 w-[33%]'>
								<div className=' flex flex-col items-start mb-2 w-[400px]'>
									<p>Difficulty:</p>
									<div className='flex flex-row items-center'>
										<Input
											id='easy'
											type='radio'
											value='easy'
											className='mr-1'
										/>
										<Label htmlFor='easy'>Easy</Label>
									</div>
									<div className='flex flex-row items-center'>
										<Input
											id='medium'
											type='radio'
											value='medium'
											className='mr-1'
										/>
										<Label htmlFor='medium'>Medium</Label>
									</div>
									<div className='flex flex-row items-center'>
										<Input
											id='hard'
											type='radio'
											value='hard'
											className='mr-1'
										/>
										<Label htmlFor='hard'>Hard</Label>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
					<div className='flex flex-col w-[33%]'></div>
				</form> */}
			</DialogContent>
		</Dialog>
	);
};

export default QuestionBuilderForm;
