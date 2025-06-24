import { createGlobalState } from "./index";

// Simple atomic states
export const useCount = createGlobalState("count", { value: 0 });
export const useUsername = createGlobalState("username", { value: "" });
export const useTheme = createGlobalState("theme", { value: "light", persist: true });