import { GenericForm } from "@/components/reusable-ui/GenericForm"
import { ImagePreview } from "@/components/reusable-ui/ImagePreview"
import { Product } from "@/types/Product"
import { getProductInputConfig } from "./productInputConfig"
import { useOrderContext } from "@/context/OrderContext"
import SavingMessage from "../EditForm/SavingMessage"
import EditInfoMessage from "../EditForm/EditInfoMessage"
import { useSuccessMessage } from "@/hooks/useSuccessMessage"
import { useParams } from "react-router-dom"
import { useState } from "react"

export const EditProductForm = () => {
	const [valueOnFocus, setValueOnFocus] = useState<string>()
	const { productSelected, setProductSelected, handleEdit, categories, titleEditRef } = useOrderContext()
	const { isSubmitted: isSaved, displaySuccessMessage } = useSuccessMessage()
	const { username } = useParams()
	const inputConfig = getProductInputConfig(productSelected, categories)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = event.target

		const productBeingUpdated = {
			...productSelected,
			[name]: value,
		}

		setProductSelected(productBeingUpdated) // cette ligne update le formulaire
		username && handleEdit(productBeingUpdated, username) // cette ligne update le menu
	}

	const handleOnFocus = (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
		const valueOnFocus = event.target.value
		setValueOnFocus(valueOnFocus)
	}

	const handleOnBlur = (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
		const valueOnBlur = event.target.value
		if (valueOnFocus !== valueOnBlur) {
			displaySuccessMessage()
		}
	}
	return (
		<GenericForm<Product>
			entity={productSelected}
			inputConfig={inputConfig}
			PreviewComponent={ImagePreview}
			onChange={handleChange}
			onFocus={handleOnFocus}
			onBlur={handleOnBlur}
			ref={titleEditRef}>
			{isSaved ? <SavingMessage /> : <EditInfoMessage />}
		</GenericForm>
	)
}
