[![Codacy Badge](https://app.codacy.com/project/badge/Grade/8248b4ff9cc84153a6fda1dfbbf10e17)](https://www.codacy.com/gh/OneDash-DE/onedash-react-table/dashboard?utm_source=github.com&utm_medium=referral&utm_content=OneDash-DE/onedash-react-table&utm_campaign=Badge_Grade)
![npm](https://img.shields.io/npm/dw/onedash-react-table)

<img src="https://static.onedash.de/logo-text.png" width="200">

# React.js table component

This guide will help you render table components with React.js.
If you're not familiar with setting up a new React web project, please refer to the React documentation.

## Install

In order to install the components run the following:

```bash
npm install onedash-react-table
```

## Storybook

The documentation and examples can be found [here](https://react-tables.onedash.de/).

## Usage

All the described components can be imported from "onedash-react-table".

_Example:_

```javascript
import React, Component from "react";
import {Table, Column, Row, Cell} from "onedash-react-table";

class ComponentWithForm extends Component {
	render() {
		return (
			<Table {...args}>
				<Column name="firstName" label="Vorname" />
				<Column name="lastName" label="Nachname" />
				<Column name="age" label="Alter" />
				<Column name="address" label="Adresse" />
				{rows.map((row, i) => (
					<Row key={i} row={row}>
						<Cell name="firstName" />
						<Cell name="lastName" />
						<Cell name="age" />
						<Cell name="address" />
					</Row>
				))}
			</Table>
		)
	}
}
```

## Styling

Most components come without any style. You can adjust it yourself by CSS. If you like the style in this documentation, you can use our stylesheet from [here](https://github.com/OneDash-DE/onedash-react-table/blob/master/src/components/stories/table.sass).
