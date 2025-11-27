import { Chip } from "@/components/reusable-ui/Chip"
import { Preview } from "./Preview"
import { Category } from "@/types/Category"
import { theme } from "@/theme/theme"

type CategoryPreviewProps = {
	entity: Category
}

export const CategoryPreview = ({ entity }: CategoryPreviewProps) => {
	return (
		<Preview>
			{entity.label ? <Chip {...entity} /> : <span style={{ color: theme.colors.greyBlue }}>Aucune preview</span>}
		</Preview>
	)
}
