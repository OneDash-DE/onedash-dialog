/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { DialogProps } from "../../types";
import Dialog from "../Dialog";
import ExampleContent from "./ExampleContent";

const BasicDialog = (props: DialogProps) => {
	const [isOpen, update] = React.useState(props.isOpen);
	React.useEffect(() => {
		update(props.isOpen);
	}, [props.isOpen]);
	return (
		<div>
			<div className="card">
				<ExampleContent onClick={() => update(true)} />
			</div>
			<Dialog {...props} isOpen={isOpen} onClose={() => update(false)}>
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
