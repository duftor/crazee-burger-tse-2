import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { IoChevronForward } from "react-icons/io5"
import { BsPersonCircle } from "react-icons/bs"
import TextInput from "@/components/reusable-ui/TextInput"
import Button from "@/components/reusable-ui/Button"
import { theme } from "@/theme/theme"
import { authenticateUser } from "@/api/user"
import Welcome from "./Welcome"
import * as z from "zod"

const USERNAME_MIN_LENGTH = 2
const USERNAME_MAX_LENGTH = 20
const USERNAME_REGEX = /^[a-zA-ZÀ-ÖØ-öø-ÿ-]+$/

const UsernameError = {
	REQUIRED: "Veuillez entrer un prénom",
	TOO_SHORT: `Le prénom doit contenir au moins ${USERNAME_MIN_LENGTH} caractères`,
	TOO_LONG: `Le prénom ne peut pas dépasser ${USERNAME_MAX_LENGTH} caractères`,
	INVALID_FORMAT: "Le prénom ne doit contenir que des lettres ou -",
} as const

const usernameSchema = z
	.string()
	.nonempty({ message: UsernameError.REQUIRED })
	.min(USERNAME_MIN_LENGTH, { message: UsernameError.TOO_SHORT })
	.max(USERNAME_MAX_LENGTH, { message: UsernameError.TOO_LONG })
	.regex(USERNAME_REGEX, { message: UsernameError.INVALID_FORMAT })

export default function LoginForm() {
	// state
	const [username, setUsername] = useState<string>("")
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const navigate = useNavigate()

	// comportements
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setIsLoading(true)

		const result = usernameSchema.safeParse(username)

		if (!result.success) {
			setError(result.error.issues[0]?.message ?? "Erreur inconnue")
			return
		}

		setError(null)

		const userReceived = await authenticateUser(username)

		setTimeout(() => {
			setUsername("")
			navigate(`order/${userReceived.username}`)
		}, 1500)
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value)
	}

	// affichage
	return (
		<LoginFormStyled action="submit" onSubmit={handleSubmit} noValidate>
			<Welcome />
			<div>
				<TextInput
					value={username}
					onChange={handleChange}
					placeholder={"Votre prénom"}
					Icon={<BsPersonCircle />}
					className="input-login"
					version="normal"
					error={error}
					required
					aria-required
				/>
				<Button isLoading={isLoading} label={"Accéder à mon espace"} Icon={<IoChevronForward />} />
			</div>
		</LoginFormStyled>
	)
}

const LoginFormStyled = styled.form`
	text-align: center;
	max-width: 500px;
	min-width: 400px;
	margin: 0px auto;
	padding: 40px ${theme.spacing.lg};
	border-radius: ${theme.borderRadius.round};
	font-family: "Amatic SC", cursive;

	hr {
		border: 1.5px solid ${theme.colors.loginLine};
		margin-bottom: ${theme.gridUnit * 5}px;
	}

	h1 {
		color: ${theme.colors.white};
		font-size: ${theme.fonts.size.P5};
	}

	h2 {
		margin: 20px 10px 10px;
		color: ${theme.colors.white};
		font-size: ${theme.fonts.size.P4};
	}

	.input-login {
		margin: 18px 0; // must be handled in Parent
	}
`
