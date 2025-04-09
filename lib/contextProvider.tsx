'use client';

import { StructuredQuestionType } from '@/types/types';
import React, { createContext, ReactNode, useContext, useState } from 'react';

type ContextType = {
	allQuestions: StructuredQuestionType[] | null;
	setAllQuestions: React.Dispatch<
		React.SetStateAction<StructuredQuestionType[] | null>
	>;
	filteredQuestions: StructuredQuestionType[] | null;
	setFilteredQuestions: React.Dispatch<
		React.SetStateAction<StructuredQuestionType[] | null>
	>;
};

export const StateContext = createContext<ContextType | null>(null);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
	const [allQuestions, setAllQuestions] = useState<
		StructuredQuestionType[] | null
	>(null);

	const [filteredQuestions, setFilteredQuestions] = useState<
		StructuredQuestionType[] | null
	>(null);

	return (
		<StateContext.Provider
			value={{
				allQuestions,
				setAllQuestions,
				filteredQuestions,
				setFilteredQuestions,
			}}
		>
			{children}
		</StateContext.Provider>
	);
};

export const useStateContext = (): ContextType => {
	const context = useContext(StateContext);
	if (!context) {
		throw new Error('StateContext must be used within a StateContext Provider');
	}
	return context;
};
