import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { ModeToggle } from './ui/mode-toggle';

const Navbar = () => {
	return (
		<nav
			style={{ backgroundColor: 'var(--navbar-bg-color)' }}
			className='w-full h-12 mb-4 flex flex-row justify-center items-center sticky top-0 z-50'
		>
			<div className='w-1/4 h-full flex flex-row justify-start items-center pl-5 text-orange-400'>
				<Link href='/'>Episteme</Link>
			</div>
			<div className='w-1/2 h-full flex flex-row justify-center items-center text-white'></div>
			<div className='w-1/4 h-full flex flex-row justify-end items-center pr-5'>
				<div className='pr-3'>
					<ModeToggle />
				</div>{' '}
				<Link href='/profile' className='text-white'>
					Profile
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
