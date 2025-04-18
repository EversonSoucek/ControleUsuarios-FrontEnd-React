import React, { useEffect, useState } from 'react';
import api from "../../../infra/http/api";
import "./ListaUsuarios.css";
import { Link } from 'react-router-dom';

export default function ListaUsuarios() {
    const [usuarios, setUsuarios] = useState([]);

    const fetchUsuarios = async () => {
        try {
            const response = await api('usuario?ativo=true', 'GET'); // <-- Parâmetro de filtro
            if (!response.ok) throw new Error('Erro ao buscar usuários!');
            const data = await response.json();
            setUsuarios(data);
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const inativarUsuario = async (idUsuario) => {
        if (!window.confirm("Tem certeza que deseja inativar este usuário?")) return;
        try {
            const response = await api(`usuario/${idUsuario}`, 'PATCH');
            if (!response.ok) throw new Error('Erro ao inativar usuário!');
            fetchUsuarios(); // <-- Atualiza a lista do backend após inativação
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao inativar usuário.');
        }
    };

    return (
        <table className='lista-usuarios'>
            <thead className='lista-usuarios__cabecalho'>
                <tr>
                    <th className='lista_usuarios__cabecalho__texto'>Id</th>
                    <th className='lista_usuarios__cabecalho__texto'>Nome</th>
                    <th className='lista_usuarios__cabecalho__texto'>E-mail</th>
                    <th className='lista_usuarios__cabecalho__texto'>Cidade</th>
                    <th className='lista_usuarios__cabecalho__texto'>Editar</th>
                    <th className='lista_usuarios__cabecalho__texto'>Excluir</th>
                </tr>
            </thead>
            <tbody>
                {usuarios.map(usuario => (
                    <tr className='lista-usuarios__corpo' key={usuario.idUsuario}>
                        <td className='lista-usuarios__corpo__texto'>{usuario.idUsuario}</td>
                        <td className='lista-usuarios__corpo__texto'>{usuario.nome}</td>
                        <td className='lista-usuarios__corpo__texto'>{usuario.email}</td>
                        <td className='lista-usuarios__corpo__texto'>{usuario.cidade}</td>
                        <td className='lista-usuarios__corpo__texto'><Link to={`editaUsuario/${usuario.idUsuario}`} >✍️</Link></td>
                        <td className='lista-usuarios__corpo__texto'>
                            <button
                                className="lista-usuarios__botao-excluir"
                                onClick={() => inativarUsuario(usuario.idUsuario)}
                                title="Inativar usuário"
                            >
                                ❌
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
