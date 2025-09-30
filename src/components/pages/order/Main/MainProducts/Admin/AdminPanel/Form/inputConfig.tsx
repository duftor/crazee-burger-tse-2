import { FaHamburger } from "react-icons/fa"
import { BsFillCameraFill } from "react-icons/bs"
import { MdOutlineEuro } from "react-icons/md"
import { FiPackage } from "react-icons/fi"
import { GoMegaphone } from "react-icons/go"
import { isAvailableOptions, isPublicisedOptions } from "../../../../../../../../constants/select"
import { Product } from "@/types/Product"

export const getInputConfig = (newProduct: Product) => [
	[
		{
			id: "0",
			type: "text" as const,
			name: "title",
			value: newProduct.title,
			placeholder: "Nom du produit (ex: Super Burger)",
			Icon: <FaHamburger />,
			version: "minimalist",
			className: "title",
		},
		{
			id: "1",
			type: "text" as const,
			name: "imageSource",
			value: newProduct.imageSource,
			placeholder: "Lien URL d'une image (ex: https://la-photo-de-mon-produit.png)",
			Icon: <BsFillCameraFill />,
			version: "minimalist",
			className: "image-source",
		},
	],

	[
		{
			id: "2",
			type: "text" as const,
			name: "price",
			value: newProduct.price ? newProduct.price : "",
			placeholder: "Prix",
			Icon: <MdOutlineEuro />,
			version: "minimalist",
			className: "price",
		},
	],
	[
		{
			id: "3",
			type: "select" as const,
			name: "isAvailable",
			value: newProduct.isAvailable.toString(),
			options: isAvailableOptions,
			Icon: <FiPackage />,
			className: "is-available",
		},
		{
			id: "4",
			type: "select" as const,
			name: "isPublicised",
			value: newProduct.isPublicised.toString(),
			options: isPublicisedOptions,
			Icon: <GoMegaphone />,
			className: "is-publicised",
		},
	],
]
