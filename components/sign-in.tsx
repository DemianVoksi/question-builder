import { signIn } from '@/auth';
import { FaGithub } from 'react-icons/fa';
import { Button } from './ui/button';

export default function SignIn() {
	return (
		<form
			className='w-[50%] flex flex-row justify-center'
			action={async () => {
				'use server';
				await signIn('github');
			}}
		>
			<Button type='submit' variant='black' className='w-[75%]'>
				<FaGithub /> GitHub
			</Button>
		</form>
	);
}
