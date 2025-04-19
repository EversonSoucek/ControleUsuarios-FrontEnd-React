import React from 'react'
import logoPreto from "../../../assets/esLogoPreto.png"
import "./logo.css"

export default function Logo({ children }) {
    return (
        <div className='logo'>
            <img src={logoPreto} alt='Logo que tem semelhança da letra E e da letra S' className='logo__imagem' />
            <h1 className='logo__titulo'>{children}</h1>
        </div>
    )
}
