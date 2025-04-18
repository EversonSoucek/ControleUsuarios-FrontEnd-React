import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormUsuarios from '../components/formUsuarios/FormUsuarios';
import { atualizarUsuario, buscarUsuarioPorId } from '../../application/usecases/Usuario';


export default function EditarUsuarioPage() {
  const { idUsuario } = useParams();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nome: '', email: '', telefone: '', estado: '', cidade: ''
  });
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const data = await buscarUsuarioPorId(idUsuario);
        setUsuario({
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          estado: data.estado,
          cidade: data.cidade
        });
      } catch (error) {
        console.error(error.message);
        alert('Erro ao carregar usuário!');
      } finally {
        setLoading(false);
      }
    };
    carregarUsuario();
  }, [idUsuario]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      alert('Por favor, escolha uma cidade válida antes de salvar!');
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
          validaCidade={setIsValid}
          usuario={usuario}
        />
        <button type="submit" disabled={!isValid}>Salvar alterações</button>
      </form>
    </div>
  );
}
