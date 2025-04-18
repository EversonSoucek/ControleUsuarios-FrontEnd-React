import React from 'react'
import esLogoBranco from "../../../assets/esLogoBranco.png"
import "./Header.css"

export default function Header() {
    return (
        <header className='header'>
            <img className='header__logo' src={esLogoBranco}/>
        </header>
    )
}
