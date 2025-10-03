import { Color } from "@/theme/theme"
import { Category } from "./Category"

export type Option = {
	optionValue?: string | number | readonly string[]
	label: string
}

export type TextInputConfig = {
	id: string
	type: "text"
	name: string
	value: string | number
	placeholder: string
	Icon: JSX.Element
	version: string
	className?: string
}

export type SelectInputConfig = {
	id: string
	type: "select"
	name: string
	value: string
	options: Option[]
	Icon: JSX.Element
	className?: string
}

export type BaseOptions = {
	value: string
	label: string
	color?: Color | ""
}

export type MultiSelectInputConfig<T extends BaseOptions> = {
	id: string
	type: "multiselect"
	name: string
	defaultValue?: T[]
	options: T[]
	Icon: JSX.Element
	value?: T[]
}

// Based on Category for now, could be generic in the future if needed
export type InputConfig = TextInputConfig | SelectInputConfig | MultiSelectInputConfig<Category>

export function isTextInput(input: InputConfig): input is TextInputConfig {
	return input.type === "text"
}
export function isSelectInput(input: InputConfig): input is SelectInputConfig {
	return input.type === "select"
}
export function isMultiSelectInput(input: InputConfig): input is MultiSelectInputConfig<Category> {
	return input.type === "multiselect"
}
