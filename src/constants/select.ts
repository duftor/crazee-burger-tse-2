import { Option } from "@/types/Inputs"

export const isAvailableOptions: Option[] = [
	{ optionValue: "true", label: "En stock" },
	{ optionValue: "false", label: "En rupture" },
]

export const isPublicisedOptions: Option[] = [
	{ optionValue: "false", label: "Sans pub" },
	{ optionValue: "true", label: "Avec pub" },
]
