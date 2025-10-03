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
import { applyOpacity } from "@/utils/color"

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
	OptionComponent?: (option: T) => JSX.Element
	MultiValueComponent?: (option: T) => JSX.Element
} & Props<T, true>

export const MultiSelect = <T extends BaseOptions>({
	name,
	options,
	value,
	onChange,
	Icon,
	OptionComponent,
	MultiValueComponent,
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

	const Option = (props: OptionProps<T, true>) => {
		const data = props.data
		return (
			<components.Option {...props}>
				{OptionComponent ? <OptionComponent {...data} /> : <span>{data.label}</span>}
			</components.Option>
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
				Option,
				DropdownIndicator: () => null,
				IndicatorSeparator: () => null,
			}}
			menuPlacement="top"
		/>
	)
}

const ControlStyled = styled.div`
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
		display: "flex",
		aligItems: "center",
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
	placeholder: (base) => ({
		...base,
		color: theme.colors.greyMedium,
	}),
	input: (base) => ({
		...base,
		color: theme.colors.dark,
		display: "flex",
		alignItems: "stretch",
	}),
	option: (base) => ({
		...base,
		backgroundColor: "transparent",
		padding: "0",
		display: "flex",
		justifyContent: "flex-start",
		width: "100%",
		height: "34px",
		cursor: "pointer",
		":hover": {
			backgroundColor: "transparent",
		},
	}),
	menu: (base) => ({
		...base,
	}),
	menuList: (base) => ({
		...base,
		display: "flex",
		flexDirection: "column",
		gap: "6px",
		padding: "10px 6px",
	}),
	valueContainer: (base) => ({
		...base,
		display: "flex",
		flexWrap: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
		padding: "4px 0",
		gap: "4px",
	}),
	multiValue: (base, props) => ({
		...base,
		fontFamily: theme.fonts.family.openSans,
		margin: 0,
		border: `1px solid ${applyOpacity(props.data.color, 0.3)}`,
		backgroundColor: applyOpacity(props.data.color, 0.1),
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: "2px 16px",
		borderRadius: theme.borderRadius.badgeRound,
		columnGap: "10px",
	}),
	multiValueLabel: (base, props) => ({
		...base,
		color: props.data.color,
		padding: 0,
		margin: 0,
		display: "flex",
		alignItems: "center",
	}),

	multiValueRemove: (base) => ({
		...base,
		padding: 0,
		marginLeft: 0, // un petit gap si tu veux garder la croix
	}),
})
