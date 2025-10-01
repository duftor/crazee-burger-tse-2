import { theme } from "@/theme/theme"
import { BaseOptions } from "@/types/Inputs"
import { IoPricetag } from "react-icons/io5"
import Select, {
	components,
	ControlProps,
	GroupBase,
	MultiValue,
	OptionProps,
	OptionsOrGroups,
	Props,
	StylesConfig,
} from "react-select"
import styled from "styled-components"
import { Chip } from "./Chip"

type MultiSelectOnChange<T> = (event: {
	target: {
		name: string
		value: T[]
	}
}) => void

type MultiSelectProps<T extends BaseOptions> = {
	name: string
	options?: OptionsOrGroups<T, GroupBase<T>>
	value?: T[]
	onChange?: MultiSelectOnChange<T>
	Icon?: JSX.Element
} & Props<T, true>

export const MultiSelect = <T extends BaseOptions>({
	name,
	options,
	value,
	onChange,
	Icon,
	...restProps
}: MultiSelectProps<T>) => {
	const handleChange = (selected: MultiValue<T>) => {
		const fakeEvent = {
			target: { name, value: [...selected] },
		}
		onChange?.(fakeEvent)
	}

	const Control = (props: ControlProps<T, true>) => {
		return (
			<ControlStyled>
				<components.Control {...props}>
					{Icon && (
						<div className="icon">
							<IoPricetag size={15} />
						</div>
					)}
					<div className="input">{props.children}</div>
				</components.Control>
			</ControlStyled>
		)
	}

	return (
		<Select
			isMulti
			value={value}
			closeMenuOnSelect={false}
			options={options}
			onChange={handleChange}
			noOptionsMessage={() => "Plus d'options"}
			placeholder="Catégorie (ex: Boisson)"
			styles={createMultiSelectStyles<T>()}
			{...restProps}
			components={{
				Control,
				DropdownIndicator: () => null,
				IndicatorSeparator: () => null,
			}}
			menuPlacement="top"
		/>
	)
}

const ControlStyled = styled.div`
	display: flex;
	align-items: center;
	width: 100%;

	.icon {
		display: flex;
		align-items: "center";
		padding: 12px 0px 12px 24px;
		color: ${theme.colors.greyBlue};
	}

	.input {
		padding-left: 5px;
	}
`

const createMultiSelectStyles = <T extends BaseOptions>(): StylesConfig<T, true> => ({
	container: (base) => ({
		...base,
		width: "100%",
		fontFamily: theme.fonts.family.openSans,
		fontSize: theme.fonts.size.SM,
	}),
	control: (base) => ({
		...base,
		boxShadow: "none",
		border: "none",
		backgroundColor: theme.colors.background_white,
		color: theme.colors.greySemiDark,
		width: "100%",
		justifyContent: "flex-start",
		alignItems: "center",
		position: "relative",
	}),
	indicatorsContainer: (base) => ({
		...base,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		width: "36px",
		height: "100%",
		paddingRight: "8px",
		right: 0,
		top: 0,
	}),
	clearIndicator: (base) => ({
		...base,
		color: theme.colors.grey,
		padding: 4,
		"&:hover": {
			color: theme.colors.greyMedium,
			cursor: "pointer",
		},
	}),
	valueContainer: (base) => ({
		...base,
		display: "flex",
		flexWrap: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
	}),
	placeholder: (base) => ({
		...base,
		color: theme.colors.greyMedium,
	}),
	input: (base) => ({
		...base,
		color: theme.colors.dark,
	}),
	option: (base, state) => ({
		...base,
	}),
})
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
