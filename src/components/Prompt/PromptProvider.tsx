import React, { useCallback, useRef, useState } from "react";
import locales from "../../Localization";
import { LocalCodes } from "../../types";
import Dialog from "../Dialog";
import PromptContext from "./PromptContext";

const initialPromptState = {
	isOpen: false,
	title: "",
	text: "",
	resolve: undefined as undefined | ((b: boolean) => void),
};

const PromptProvider = ({ children }: any): JSX.Element => {
	const yesBtn = useRef<HTMLButtonElement>(null);

	const [state, update] = useState(initialPromptState);

	const yesNoPrompt = useCallback((title: string, text: string) => {
		return new Promise<boolean>((resolve) => {
			update({
				isOpen: true,
				resolve,
				text,
				title,
			});
		});
	}, []);

	const close = (answer: boolean) => {
		state.resolve?.(answer);
		update({
			...state,
			isOpen: false,
		});
	};

	const focusYes = useCallback(() => {
		yesBtn.current?.focus();
	}, [yesBtn]);

	return (
		<PromptContext.Provider
			value={{
				yesNoPrompt,
			}}
		>
			{children}
			<Dialog
				onAfterOpen={focusYes}
				className="prompt"
				onClose={() => close(false)}
				isOpen={state.isOpen}
				title={state.title}
				disableWrapperClick
			>
				<p>{state.text}</p>
				<div className="buttons">
					<button className="no" onClick={() => close(false)}>
						{locales()[LocalCodes.No]}
					</button>
					<button ref={yesBtn} className="yes" onClick={() => close(true)}>
						{locales()[LocalCodes.Yes]}
					</button>
				</div>
			</Dialog>
		</PromptContext.Provider>
	);
};

export default PromptProvider;
