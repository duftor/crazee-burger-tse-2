// iconMap.ts
import { MdQuestionMark } from "react-icons/md"
import { FaHamburger } from "react-icons/fa"
import { RiDrinks2Line } from "react-icons/ri"
import { LuSalad, LuCakeSlice } from "react-icons/lu"
import { GiChocolateBar } from "react-icons/gi"
import { CiFries } from "react-icons/ci"
import { BsCupHotFill } from "react-icons/bs"
import { IoFastFoodOutline } from "react-icons/io5"
import { IconType } from "react-icons"
import { IconName } from "@/types/Category"

const categoryIcons: Record<IconName, IconType> = {
	sandwich: FaHamburger,
	verre: RiDrinks2Line,
	veggies: LuSalad,
	dessert: LuCakeSlice,
	frites: CiFries,
	chocolateBar: GiChocolateBar,
	"tasse chaude": BsCupHotFill,
	menu: IoFastFoodOutline,
}

export function getCategoryIcon(iconName: IconName | "") {
	if (!iconName) return null
	return categoryIcons[iconName] ?? MdQuestionMark
}
