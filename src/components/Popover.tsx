/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { PopoverProps } from "../types";
import DialogUtils from "../DialogUtils";

const DEFAULT_ANIMATION_TIMEOUT = 300;

const initialDialogState = {
	isVisible: false,
	isClosing: false,
	isMoving: false,
	isOpening: false,
	touchMargin: 0,
};

const Popover = ({
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
	disableSwipe,
}: PopoverProps) => {
	const [state, update] = React.useState(initialDialogState);
	const [touchState, updateTouchState] = React.useState({ touchStartY: 0, touchMoveY: 0 });
	const contentRef = React.useRef<HTMLDivElement>(null);

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
		const el = scrollingLockTarget ?? contentRef.current;
		DialogUtils.disableScrolling(el);
	}, [disableScrollLocking, scrollingLockTarget]);
	const enabelScrolling = useCallback(() => {
		if (disableScrollLocking) return;
		const el = scrollingLockTarget ?? contentRef.current;
		DialogUtils.enableScrolling(el);
	}, [disableScrollLocking, scrollingLockTarget]);

	useEffect(() => {
		if (state.isVisible === isOpen) return;

		if (state.isVisible) {
			// Closes
			enabelScrolling();
			update((s) => ({ ...s, isOpening: false, isVisible: false, isClosing: true, isMoving: true }));
			setTimeout(() => {
				update({ isOpening: false, isVisible: false, isClosing: false, isMoving: false, touchMargin: 0 });
				onAfterClose?.();
			}, closeAnimationLength ?? DEFAULT_ANIMATION_TIMEOUT);
		} else {
			// Opens
			update({ isClosing: false, isOpening: true, isVisible: true, isMoving: true, touchMargin: 0 });
			setTimeout(() => {
				disableScrolling();
				update({ isClosing: false, isOpening: false, isVisible: true, isMoving: false, touchMargin: 0 });
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
		// Register Keyhandler
		if (state.isVisible) {
			document.addEventListener("keydown", onKeydown);
			if (!disableHeightHelper) {
				DialogUtils.registerHeightHelper();
			}
		} else {
			document.removeEventListener("keydown", onKeydown);
		}
		// cleanup function
		return () => {
			document.removeEventListener("keydown", onKeydown);
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
		if (e.target.classList.contains("popover-wrapper")) close();
	};

	const buildClassName = () => {
		let c = "onedash-popover-v2";
		if (className) c += ` ${className}`;
		if (state.isVisible) c += " visible";
		if (state.isMoving) c += " is-moving";
		if (state.isOpening) c += " is-opening";
		if (state.isClosing) c += " is-closing";
		return c;
	};

	const touchValid = (e: any) => {
		const cl = e.target.classList;
		return !disableSwipe && onClose && (cl.contains("popover") || cl.contains("popover-touchbar") || cl.contains("popover-title"));
	};

	const touchMove = (e: any) => {
		if (!touchValid(e)) return;
		updateTouchState((s) => {
			s.touchMoveY = e.touches[0].clientY;
			if (s.touchMoveY - s.touchStartY > 0) {
				update((x) => ({ ...x, touchMargin: -((s.touchMoveY - s.touchStartY) ** 1.05) }));
			}
			return s;
		});
	};

	const touchStart = (e: any) => {
		if (!touchValid(e)) return;
		updateTouchState((s) => ({ ...s, touchStartY: e.touches[0].clientY }));
	};

	const touchEnd = (e: any) => {
		if (!touchValid(e)) return;
		const diff = touchState.touchMoveY - touchState.touchStartY;
		if (diff > 120) {
			close();
		} else {
			update((x) => ({ ...x, touchMargin: 0, isMoving: true }));
			setTimeout(() => {
				update((x) => ({ ...x, isMoving: false }));
			}, 250);
		}
	};

	if (!state.isVisible && !state.isClosing && !state.isOpening) return <></>;

	return createPortal(
		<div id={id} className={buildClassName()}>
			<div onClick={onWrapperClick} role="dialog" className="popover-wrapper">
				<div
					onTouchStart={touchStart}
					onTouchEnd={touchEnd}
					onTouchMove={touchMove}
					style={{ ...style?.popover, marginBottom: state.touchMargin }}
					className="popover"
				>
					{!disableSwipe && onClose && <div className="popover-touchbar" />}
					{closeBtn && (
						<button className="close-btn" onClick={close}>
							{closeBtn}
						</button>
					)}

					{title && <h1 className="popover-title">{title}</h1>}

					<div className="content" ref={contentRef}>
						{children}
					</div>
				</div>
			</div>

			<div style={style?.overlay} className="popover-bg" />
		</div>,
		target ?? document.body
	);
};

export default Popover;
