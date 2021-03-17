/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { PopoverProps } from "../../types";
import Popover from "../Popover";
import ExampleContent from "./ExampleContent";

const BasicPopover = (props: PopoverProps) => {
	const [isOpen, update] = React.useState(props.isOpen);
	React.useEffect(() => {
		update(props.isOpen);
	}, [props.isOpen]);
	return (
		<div>
			<div className="card">
				<ExampleContent onClick={() => update(true)} />
			</div>
			<Popover {...props} isOpen={isOpen} onClose={() => update(false)}>
				<ExampleContent />
			</Popover>
		</div>
	);
};

export default BasicPopover;
