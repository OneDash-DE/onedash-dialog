import React, { useCallback, useRef, useState } from "react";
import locales from "../../Localization";
import { IButton, LocalCodes } from "../../types";
import Dialog from "../Dialog";
import PromptContext from "./PromptContext";

const initialPromptState = {
	isOpen: false,
	title: "" as React.ReactChild,
	text: "" as React.ReactChild,
	resolve: undefined as undefined | ((b: number | string | boolean) => void),
	buttons: [] as IButton[],
};

const PromptProvider = ({ children }: any): JSX.Element => {
	const focusBtn = useRef<HTMLButtonElement>(null);

	const [state, update] = useState(initialPromptState);

	const yesNoPrompt = useCallback((title: React.ReactChild, text: React.ReactChild) => {
		return new Promise<boolean>((resolve: any) => {
			update({
				isOpen: true,
				resolve,
				text,
				title,
				buttons: [
					{
						value: true,
						text: locales()[LocalCodes.Yes],
						className: "yes",
						focus: true,
					},
					{
						value: false,
						text: locales()[LocalCodes.No],
						className: "no",
					},
				],
			});
		});
	}, []);

	const buttonsPrompt = useCallback((title: React.ReactChild, text: React.ReactChild, buttons: IButton[]) => {
		return new Promise<number | string | boolean>((resolve) => {
			update({
				isOpen: true,
				resolve,
				text,
				title,
				buttons,
			});
		});
	}, []);

	const close = (answer: number | string | boolean) => {
		state.resolve?.(answer);
		update({
			...state,
			isOpen: false,
		});
	};

	const focusYes = useCallback(() => {
		focusBtn.current?.focus();
	}, [focusBtn]);

	return (
		<PromptContext.Provider
			value={{
				yesNoPrompt,
				buttonsPrompt,
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
				<div className="buttons" role="tablist" aria-label={locales()[LocalCodes.AnswerList]}>
					{state.buttons.map((b) => (
						<button
							key={String(b.value)}
							ref={b.focus === true ? focusBtn : undefined}
							className={b.className ?? ""}
							onClick={() => close(b.value)}
						>
							{b.text}
						</button>
					))}
				</div>
			</Dialog>
		</PromptContext.Provider>
	);
};

export default PromptProvider;
