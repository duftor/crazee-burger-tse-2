import styled from "styled-components"
import { ImSpinner8 } from "react-icons/im"
import { spin } from "@/theme/animations"
import { theme } from "@/theme/theme"

export default function Loader({ variant = "SM", color = theme.colors.greyMedium }: any) {
	return (
		<LoaderStyled variant={variant ?? "SM"} color={color}>
			<ImSpinner8 className="spinner-icon" />
		</LoaderStyled>
	)
}

const LoaderStyled = styled.div<any>`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;

	.spinner-icon {
		font-size: ${({ variant }) => theme.fonts.size[variant ?? "SM"]};
		animation: ${spin} 1s linear infinite;
		color: ${({ color }) => color || theme.colors.primary};
	}
`
