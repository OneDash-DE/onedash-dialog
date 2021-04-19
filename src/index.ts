import Dialog from "./components/Dialog";
import Popover from "./components/Popover";
import { DE, EN } from "./locales";
import * as types from "./types";
import { setLocaleMessages } from "./Localization";
import PromptProvider from "./components/Prompt/PromptProvider";
import { usePrompt } from "./components/Prompt/PromptContext";
import DialogUtils from "./DialogUtils";

const DialogLocales = {
	DE,
	EN,
};

export { Dialog, DialogLocales, PromptProvider, DialogUtils, usePrompt, setLocaleMessages, types, Popover };
