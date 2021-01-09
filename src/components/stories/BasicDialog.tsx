/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { DialogProps } from "../../types";
import Dialog from "../Dialog";
import ExampleContent from "./ExampleContent";

const BasicDialog = (props: DialogProps) => {
	return (
		<div>
			<div className="card">
				<ExampleContent />
			</div>
			<Dialog {...props}>
				<ExampleContent />
				<div className="buttons">
					<button className="cancel">Cancel</button>
					<button className="submit">Submit</button>
				</div>
			</Dialog>
		</div>
	);
};

export default BasicDialog;
