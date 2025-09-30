import React, { ComponentPropsWithRef } from "react"
import styled, { css } from "styled-components"
import { theme } from "@/theme/theme"
import ErrorMessage from "./ErrorMessage"

type TextInputVersion = "normal" | "minimalist"

// type TextInputProps = {
//   onChange?: React.ChangeEventHandler<HTMLInputElement>,
//   Icon: JSX.Element,
//   className?: string,
//   version?: TextInputVersion,
//   //  ...extraProps: unknown
// } & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type TextInputProps = {
	Icon: JSX.Element
	version?: TextInputVersion
	error?: string | null
} & ComponentPropsWithRef<"input">

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
	({ onChange, Icon, className, version = "normal", error, ...extraProps }, ref) => {
		return (
			<TextInputStyled className={className} version={version} hasError={!!error}>
				<div className="input-wrapper">
					<div className="icon">{Icon && Icon}</div>
					<input ref={ref} onChange={onChange} type="text" {...extraProps} />
				</div>
				{error && <ErrorMessage error={error} />}
			</TextInputStyled>
		)
	}
)

type TextInputStyledProps = {
	version: TextInputVersion
	hasError: boolean
}

export default TextInput
const TextInputStyled = styled.div<TextInputStyledProps>`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing.xs};
	font-size: ${theme.fonts.size.P0};
	width: 100%;

	.input-wrapper {
		border: 1px solid ${({ hasError }) => (hasError ? theme.colors.red : "transparent")};

		border-radius: ${theme.borderRadius.round};
		display: flex;
		align-items: center;

		${({ version }) => extraStyle[version]}
	}

	.icon {
		font-size: ${theme.fonts.size.SM};
		margin: 0 13px 0 8px;
		display: flex; // to center icon vertically
	}

	input {
		border: none;
		font-size: ${theme.fonts.size.SM};
		width: 100%;

		&::placeholder {
			color: ${theme.colors.greyMedium};
		}
	}
`

const extraStyleNormal = css`
	background-color: ${theme.colors.white};
	padding: 18px 28px;
	color: ${theme.colors.greySemiDark};

	input {
		color: ${theme.colors.dark};

		&::placeholder {
			background: ${theme.colors.white};
		}
	}
`

const extraStyleMinimalist = css`
	background-color: ${theme.colors.background_white};
	padding: 8px 16px;
	color: ${theme.colors.greyBlue};

	input {
		background: ${theme.colors.background_white}; ////+
		color: ${theme.colors.dark};

		&:focus {
			outline: 0; //// add outline
		}
	}
`

const extraStyle = {
	normal: extraStyleNormal,
	minimalist: extraStyleMinimalist,
}
