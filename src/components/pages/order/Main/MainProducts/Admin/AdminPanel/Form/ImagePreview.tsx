import { fadeIn } from "@/theme/animations"
import { theme } from "@/theme/theme"
import styled from "styled-components"
import { Preview } from "./Preview"

type ImagePreviewProps = {
	entity: {
		imageSource: string
		title: string
	}
}

export function ImagePreview({ entity }: ImagePreviewProps) {
	const { imageSource, title } = entity
	return (
		<Preview withBorder={!imageSource}>
			<ImagePreviewStyled>
				{imageSource ? <img src={imageSource} alt={title} /> : <div className="empty-image">Aucune Image</div>}
			</ImagePreviewStyled>
		</Preview>
	)
}

const ImagePreviewStyled = styled.div`
	img {
		width: 100px;
		height: 100px;
		object-fit: contain;
		object-position: center;
		animation: ${fadeIn} 1s;
	}

	.empty-image {
		color: ${theme.colors.greySemiDark};
	}
`
