import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usuarioService } from '../../../infra/apis/UsuarioApi';
import "./CadastraUsuarioPage.css";
import Form from '../../components/Form/Form.';

export default function CadastraUsuarioPage() {
	const [usuario, setUsuario] = useState({
		nome: "", email: '', telefone: '', estado: '', cidade: ''
	});

	const [telefoneValido, setTelefoneValido] = useState(true);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (usuario.telefone.length !== 15) {
			setTelefoneValido(false);
			alert("O telefone precisa ter exatamente 15 caracteres.");
			return;
		}

		setTelefoneValido(true);

		try {
			await usuarioService.cadastrar(usuario);
			navigate("/");
		} catch (error) {
			console.error('Erro ao tentar cadastrar o usuário:', error);
			alert(error.message || 'Erro ao cadastrar usuário.');
		}
	};

	return (
		<div className='cadastro-usuarios'>
			<Form handleSubmit={handleSubmit} setUsuario={setUsuario} titulo={"Cadastro"} usuario={usuario} />
		</div>
	);
}
