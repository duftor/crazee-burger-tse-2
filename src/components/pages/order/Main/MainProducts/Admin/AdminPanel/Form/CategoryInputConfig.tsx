import { Category } from "@/types/Category"
import { InputConfig } from "@/types/Inputs"
import { IoPricetag } from "react-icons/io5"

type GetInputConfigType = (newProduct: Category) => InputConfig[][]

const colorOptions = [
	{ value: "red", label: "Rouge" },
	{ value: "blue", label: "Bleu" },
	{ value: "green", label: "Vert" },
	{ value: "yellow", label: "Jaune" },
	{ value: "orange", label: "Orange" },
	{ value: "purple", label: "Violet" },
	{ value: "pink", label: "Rose" },
	{ value: "brown", label: "Marron" },
	{ value: "grey", label: "Gris" },
	{ value: "black", label: "Noir" },
]

const iconOptions = [
	{ value: "burger", label: "Burger" },
	{ value: "fries", label: "Frites" },
	{ value: "drink", label: "Boisson" },
	{ value: "dessert", label: "Dessert" },
	{ value: "salad", label: "Salade" },
	{ value: "pizza", label: "Pizza" },
	{ value: "sushi", label: "Sushi" },
	{ value: "coffee", label: "Café" },
	{ value: "ice-cream", label: "Glace" },
	{ value: "steak", label: "Steak" },
]

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
		},
	],
	[
		{
			id: "1",
			type: "select" as const,
			name: "color",
			value: newCategory.color,
			// placeholder: "Sélectionner une couleur",
			options: colorOptions,
			Icon: <IoPricetag />,
		},
	],
	[
		{
			id: "1",
			type: "select" as const,
			name: "iconName",
			value: newCategory.iconName,
			// placeholder: "Sélectionner une icône",
			options: iconOptions,
			Icon: <IoPricetag />,
		},
	],
]
