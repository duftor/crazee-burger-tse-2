import styled from "styled-components"
import { ImSpinner8 } from "react-icons/im"
import { spin } from "@/theme/animations"
import { theme } from "@/theme/theme"

export default function Loader() {
	return (
		<LoaderWrapper>
			<ImSpinner8 className="spinner-icon" />
		</LoaderWrapper>
	)
}

const LoaderWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	.spinner-icon {
		font-size: ${theme.fonts.size.SM};
		animation: ${spin} 1s linear infinite;
	}
`
