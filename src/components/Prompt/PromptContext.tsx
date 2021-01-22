import { createContext, useContext } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PromptState {}
export const initialPromptState: PromptState = {};

export interface PromptContextInterface extends PromptState {
	yesNoPrompt: (title: React.ReactChild, text: React.ReactChild) => Promise<boolean>;
}

/**
 * @ignore
 */
const stub = (): never => {
	throw new Error("You forgot to wrap your component in <Prompt0Provider>.");
};

/**
 * @ignore
 */
const initialContext = {
	...initialPromptState,
	yesNoPrompt: stub,
};

/**
 * The Prompt0 Context
 */
const PromptContext = createContext<PromptContextInterface>(initialContext);

export default PromptContext;

export const usePrompt = (): PromptContextInterface => useContext(PromptContext);