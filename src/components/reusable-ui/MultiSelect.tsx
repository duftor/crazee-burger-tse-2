import { BaseOptions } from "@/types/Inputs"
import Select, { GroupBase, MultiValue, OptionsOrGroups, Props } from "react-select"

type MultiSelectProps<T extends BaseOptions> = {
	name: string
	options?: OptionsOrGroups<T, GroupBase<T>>
	value?: T[]
	onChange?: (event: { target: { name: string; value: T[] } }) => void
} & Props<T, true>

export const MultiSelect = <T extends BaseOptions>({
	name,
	options,
	value,
	onChange,
	...restProps
}: MultiSelectProps<T>) => {
	const handleChange = (selected: MultiValue<T>) => {
		const fakeEvent = {
			target: { name, value: [...selected] },
		}
		onChange?.(fakeEvent)
	}

	return (
		<Select
			isMulti
			value={value}
			closeMenuOnSelect={false}
			options={options}
			onChange={handleChange}
			noOptionsMessage={() => "Plus d'options"}
			{...restProps}
			// styles={colourStyles}
		/>
	)
}

// const colourStyles: StylesConfig<ColourOption, true> = {
// 	control: (styles) => ({ ...styles, backgroundColor: "white" }),
// 	option: (styles, { data, isDisabled, isFocused, isSelected }) => {
// 		const color = chroma(data.color)
// 		return {
// 			...styles,
// 			backgroundColor: isDisabled
// 				? undefined
// 				: isSelected
// 				? data.color
// 				: isFocused
// 				? color.alpha(0.1).css()
// 				: undefined,
// 			color: isDisabled
// 				? "#ccc"
// 				: isSelected
// 				? chroma.contrast(color, "white") > 2
// 					? "white"
// 					: "black"
// 				: data.color,
// 			cursor: isDisabled ? "not-allowed" : "default",

// 			":active": {
// 				...styles[":active"],
// 				backgroundColor: !isDisabled ? (isSelected ? data.color : color.alpha(0.3).css()) : undefined,
// 			},
// 		}
// 	},
// 	multiValue: (styles, { data }) => {
// 		const color = chroma(data.color)
// 		return {
// 			...styles,
// 			backgroundColor: color.alpha(0.1).css(),
// 		}
// 	},
// 	multiValueLabel: (styles, { data }) => ({
// 		...styles,
// 		color: data.color,
// 	}),
// 	multiValueRemove: (styles, { data }) => ({
// 		...styles,
// 		color: data.color,
// 		":hover": {
// 			backgroundColor: data.color,
// 			color: "white",
// 		},
// 	}),
// }
