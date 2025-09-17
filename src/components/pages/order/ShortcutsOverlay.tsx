import { useOrderContext } from "@/context/OrderContext"
import { theme } from "@/theme/theme"
import styled from "styled-components"

export function ShortcutsOverlay() {
	const { isShortcutsOverlayVisible, hideShortcutsOverlay, isModeAdmin } = useOrderContext()

	if (!isShortcutsOverlayVisible || !isModeAdmin) return

	return (
		<ShortcutsOverlayStyled>
			<div className="shortcuts-wrapper">
				<div className="bold">💡 Pour aller plus vite :</div>
				<div>⌘ + i : Toggle "mode" admin</div>
				<div>⌘ + j : Toggle "panel" admin</div>
				<button className="button" onClick={hideShortcutsOverlay}>
					Ne plus afficher
				</button>
			</div>
		</ShortcutsOverlayStyled>
	)
}

const ShortcutsOverlayStyled = styled.div`
	background-color: ${theme.colors.dark};
	border-radius: ${theme.borderRadius.round};

	position: absolute;
	top: 0;
	left: 0;
	margin: 20px;

	.shortcuts-wrapper {
		display: flex;
		flex-direction: column;
		gap: ${theme.spacing.sm};
		padding: 20px;

		color: ${theme.colors.white};
		font-size: ${theme.fonts.size.SM};

		.bold {
			font-weight: ${theme.fonts.weights.bold};
			font-size: ${theme.fonts.size.P0};
		}

		.button {
			background-color: ${theme.colors.dark};
			color: ${theme.colors.white};
			border: 1px solid ${theme.colors.white};
			border-radius: 25px;
			padding: 13px 0px;
			cursor: pointer;

			&.button:hover {
				color: ${theme.colors.primary};
				border-color: ${theme.colors.primary};
			}

			&.button:active {
				color: ${theme.colors.primary_darken};
				border-color: ${theme.colors.primary_darken};
			}
		}
	}
`
