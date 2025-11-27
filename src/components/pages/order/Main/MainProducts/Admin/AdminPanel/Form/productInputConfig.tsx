import { FaHamburger } from "react-icons/fa"
import { BsFillCameraFill } from "react-icons/bs"
import { FiPackage } from "react-icons/fi"
import { GoMegaphone } from "react-icons/go"
import { isAvailableOptions, isPublicisedOptions } from "../../../../../../../../constants/select"
import { Product } from "@/types/Product"
import { InputConfig } from "@/types/Inputs"
import { IoPricetag } from "react-icons/io5"
import { Category } from "@/types/Category"
import { MdOutlineEuro } from "react-icons/md"

type GetInputConfigType = (newProduct: Product, categories: Category[]) => InputConfig[][]

export const getProductInputConfig: GetInputConfigType = (newProduct, categories) => [
	[
		{
			id: "1",
			type: "text" as const,
			name: "title",
			value: newProduct.title,
			placeholder: "Nom du produit (ex: Super Burger)",
			Icon: <FaHamburger />,
			version: "minimalist",
		},
		{
			id: "2",
			type: "text" as const,
			name: "imageSource",
			value: newProduct.imageSource,
			placeholder: "Lien URL d'une image (ex: https://la-photo-de-mon-produit.png)",
			Icon: <BsFillCameraFill />,
			version: "minimalist",
		},
	],
	[
		{
			id: "3",
			type: "multiselect" as const,
			name: "categories",
			options: categories,
			value: newProduct.categories,
			customIcon: IoPricetag,
			placeholder: "Catégorie (ex: Boisson)",
		},
	],
	[
		{
			id: "4",
			type: "text" as const,
			name: "price",
			value: newProduct.price ? newProduct.price : "",
			placeholder: "Prix",
			Icon: <MdOutlineEuro />,
			version: "minimalist",
		},
		{
			id: "5",
			type: "select" as const,
			name: "isAvailable",
			value: newProduct.isAvailable.toString(),
			options: isAvailableOptions,
			Icon: <FiPackage />,
		},
		{
			id: "6",
			type: "select" as const,
			name: "isPublicised",
			value: newProduct.isPublicised.toString(),
			options: isPublicisedOptions,
			Icon: <GoMegaphone />,
		},
	],
]
