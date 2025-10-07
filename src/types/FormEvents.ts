type FormElement = HTMLInputElement | HTMLSelectElement

export type ChangeHandler = React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
export type FocusHandler = React.FocusEventHandler<FormElement>

export type FormEvents = {
	onChange?: ChangeHandler
	onFocus?: FocusHandler
	onBlur?: FocusHandler
}
