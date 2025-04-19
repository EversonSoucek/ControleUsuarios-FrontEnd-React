import React from 'react';
import { Link } from 'react-router-dom';
import "./ListaUsuarios.css";
import { inativarUsuario } from "../../../application/services/UsuarioService";

export default function ListaUsuarios({ usuarios, atualizarUsuarios }) {

    const handleInativarUsuario = async (idUsuario) => {
        if (!window.confirm("Tem certeza que deseja inativar este usuário?")) return;
        try {
            await inativarUsuario(idUsuario);
            atualizarUsuarios();
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
                    <th className='lista_usuarios__cabecalho__texto'>Telefone</th>
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
                        <td className='lista-usuarios__corpo__texto'>{usuario.telefone}</td>
                        <td className='lista-usuarios__corpo__texto'>{usuario.cidade}</td>
                        <td className='lista-usuarios__corpo__texto'>
                            <Link to={`editaUsuario/${usuario.idUsuario}`}>✍️</Link>
                        </td>
                        <td className='lista-usuarios__corpo__texto'>
                            <button
                                className="lista-usuarios__botao-excluir"
                                onClick={() => handleInativarUsuario(usuario.idUsuario)}
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
