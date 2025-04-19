import React, { useState } from 'react';
import FormUsuarios from '../../components/formUsuarios/FormUsuarios';
import { useNavigate } from 'react-router-dom';
import useTelefoneValido from '../../hooks/useTelefoneValido';
import { usuarioService } from '../../../infra/apis/UsuarioApi';
import "./CadastraUsuarioPage.css";
import Logo from '../../components/Logo/Logo';
import BotaoGravar from '../../components/Botoes/BotaoGravar/BotaoGravar';
import BotaoCancelar from '../../components/Botoes/BotaoCancelar/BotaoCancelar';

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
			<form className='cadastro-usuarios__form' onSubmit={handleSubmit}>
				<Logo>Cadastro</Logo>
				<FormUsuarios usuario={usuario} setUsuario={setUsuario} />
				<div className='cadastro-usuarios__form__botoes'>
					<BotaoGravar>Gravar</BotaoGravar>
					<BotaoCancelar>Cancelar</BotaoCancelar>
				</div>
			</form>
		</div>
	);
}
