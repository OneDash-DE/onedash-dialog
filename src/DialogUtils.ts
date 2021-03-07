import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

const onResize = () => {
	document.documentElement.style.setProperty("--wh", `${window.innerHeight / 100}px`);
};

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

	registerHeightHelper: () => {
		if (document.documentElement.style.getPropertyValue("--wh") === "") {
			window.addEventListener("resize", onResize);
			onResize();
		}
	},
	unregisterHeightHelper: () => {
		window.removeEventListener("resize", onResize);
	},
};

export default DialogUtils;
