import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Contato() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')

	return (
		<div>
			<h2>Contato</h2>
			<form>
				<div>
					<label>
						Nome:<br />
						<input value={name} onChange={(e) => setName(e.target.value)} />
					</label>
				</div>
				<div>
					<label>
						Email:<br />
						<input value={email} onChange={(e) => setEmail(e.target.value)} />
					</label>
				</div>
				<div>
					<label>
						Mensagem:<br />
						<textarea value={message} onChange={(e) => setMessage(e.target.value)} />
					</label>
				</div>
				<div>
					<button type="submit">Enviar</button>
				</div>
			</form>
			<p>
				Voltar para <Link to="/">Home</Link>
			</p>
		</div>
	)
}
