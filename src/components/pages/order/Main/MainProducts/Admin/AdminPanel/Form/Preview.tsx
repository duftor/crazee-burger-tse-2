import { theme } from "@/theme/theme"
import { PropsWithChildren } from "react"
import styled, { css } from "styled-components"

type PreviewProps = { withBorder?: boolean } & PropsWithChildren

export function Preview({ withBorder = true, children }: PreviewProps) {
	return <PreviewStyled withBorder={withBorder}>{children}</PreviewStyled>
}

type PreviewStyledProps = { withBorder: boolean }

const PreviewStyled = styled.div<PreviewStyledProps>`
	grid-area: 1 / 1 / 4 / 2;
	display: flex;
	justify-content: center;
	align-items: center;

	border-radius: ${theme.borderRadius.round};
	${({ withBorder }) => withBorder && withBorderStyle}
`

const withBorderStyle = css`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid ${theme.colors.greyLight};
	line-height: 1.5;
`
