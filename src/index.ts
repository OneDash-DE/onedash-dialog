import Dialog from "./components/Dialog";
import { DE, EN } from "./locales";
import * as types from "./types";
import { setLocaleMessages } from "./Localization";
import PromptProvider from "./components/Prompt/PromptProvider";
import { usePrompt } from "./components/Prompt/PromptContext";

const DialogLocales = {
	DE,
	EN,
};

export { Dialog, DialogLocales, PromptProvider, usePrompt, setLocaleMessages, types };
