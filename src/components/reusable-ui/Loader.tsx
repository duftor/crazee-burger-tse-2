import styled from "styled-components"
import { ImSpinner8 } from "react-icons/im"
import { spin } from "@/theme/animations"
import { Color, FontSizeKey, theme } from "@/theme/theme"

type LoaderProps = {
	size?: FontSizeKey
	color?: Color
}

export default function Loader({ size = "SM", color = theme.colors.greyMedium }: LoaderProps) {
	return (
		<LoaderStyled size={size ?? "SM"} color={color}>
			<ImSpinner8 className="spinner-icon" />
		</LoaderStyled>
	)
}

type LoaderStyledProps = {
	size?: FontSizeKey
	color?: Color
}
const LoaderStyled = styled.div<LoaderStyledProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;

	.spinner-icon {
		font-size: ${({ size }) => theme.fonts.size[size ?? "SM"]};
		animation: ${spin} 1s linear infinite;
		color: ${({ color }) => color || theme.colors.primary};
	}
`
