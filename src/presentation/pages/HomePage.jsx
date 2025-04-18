import React from 'react'
import Header from '../components/Header/Header'
import BarraPesquisa from '../components/BarraPesquisa/BarraPesquisa'
import ListaUsuarios from '../components/ListaUsuarios/ListaUsuarios'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className='HomePage'>
        <Header/>
        <BarraPesquisa/>
        <Link to={"cadastraUsuario"}>Adicionar</Link>
        <ListaUsuarios/>
    </div>
  )
}
