import { GenericForm } from "@/components/reusable-ui/GenericForm"
import { Category } from "@/types/Category"
import SubmitButton from "../Form/SubmitButton"
import { useSuccessMessage } from "@/hooks/useSuccessMessage"
import { useOrderContext } from "@/context/OrderContext"
import { EMPTY_CATEGORY } from "@/constants/categories"
import { useParams } from "react-router-dom"
import { CategoryPreview } from "../Form/CategoryPreview"
import { getCategoryInputConfig } from "../Form/CategoryInputConfig"
import * as z from "zod"
import { useToast } from "@/hooks/useToast"

const LABEL_MIN_LENGTH = 2
const LABEL_MAX_LENGTH = 20
const LABEL_REGEX = /^[a-zA-ZÀ-ÖØ-öø-ÿ-]+$/

const CategoryError = {
	REQUIRED: "Veuillez entrer une catégorie",
	TOO_SHORT: `La catégorie doit contenir au moins ${LABEL_MIN_LENGTH} caractères`,
	TOO_LONG: `La catégorie ne peut pas dépasser ${LABEL_MAX_LENGTH} caractères`,
	INVALID_FORMAT: "La catégorie ne doit contenir que des lettres ou -",
} as const

const categorySchema = z.object({
	label: z
		.string()
		.nonempty({ message: CategoryError.REQUIRED })
		.min(LABEL_MIN_LENGTH, { message: CategoryError.TOO_SHORT })
		.max(LABEL_MAX_LENGTH, { message: CategoryError.TOO_LONG })
		.regex(LABEL_REGEX, { message: CategoryError.INVALID_FORMAT }),
})

export const AddCategoryForm = () => {
	const { newCategory, setNewCategory, handleAddCategory } = useOrderContext()
	const { isSubmitted, displaySuccessMessage } = useSuccessMessage()
	const { username } = useParams()
	const inputConfig = getCategoryInputConfig(newCategory)
	const { displayToastNotification } = useToast()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setNewCategory({ ...newCategory, [name]: value })
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!username) return

		const result = categorySchema.safeParse(newCategory)

		if (!result.success) {
			displayToastNotification(result.error.issues[0]?.message ?? "Nom de catégorie incorrect", "error")
			return
		}

		const newCategoryToAdd = { ...newCategory, id: crypto.randomUUID() }
		handleAddCategory(newCategoryToAdd, username)
		setNewCategory(EMPTY_CATEGORY)
		displaySuccessMessage()
	}

	return (
		<GenericForm<Category>
			entity={newCategory}
			inputConfig={inputConfig}
			onSubmit={handleSubmit}
			onChange={handleChange}
			PreviewComponent={CategoryPreview}>
			<SubmitButton isSubmitted={isSubmitted} label="Créer une nouvelle catégorie" />
		</GenericForm>
	)
}
