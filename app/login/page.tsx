import { LoginForm } from '@/components/loginForm';
import Navbar from '@/components/navbar';

export default function Page() {
	return (
		<div className='items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]'>
			<Navbar />
			<div className='w-full max-w-sm mt-48'>
				<LoginForm />
			</div>
		</div>
	);
}
