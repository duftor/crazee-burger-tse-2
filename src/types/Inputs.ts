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
	className: string
}

export type SelectInputConfig = {
	id: string
	type: "select"
	name: string
	value: string
	options: Option[]
	Icon: JSX.Element
	className: string
}

export type InputConfig = TextInputConfig | SelectInputConfig

export function isTextInput(input: InputConfig): input is TextInputConfig {
	return input.type === "text"
}
