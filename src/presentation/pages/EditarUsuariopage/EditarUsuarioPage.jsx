import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { atualizarUsuario, buscarUsuarioPorId } from '../../../application/services/UsuarioService';
import Form from '../../components/Form/Form.';
import "./EditarUsuarioPage.css"
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
		<div className='editar-usuarios'>
			<Form handleSubmit={handleSubmit} setUsuario={setUsuario} usuario={usuario} titulo={"Editar"}/>
		</div>
	);
}
