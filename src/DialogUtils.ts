import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

const DialogUtils = {
	enableScrolling: (target?: Element | null) => {
		if (!target) return;
		target.classList.remove("disable-scrolling");
		enableBodyScroll(target);
	},
	disableScrolling: (target?: Element | null) => {
		if (!target) return;
		target.classList.add("disable-scrolling");
		disableBodyScroll(target);
	},

	clearAllBodyScrollLocks,
};

export default DialogUtils;
