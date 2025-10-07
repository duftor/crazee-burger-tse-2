import { theme } from "@/theme/theme"
import { BaseOptions } from "@/types/Inputs"
import Select, { components, GroupBase, MultiValueProps, OptionProps, Props, ValueContainerProps } from "react-select"
import { applyOpacity } from "@/utils/color"
import { getCategoryIcon } from "@/utils/icon"
import { stylesMultiSelect } from "./stylesMultiSelect"
import { IconType } from "react-icons"
import { Category } from "@/types/Category"
import { Product } from "@/types/Product"

type MultiSelectProps<Option> = Props<Option, true> & {
	customIcon?: IconType
}

export const MultiSelect = <Option extends BaseOptions>({
	isMulti = true,
	customIcon,
	...restProps
}: MultiSelectProps<Option>) => (
	<Select
		{...restProps}
		isMulti={isMulti}
		styles={stylesMultiSelect<Option>()}
		noOptionsMessage={() => "Plus d'option disponible"}
		closeMenuOnSelect={false}
		// @ts-ignore
		customIcon={customIcon}
		components={{
			Option: CustomOption,
			MultiValue: CustomMultiValue,
			ValueContainer: CustomValueContainer,
			// ValueContainer,
			DropdownIndicator: () => null,
			IndicatorSeparator: () => null,
		}}
	/>
)

const CustomValueContainer = <Option extends BaseOptions>({
	children,
	...props
}: ValueContainerProps<Option, true, GroupBase<Option>> & { customIcon?: IconType }) => {
	const childrenArray = Array.isArray(children) ? children : [children]
	const [values, input] = childrenArray
	const hasValue = props.getValue().length === 0
	const selectProps = props.selectProps as MultiSelectProps<Option>
	const IconToDisplay = selectProps.customIcon

	console.log("props", selectProps.customIcon)

	return (
		<components.ValueContainer {...props}>
			{IconToDisplay && (
				<IconToDisplay color={theme.colors.greyBlue} style={{ flexShrink: 0, marginRight: 10 }} />
			)}
			<div
				style={{
					overflowX: "scroll",
					scrollbarWidth: "none",
					textWrap: "nowrap",
				}}>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						// gap: 13,
						color: "#9CA3AF",
						fontSize: theme.fonts.size.P1,
						fontWeight: 500,
						marginRight: 6,
						// whiteSpace: "nowrap",
						// overflow: "hidden",
						textOverflow: "ellipsis",
						flex: 1,
						minWidth: 0,
						scrollbarWidth: "none",
						marginLeft: 2,
						width: "100%",
						// border: "1px solid blue"
					}}>
					{hasValue ? (
						<span
							style={{
								marginLeft: 3,
								color: theme.colors.greyMedium,
								fontSize: theme.fonts.size.SM,
							}}>
							{props.selectProps.placeholder}
						</span>
					) : (
						<span
							style={{
								// border: " 1px solid red",
								paddingLeft: 0,
								display: "flex",
								overflowX: "auto",
								minWidth: 0,
								flex: 1, // assure-toi que le container peut shrink
							}}>
							{values}
						</span>
					)}
				</div>
			</div>
			{input}
		</components.ValueContainer>
	)
}

const CustomOption = <Option extends BaseOptions>(props: OptionProps<Option, true, GroupBase<Option>>) => {
	const { data: optionData, innerRef, innerProps, isFocused, isSelected } = props
	const data = optionData as unknown as Category | Product

	const OptionIcon = "iconName" in data ? getCategoryIcon(data.iconName) : null

	let bgColor = "lightgrey"

	if ("color" in data) {
		bgColor = isSelected ? applyOpacity(data.color, 0.25) : isFocused ? applyOpacity(data.color, 0.1) : "white"
	} else {
		bgColor = isSelected ? "blue" : isFocused ? theme.colors.greyLight : "white"
	}

	return (
		<div
			ref={innerRef}
			{...innerProps}
			style={{
				backgroundColor: bgColor,
				color: "color" in data ? data.color : theme.colors.greyBlue,
				display: "flex",
				alignItems: "center",
				gap: 8,
				padding: "6px 15px",
				margin: 6,
				borderRadius: 20,
				fontWeight: 500,
				cursor: "pointer",
				width: "fit-content",
				borderWidth: 1,
				borderColor: "red",
			}}>
			{OptionIcon && (
				<span style={{ color: "color" in data ? data.color : theme.colors.dark, display: "flex" }}>
					{<OptionIcon />}
				</span>
			)}
			<span>{"label" in data ? data.label : ""}</span>
		</div>
	)
}

const CustomMultiValue = <Option extends BaseOptions>(props: MultiValueProps<Option>) => {
	const { data: optionData } = props
	const data = optionData as unknown as Category

	const ValueIcon = data.iconName ? getCategoryIcon(data.iconName) : null // attention, ici on n'a pas le composant en JSX.Element, on n'a pour l'instant que la référence au composant JSX.Element
	const color = data.color ?? theme.colors.dark
	return (
		<components.MultiValue {...props}>
			<div
				style={{
					display: "flex",
					gap: 6,
					paddingLeft: 4,
				}}>
				{ValueIcon && (
					<span style={{ color: data.color, top: 1.5, position: "relative" }}>{<ValueIcon />}</span>
				)}
				<span style={{ color: color }}>{data.label}</span>
			</div>
		</components.MultiValue>
	)
}
