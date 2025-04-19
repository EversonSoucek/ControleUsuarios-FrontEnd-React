import React, { useState } from 'react';
import FormUsuarios from '../components/formUsuarios/FormUsuarios';
import api from "../../infra/http/api";
import { useNavigate } from 'react-router-dom';
import useTelefoneValido from '../hooks/useTelefoneValido';

export default function CadastraUsuarioPage() {
	const [usuario, setUsuario] = useState({
		nome: "", email: '', telefone: '', estado: '', cidade: ''
	});

	const telefoneValido = useTelefoneValido(usuario.telefone,false);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			console.log(usuario);

			const response = await api('usuario', 'POST', usuario);

			if (!response.ok) {
				const errorText = await response.text();
				console.error('Falha na requisição:', errorText);
				return;
			}

			const data = await response.json();
		} catch (error) {
			console.error('Erro ao tentar cadastrar o usuário:', error);
		}
		navigate("/");
	};

	return (
		<>
			<h1 className='cadastro-usuarios__titulo'>Cadastro de usuários</h1>
			<form className='cadastro-usuarios__form' onSubmit={handleSubmit}>
				<FormUsuarios usuario={usuario} setUsuario={setUsuario} />
				<button type='submit' disabled={!telefoneValido}>Gravar</button>
			</form>
		</>
	);
}
