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
import { Form, useFieldArray, useForm } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormMessage } from './ui/form';

const QuestionBuilderForm = () => {
	const form = useForm<QuestionFormType>({
		resolver: zodResolver(QuestionFormSchema),
	});

	const { fields, append, remove } = useFieldArray({
		name: 'tags',
		control: form.control,
	});

	const onInvalid = (errors: any) => console.error(errors);

	function submitter(data: QuestionFormType) {
		console.log(data);
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
					<form onSubmit={form.handleSubmit(submitter)}>
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

				<DialogFooter className='flex flex-row sm:justify-center'>
					<Button type='submit'>Submit</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default QuestionBuilderForm;
