/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { DialogProps } from "../types";

const DEFAULT_ANIMATION_TIMEOUT = 300;

const initialDialogState = {
	isVisible: false,
	isClosing: false,
	isOpening: false,
};

const Dialog = ({
	className,
	children,
	closeBtn,
	id,
	isOpen,
	onAfterClose,
	onAfterOpen,
	onClose,
	style,
	closeAnimationLength,
	openAnimationLength,
	target,
	scrollingLockTarget,
	disableHeightHelper,
	title,
	disableWrapperClick,
	disableEsc,
	disableScrollLocking,
}: DialogProps) => {
	const [state, update] = React.useState(initialDialogState);

	const close = useCallback(() => {
		if (onClose) {
			onClose();
		} else {
			// eslint-disable-next-line no-console
			console.warn("You have to provide a 'onClose' callback function which updates isOpen!");
		}
	}, [onClose]);

	const disableScrolling = useCallback(() => {
		if (disableScrollLocking) return;
		const el = scrollingLockTarget ?? document.body;
		el.classList.add("disable-scrolling");
		disableBodyScroll(el);
	}, [disableScrollLocking, scrollingLockTarget]);
	const enabelScrolling = useCallback(() => {
		if (disableScrollLocking) return;
		const el = scrollingLockTarget ?? document.body;
		el.classList.remove("disable-scrolling");
		enableBodyScroll(el);
	}, [disableScrollLocking, scrollingLockTarget]);

	useEffect(() => {
		if (state.isVisible === isOpen) return;

		if (state.isVisible) {
			// Closes
			update({ isOpening: false, isVisible: false, isClosing: true });
			setTimeout(() => {
				update({ isOpening: false, isVisible: false, isClosing: false });
				onAfterClose?.();
				enabelScrolling();
			}, closeAnimationLength ?? DEFAULT_ANIMATION_TIMEOUT);
		} else {
			// Opens
			disableScrolling();
			update({ isClosing: false, isOpening: true, isVisible: true });
			setTimeout(() => {
				update({ isClosing: false, isOpening: false, isVisible: true });
				onAfterOpen?.();
			}, openAnimationLength ?? DEFAULT_ANIMATION_TIMEOUT);
		}
	}, [state, isOpen, closeAnimationLength, openAnimationLength, onAfterClose, onAfterOpen, enabelScrolling, disableScrolling]);

	const onKeydown = useCallback(
		(e: any) => {
			if (disableEsc === true) return;
			if (e.key === "Escape") close();
		},
		[close, disableEsc]
	);

	useEffect(() => {
		const onResize = () => {
			document.documentElement.style.setProperty("--wh", `${window.innerHeight / 100}px`);
		};

		// Register Keyhandler
		if (state.isVisible) {
			document.addEventListener("keydown", onKeydown);
			if (!disableHeightHelper) window.addEventListener("resize", onResize);
			onResize();
		} else {
			document.removeEventListener("keydown", onKeydown);
			window.removeEventListener("resize", onResize);
		}
		// cleanup function
		return () => {
			document.removeEventListener("keydown", onKeydown);
			window.removeEventListener("resize", onResize);
		};
	}, [onKeydown, disableHeightHelper, state.isVisible]);

	useEffect(() => {
		// Remove all existing scroll locks
		return () => {
			enabelScrolling();
		};
	}, [enabelScrolling]);

	const onWrapperClick = (e: any) => {
		if (disableWrapperClick === true) return;
		if (e.target.classList.contains("dialog-wrapper")) close();
	};

	const buildClassName = () => {
		let c = "onedash-dialog-v2";
		if (className) c += ` ${className}`;
		if (state.isVisible) c += " visible";
		if (state.isOpening) c += " is-opening";
		if (state.isClosing) c += " is-closing";
		return c;
	};

	if (!state.isVisible && !state.isClosing && !state.isOpening) return <></>;

	return createPortal(
		<div id={id} className={buildClassName()}>
			<div onClick={onWrapperClick} role="dialog" className="dialog-wrapper">
				<div style={style?.dialog} className="dialog">
					{title && <h1 className="dialog-title">{title}</h1>}
					{closeBtn && (
						<button className="close-btn" onClick={close}>
							{closeBtn}
						</button>
					)}
					<div className="content">{children}</div>
				</div>
			</div>
			<div style={style?.overlay} className="dialog-bg" />
		</div>,
		target ?? document.body
	);
};

export default Dialog;
