import React from 'react'
import "./Form.css"
import Logo from '../Logo/Logo'
import FormUsuarios from '../formUsuarios/FormUsuarios'
import BotaoCancelar from '../Botoes/BotaoCancelar/BotaoCancelar'
import BotaoGravar from '../Botoes/BotaoGravar/BotaoGravar'


export default function Form({handleSubmit,titulo,usuario,setUsuario}) {
    return (
        <form className='form' onSubmit={handleSubmit}>
            <Logo>{titulo}</Logo>
            <FormUsuarios
             usuario={usuario} setUsuario={setUsuario} />
            <div className='form__botoes'>
                <BotaoGravar>Gravar</BotaoGravar>
                <BotaoCancelar>Cancelar</BotaoCancelar>
            </div>
        </form>
    )
}
