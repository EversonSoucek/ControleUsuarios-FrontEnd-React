import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from "../../infra/http/api";
import FormUsuarios from '../components/formUsuarios/FormUsuarios';

export default function EditarUsuarioPage() {
  const { idUsuario } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    estado: '',
    cidade: ''
  });

  const [isValid, setIsValid] = useState(false);  // controla se os dados são válidos
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await api(`usuario/${idUsuario}`, 'GET');
        if (response.ok) {
          const data = await response.json();
          setFormData({
            nome: data.nome,
            email: data.email,
            telefone: data.telefone,
            estado: data.estado,
            cidade: data.cidade
          });
        } else {
          console.error('Usuário não encontrado!');
        }
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuario();
  }, [idUsuario]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      alert('Por favor, escolha uma cidade válida antes de salvar!');
      return;
    }

    try {
      const response = await api(`usuario/${idUsuario}`, 'PUT', formData);
      if (response.ok) {
        navigate('/');
      } else {
        const error = await response.json();
        console.error('Erro ao atualizar:', error);
        alert('Erro ao atualizar usuário');
      }
    } catch (error) {
      console.error('Erro de rede:', error);
      alert('Erro de conexão ao atualizar usuário');
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Editar Usuário</h1>
      <form onSubmit={handleSubmit}>
        <FormUsuarios
          onChange={setFormData}
          onValidityChange={setIsValid}
          initialData={formData}
        />
        <button type="submit" disabled={!isValid}>Salvar alterações</button>
      </form>
    </div>
  );
}
