export interface DialogProps {
	/**
	 * Boolean describing if the modal should be shown or not.
	 */
	isOpen: boolean;

	/**
	 * A function which is called when the dialog should be closed
	 */
	onClose?: () => void;

	/**
	 * Function that will be run after the modal has opened.
	 */
	onAfterOpen?: () => void;

	/**
	 *  Function that will be run after the modal has closed.
	 */
	onAfterClose?: () => void;

	/**
	 * CSS styles for dialog and overlay
	 */
	style?: { overlay?: React.CSSProperties; dialog?: React.CSSProperties };

	/**
	 * Classname which should be applied
	 */
	className?: string;

	/**
	 * ID which should be applied
	 */
	id?: string;

	/**
	 * Boolean whether the wrapper click should be disabled. Useful e.g. for prompt dialogs.
	 */
	disableWrapperClick?: boolean;

	/**
	 * Boolean whether the Escape key should call the onClose method
	 */
	disableEsc?: boolean;

	/**
	 * Close btn which should be applied
	 */
	closeBtn?: JSX.Element;

	/**
	 * Target where to render the dialog. Default is document.body
	 */
	target?: Element;

	/**
	 * Childrens which should be rendered inside dialog
	 */
	children?: React.ReactNode;

	/**
	 * Number how long the closing animation runs.
	 * Default: 0.3s
	 */
	closeAnimationLength?: number;

	/**
	 * Number how long the opening animation runs
	 * Default: 0.3s
	 */
	openAnimationLength?: number;

	/**
	 * Element to which the scrolling lock should be applied.
	 * Default: document.body
	 */
	scrollingLockTarget?: Element;

	/**
	 * Boolean has to be set true in order to disable height helper. This function will create a custom css variable wh (window height)
	 * which can be used e.g. to define max height of dialog
	 */
	disableHeightHelper?: boolean;

	/**
	 * Title of dialog which is not in dialog content
	 */
	title?: React.ReactChild;

	disableScrollLocking?: boolean;
}

export enum LocalCodes {
	Yes,
	No,
}
export type LocalizationTexts = { [key in LocalCodes]: string };
