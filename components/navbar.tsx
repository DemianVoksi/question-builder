import React from 'react';
import { Button } from './ui/button';
import { ModeToggle } from './ui/mode-toggle';

const Navbar = () => {
	return (
		<nav
			style={{ backgroundColor: 'var(--navbar-bg-color)' }}
			className='w-full h-12 mb-12 flex flex-row justify-center items-center sticky top-0 z-50'
		>
			<div className='w-1/4 h-full flex flex-row justify-start items-center pl-5 text-orange-400'>
				Episteme
			</div>
			<div className='w-1/2 h-full flex flex-row justify-center items-center text-white'></div>
			<div className='w-1/4 h-full flex flex-row justify-end items-center pr-5'>
				<div className='pr-3'>
					<ModeToggle />
				</div>{' '}
				<Button variant='green'>User</Button>
			</div>
		</nav>
	);
};

export default Navbar;
