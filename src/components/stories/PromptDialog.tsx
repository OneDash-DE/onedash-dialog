/* eslint-disable no-console */
import React from "react";
import { usePrompt } from "../Prompt/PromptContext";

const PromptDialog = () => {
	const { yesNoPromt } = usePrompt();

	const onClick = () => {
		yesNoPromt("Are you really sure?", "Here comes the text with additional information.").then((yes) => {
			if (yes) {
				console.log("Yes has been pressed");
			} else {
				console.log("No has been pressed");
			}
		});
	};
	return (
		<div className="prompt-dialog">
			<button onClick={onClick}>Open Prompt</button>
		</div>
	);
};

export default PromptDialog;
