import { EN } from "./locales";
import { LocalizationTexts } from "./types";

let LOCAL_MESSAGES: LocalizationTexts = EN;

export const setLocaleMessages = (messages: LocalizationTexts) => {
	LOCAL_MESSAGES = messages;
};
const locales = () => LOCAL_MESSAGES;
export default locales;
