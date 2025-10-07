import { CategoryColor, categoryColors } from "@/theme/theme"
import { IconName } from "@/types/Category"
import { Option } from "@/types/Inputs"

export const isAvailableOptions: Option[] = [
	{ optionValue: "true", label: "En stock" },
	{ optionValue: "false", label: "En rupture" },
]

export const isPublicisedOptions: Option[] = [
	{ optionValue: "false", label: "Sans pub" },
	{ optionValue: "true", label: "Avec pub" },
]

type ColorOption = {
	optionValue: CategoryColor
	label: string
}

export const colorOptions: ColorOption[] = [
	{ optionValue: categoryColors.orange, label: "Orange" },
	{ optionValue: categoryColors.blue, label: "Bleu" },
	{ optionValue: categoryColors.green, label: "Vert" },
	{ optionValue: categoryColors.pink, label: "Rose" },
	{ optionValue: categoryColors.yellow, label: "Jaune" },
	{ optionValue: categoryColors.red, label: "Rouge" },
]

type IconOption = {
	optionValue: IconName
	label: string
}

export const iconOptions: IconOption[] = [
	{ optionValue: "sandwich", label: "Sandwich" },
	{ optionValue: "verre", label: "Verre" },
	{ optionValue: "veggies", label: "Veggies" },
	{ optionValue: "dessert", label: "Dessert" },
	{ optionValue: "frites", label: "Frites" },
	{ optionValue: "chocolateBar", label: "Chocolate Bar" },
]
