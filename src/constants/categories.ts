import { theme } from "@/theme/theme"
import { Category } from "@/types/Category"
import { colorOptions, iconOptions } from "./select"

export const CATEGORY_ALL: Category = {
	id: "id-category-all",
	label: "Tous",
	color: theme.colors.greyDark,
	iconName: "",
	isActive: true,
	value: "",
}

// empty category by default
export const DEFAULT_CATEGORY: Category = {
	id: "id-icone-par-defaut",
	label: "",
	color: "",
	iconName: "",
	value: "",
}

export const EMPTY_CATEGORY: Category = {
	id: "",
	label: "",
	color: colorOptions[0].optionValue,
	iconName: iconOptions[0].optionValue,
	value: "",
}

export const IS_SELECTED_COLOR = {
	color: theme.colors.white,
	backgroundColor: theme.colors.background_dark,
	borderColor: theme.colors.dark,
}
