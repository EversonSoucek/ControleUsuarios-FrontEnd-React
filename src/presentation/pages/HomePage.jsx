import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import BarraPesquisa from '../components/BarraPesquisa/BarraPesquisa';
import ListaUsuarios from '../components/ListaUsuarios/ListaUsuarios';
import { Link } from 'react-router-dom';
import { buscarUsuariosAtivos } from '../../application/services/UsuarioService';
import { filtrarUsuarios } from '../../application/utils/filtrarUsuarios';

export default function HomePage() {
    const [usuarios, setUsuarios] = useState([]);
    const [filtro, setFiltro] = useState('');

    const fetchUsuarios = async () => {
        try {
            const data = await buscarUsuariosAtivos();
            setUsuarios(data);
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const usuariosFiltrados = filtrarUsuarios(usuarios, filtro);

    return (
        <div className='HomePage'>
            <Header />
            <BarraPesquisa setFiltro={setFiltro} />
            <Link to={"cadastraUsuario"}>Adicionar</Link>
            <ListaUsuarios usuarios={usuariosFiltrados} atualizarUsuarios={fetchUsuarios} />
        </div>
    );
}
