import { theme } from "@/theme/theme"
import styled from "styled-components"

export default function Footer() {
	return (
		<FooterStyled>
			<div className="rights-reserved">© 2025 Groovy Burger — Tous droits réservés.</div>
			<div className="made-by">Made with ❤️ by Victor</div>
		</FooterStyled>
	)
}

const FooterStyled = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100vw;
	padding-bottom: 50px;

	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${theme.spacing.xs};

	font-size: ${theme.fonts.size.P0};
	color: ${theme.colors.white};
`
