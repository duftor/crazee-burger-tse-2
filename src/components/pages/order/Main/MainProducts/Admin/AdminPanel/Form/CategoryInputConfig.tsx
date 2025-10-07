import { colorOptions, iconOptions } from "@/constants/select"
import { Category } from "@/types/Category"
import { InputConfig } from "@/types/Inputs"
import { BsFillCameraFill } from "react-icons/bs"
import { IoPricetag } from "react-icons/io5"
import { PiPaintBucketFill } from "react-icons/pi"

type GetInputConfigType = (newProduct: Category) => InputConfig[][]

export const getCategoryInputConfig: GetInputConfigType = (newCategory) => [
	[
		{
			id: "1",
			type: "text" as const,
			name: "label",
			value: newCategory.label,
			placeholder: "Nom de la catégorie (ex: salade)",
			version: "minimalist",
			Icon: <IoPricetag />,
			autoFocus: true,
		},
	],
	[
		{
			id: "1",
			type: "select" as const,
			name: "color",
			value: newCategory.color,
			options: colorOptions,
			Icon: <PiPaintBucketFill />,
		},
	],
	[
		{
			id: "1",
			type: "select" as const,
			name: "iconName",
			value: newCategory.iconName,
			options: iconOptions,
			Icon: <BsFillCameraFill />,
		},
	],
]
