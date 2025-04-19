import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormUsuarios from '../components/formUsuarios/FormUsuarios';
import { atualizarUsuario, buscarUsuarioPorId } from '../../application/services/UsuarioService';
import useTelefoneValido from '../hooks/useTelefoneValido';

export default function EditarUsuarioPage() {
	const { idUsuario } = useParams();
	const navigate = useNavigate();

	const [usuario, setUsuario] = useState({
		nome: '', email: '', telefone: '', estado: '', cidade: ''
	});
	const [loading, setLoading] = useState(true);
	const [telefoneValido, setTelefoneValido] = useState(true);

	useEffect(() => {
		const carregarUsuario = async () => {
			try {
				const data = await buscarUsuarioPorId(idUsuario);

				if (!data) {
					navigate('/notfound', { replace: true });
					return;
				}

				setUsuario({
					nome: data.nome,
					email: data.email,
					telefone: data.telefone,
					estado: data.estado,
					cidade: data.cidade
				});
			} catch (error) {
				console.error(error.message);
				navigate('/notfound', { replace: true });
			} finally {
				setLoading(false);
			}
		};
		carregarUsuario();
	}, [idUsuario, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (usuario.telefone.length !== 15) {
			setTelefoneValido(false);
			alert('O telefone precisa ter 15 caracteres.');
			return;
		}

		try {
			await atualizarUsuario(idUsuario, usuario);
			navigate('/');
		} catch (error) {
			alert(error.message || 'Erro ao atualizar usuário');
		}
	};

	if (loading) return <p>Carregando...</p>;

	return (
		<div>
			<h1>Editar Usuário</h1>
			<form onSubmit={handleSubmit}>
				<FormUsuarios
					onChange={setUsuario}
					usuario={usuario}
					setUsuario={setUsuario}
				/>
				<button type="submit">
					Salvar alterações
				</button>
			</form>
		</div>
	);
}
