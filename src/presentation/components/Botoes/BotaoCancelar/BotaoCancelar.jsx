import React from 'react'
import "./BotaoCancelar.css"
import { useNavigate } from 'react-router-dom'

export default function BotaoCancelar({ children }) {
    const navigate = useNavigate()

    const onClick = () => {
        navigate("/")
    }

    return (
        <button type='button' className='botao-cancelar' onClick={onClick}>{children}</button>
    )
}
