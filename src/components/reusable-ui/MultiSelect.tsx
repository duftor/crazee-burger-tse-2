import { theme } from "@/theme/theme"
import { BaseOptions } from "@/types/Inputs"
import Select, {
	components,
	GroupBase,
	MultiValue,
	OptionProps,
	OptionsOrGroups,
	Props,
	StylesConfig,
} from "react-select"
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
} & Props<T, true>

export const MultiSelect = <T extends BaseOptions>({
	name,
	options,
	value,
	onChange,
	Icon,
	OptionComponent,
	...restProps
}: MultiSelectProps<T>) => {
	const handleChange = (selected: MultiValue<T>) => {
		const fakeEvent = {
			target: { name, value: [...selected] },
		}
		onChange?.(fakeEvent)
	}

	const ValueContainer = (props: any) => {
		return (
			<components.ValueContainer {...props}>
				{Icon && <span style={{ marginRight: "12px", display: "flex", alignItems: "center" }}>{Icon}</span>}
				{props.children}
			</components.ValueContainer>
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
				Option,
				ValueContainer,
				DropdownIndicator: () => null,
				IndicatorSeparator: () => null,
			}}
			menuPlacement="top"
		/>
	)
}

const createMultiSelectStyles = <T extends BaseOptions>(): StylesConfig<T, true> => ({
	container: (base) => ({
		...base,
		width: "100%",
	}),
	control: (base) => ({
		...base,
		background: theme.colors.background_white,
		border: "none",
		borderRadius: theme.borderRadius.round,
		boxShadow: "none", // ✅ enlève le halo bleu au focus
		paddingLeft: 15,
		paddingRight: 15,
		"&:hover": {
			borderColor: "darkred", // 👈 si tu veux un hover plus marqué
			// pointerEvents: "visible"
		},
	}),

	indicatorsContainer: (base) => ({
		...base,
		position: "relative", // nécessaire pour le positionnement absolu interne
		justifyContent: "flex-end", // si t’enlèves le clear, ça reste aligné à droite
	}),

	clearIndicator: (base) => ({
		...base,
		marginRight: -7,
	}),

	indicatorSeparator: () => ({}),

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
	option: (base, props) => ({
		...base,
		// backgroundColor: getBgColorToApply(props.data, props.isSelected, props.isFocused),
		backgroundColor: "transparent",
		color: props.data.color ?? theme.colors.greyBlue,
		display: "flex",
		alignItems: "center",
		gap: 8,
		cursor: "pointer",
		":hover": {
			backgroundColor: "transparent",
		},
	}),
	menu: (base) => ({
		...base,
		width: "100%", // pour ajuster le width du menu déroulant. Par défaut il est à 100%.
		minWidth: 0,
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
		background: theme.colors.background_white,
		display: "flex",
		flexWrap: "nowrap", // on veut une seule ligne
		// overflowX: "auto", // scroll si ça dépasse
		maxWidth: "100%",
		scrollbarWidth: "none", // Firefox
		msOverflowStyle: "none", // IE/Edge
		color: theme.colors.greyBlue,
		"&::-webkit-scrollbar": {
			height: 4, // petit scroll horizontal
		},
		"&::-webkit-scrollbar-thumb": {
			backgroundColor: "#ccc", // couleur du scroll
			borderRadius: 4,
		},
		borderRadius: theme.borderRadius.round,
	}),
	multiValue: (base, props) => ({
		...base,
		backgroundColor: props.data.color
			? applyOpacity(props.data.color, 0.1)
			: applyOpacity(theme.colors.purple, 0.3), // ✅ on récupère la couleur définie dans l'option
		borderRadius: 20,
		border: `1px solid ${props.data.color}`, // 👈 ici le borderColor du badge
		padding: "0px 6px", // paddingVertical à 0px sinon, c'est trop gros et ça fait grandir verticalement le Select container. Teste, et change ça valeur à 30px, tu verras la différence en rajoutant une valeur.
		flexShrink: 0, // <-- empêche le squish
	}),
	multiValueLabel: (base, props) => ({
		...base,
		color: props.data.color,
		fontWeight: 500,
	}),
	multiValueRemove: (base, props) => ({
		...base,
		position: "relative",
		color: "white",
		backgroundColor: props.data.color ? props.data.color : theme.colors.dark,
		borderRadius: "50%",
		width: 14,
		height: 14,
		display: "flex",
		justifyContent: "center",
		alignSelf: "center",
		padding: 0,
		cursor: "pointer",
		marginLeft: 2,
		marginRight: 2,
		":hover": {
			backgroundColor: "transparent",
			color: props.data.color ?? theme.colors.dark,
			border: `1.5px solid ${props.data.color ?? theme.colors.dark}`,
		},
	}),
})
