'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Filter = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const createQueryString = (name: string, value: string) => {
		const params = new URLSearchParams(searchParams);
		if (value) {
			params.set(name, value);
		} else {
			params.delete(name);
		}
		return params.toString();
	};

	const clearFilters = () => {
		router.push(pathname);
	};

	return (
		<div className='flex flex-col gap-6 p-4 font-lato'>
			<h2 className='font-bold underline'>Filter</h2>
			<div className='space-y-2'>
				<Label htmlFor='question'>Question Content</Label>
				<Input
					id='question'
					placeholder='Search questions...'
					className='w-full'
					onChange={(e) => {
						router.push(
							pathname + '?' + createQueryString('question', e.target.value)
						);
					}}
					defaultValue={searchParams.get('question') ?? ''}
				/>
			</div>
			<div className='space-y-2'>
				<Label htmlFor='difficulty'>Difficulty Level</Label>
				<Select
					onValueChange={(value) => {
						router.push(
							pathname + '?' + createQueryString('difficulty', value)
						);
					}}
					defaultValue={searchParams.get('difficulty') ?? 'all'}
				>
					<SelectTrigger className='w-full'>
						<SelectValue placeholder='Select difficulty' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='all'>All Difficulties</SelectItem>
						<SelectItem value='easy'>Easy</SelectItem>
						<SelectItem value='medium'>Medium</SelectItem>
						<SelectItem value='hard'>Hard</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className='space-y-2'>
				<Label htmlFor='approved'>Approval Status</Label>
				<Select
					onValueChange={(value) => {
						router.push(pathname + '?' + createQueryString('approved', value));
					}}
					defaultValue={searchParams.get('approved') ?? 'all'}
				>
					<SelectTrigger className='w-full'>
						<SelectValue placeholder='Select status' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='all'>All Status</SelectItem>
						<SelectItem value='true'>Approved</SelectItem>
						<SelectItem value='false'>Pending</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className='space-y-2'>
				<Label htmlFor='category'>Category</Label>
				<Select
					onValueChange={(value) => {
						router.push(pathname + '?' + createQueryString('category', value));
					}}
					defaultValue={searchParams.get('category') ?? 'all'}
				>
					<SelectTrigger className='w-full'>
						<SelectValue placeholder='Select category' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='all'>All Categories</SelectItem>
						<SelectItem value='biology'>Biology</SelectItem>
						<SelectItem value='film-and-tv'>Film & TV</SelectItem>
						<SelectItem value='food-and-drinks'>Food & Drinks</SelectItem>
						<SelectItem value='geography'>Geography</SelectItem>
						<SelectItem value='history'>History</SelectItem>
						<SelectItem value='literature'>Literature</SelectItem>
						<SelectItem value='mathematics'>Mathematics</SelectItem>
						<SelectItem value='music'>Music</SelectItem>
						<SelectItem value='politics'>Politics</SelectItem>
						<SelectItem value='religion'>Religion</SelectItem>
						<SelectItem value='science'>Science</SelectItem>
						<SelectItem value='sport'>Sport</SelectItem>
						<SelectItem value='technology'>Technology</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<Button variant='outline' onClick={clearFilters} className='w-full mt-4'>
				Clear Filters
			</Button>
		</div>
	);
};

export default Filter;
