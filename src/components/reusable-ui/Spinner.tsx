import styled from "styled-components"
import { FaSpinner } from "react-icons/fa"
import { spin } from "@/theme/animations"

export default function Spinner() {
	return (
		<SpinnerWrapper>
			<FaSpinner className="spinner-icon" />
		</SpinnerWrapper>
	)
}

const SpinnerWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	.spinner-icon {
		font-size: 15px;
		animation: ${spin} 1s linear infinite;
	}
`
