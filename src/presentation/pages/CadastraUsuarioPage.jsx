import React, { useState } from 'react';
import FormUsuarios from '../components/formUsuarios/FormUsuarios';
import { useNavigate } from 'react-router-dom';
import useTelefoneValido from '../hooks/useTelefoneValido';
import { usuarioService } from '../../infra/apis/UsuarioApi';

export default function CadastraUsuarioPage() {
	const [usuario, setUsuario] = useState({
		nome: "", email: '', telefone: '', estado: '', cidade: ''
	});

	const telefoneValido = useTelefoneValido(usuario.telefone,false);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
	  
		try {
		  await usuarioService.cadastrar(usuario);
		  navigate("/");
		} catch (error) {
		  console.error('Erro ao tentar cadastrar o usuário:', error);
		  alert(error.message || 'Erro ao cadastrar usuário.');
		}
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
