import { Color, theme } from "@/theme/theme"
import styled, { css } from "styled-components"
import { getCategoryIcon } from "@/utils/icon"
import { applyOpacity } from "@/utils/color"
import { IS_SELECTED_COLOR } from "@/constants/categories"
import { Category } from "@/types/Category"
import { ComponentPropsWithoutRef } from "react"

type ChipVariant = "filled" | "hoverable"

type ChipProps = Category &
	ComponentPropsWithoutRef<"div"> & {
		variant?: ChipVariant
		backgroundColor?: string
	}

export const Chip = ({
	label,
	iconName,
	color,
	className,
	isActive,
	variant = "filled",
	backgroundColor,
	...restProps
}: ChipProps) => {
	const defaultBorderColor = color ? applyOpacity(color, 0.3) : "transparent"
	const defaultBackgroundColor = color ? applyOpacity(color, 0.1) : "transparent"

	const IconToDisplay = getCategoryIcon(iconName)

	const getActiveColor = () => (backgroundColor ? backgroundColor : IS_SELECTED_COLOR.backgroundColor)

	const colorApplied = isActive ? IS_SELECTED_COLOR.color : color
	const backgroundColorApplied =
		variant === "filled" ? (isActive ? getActiveColor() : defaultBackgroundColor) : "transparent"
	const borderColorApplied = variant === "filled" ? (isActive ? getActiveColor() : defaultBorderColor) : "transparent"

	return (
		<ChipStyled
			color={colorApplied}
			backgroundColor={backgroundColorApplied}
			borderColor={borderColorApplied}
			variant={variant}
			className={className}
			{...restProps}>
			{IconToDisplay && (
				<div className="icon">
					<IconToDisplay color={color} />
				</div>
			)}
			{label && <span className="label">{label}</span>}
		</ChipStyled>
	)
}

type ChipStyledProps = {
	borderColor: string
	backgroundColor: string
	color: Color | ""
	variant: ChipVariant
}

const ChipStyled = styled.div<ChipStyledProps>`
	box-sizing: border-box;
	border: ${({ borderColor }) => `1px solid ${borderColor}`};
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2px 16px;
	border-radius: ${theme.borderRadius.badgeRound};
	background-color: ${({ backgroundColor }) => backgroundColor};
	column-gap: 10px;

	.label {
		color: ${({ color }) => color};
		white-space: nowrap;
	}

	.icon {
		display: flex; // aligne verticalement l'icone
		/* margin-right: 10px; */ // mauvais car si y'a pas de label, l'icone montre un margin right chelou.
	}

	.delete-chip {
		margin-left: 5px;
		color: ${({ color }) => color};
	}

	${({ variant, color }) =>
		variant === "hoverable" &&
		color &&
		`
    &:hover {
      box-sizing: border-box;
      background-color: ${applyOpacity(color, 0.1)};
    }`}
`
