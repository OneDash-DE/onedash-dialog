/* eslint-disable no-console */
import React from "react";
import { usePrompt } from "../Prompt/PromptContext";

const PromptDialog = () => {
	const { yesNoPrompt, buttonsPrompt } = usePrompt();

	const onYesNoPromptClick = () => {
		yesNoPrompt("Are you really sure?", "Here comes the text with additional information.").then((yes) => {
			if (yes) {
				console.log("Yes has been pressed");
			} else {
				console.log("No has been pressed");
			}
		});
	};

	const onButtonsPromptClick = () => {
		buttonsPrompt("Which cake do you like?", "Choose you favorite cake!", [
			{ text: "Cheese Cake", value: "cheese-cake", focus: true },
			{ text: "Honey Cake", value: "honey-cake" },
		]).then((btnValue) => {
			console.log(`${btnValue} has been choosen.`);
		});
	};
	return (
		<div className="prompt-dialog">
			<button onClick={onYesNoPromptClick}>Yes - No Prompt</button>
			<button onClick={onButtonsPromptClick}>Buttons Prompt</button>
		</div>
	);
};

export default PromptDialog;
