[![Codacy Badge](https://app.codacy.com/project/badge/Grade/c81b4be336d2421b955290d96387be97)](https://www.codacy.com/gh/OneDash-DE/onedash-dialog/dashboard?utm_source=github.com&utm_medium=referral&utm_content=OneDash-DE/onedash-dialog&utm_campaign=Badge_Grade)
![npm](https://img.shields.io/npm/dw/onedash-dialog)

<img src="https://static.onedash.de/logo-text.png" width="200">

# React.js dialog component

This guide will help you render dialog components with React.js.
If you're not familiar with setting up a new React web project, please refer to the React documentation.

## Install

In order to install the components run the following:

```bash
npm install onedash-dialog
```

## Storybook

The documentation and examples can be found [here](https://react-dialogs.onedash.de/).

## Usage

All the described components can be imported from "onedash-dialog".

_Example:_

```javascript
import React from "react";

const BasicDialog = () => {
	const [isOpen, updateIsOpen] = React.useState(false);

	const close = () => {
		updateIsOpen(false);
	};

	return (
		<div>
			<div className="card">
				<ExampleContent />
			</div>
			<Dialog isOpen={isOpen} onClose={close}>
				<ExampleContent />
				<div className="buttons">
					<button className="cancel" onClose={close}>
						Cancel
					</button>
					<button className="submit" onClose={close}>
						Submit
					</button>
				</div>
			</Dialog>
		</div>
	);
};
```

## Styling

Most components come without any style. You can adjust it yourself by CSS. If you like the style in this documentation, you can use our stylesheet from [here](https://github.com/OneDash-DE/onedash-dialog/blob/master/src/components/stories/dialog.sass).
