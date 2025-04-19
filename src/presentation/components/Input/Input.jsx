import React from 'react'

export default function Input({ children, nome, onChange, valor }) {
    const handleChange = (e) => {
        console.log(e.target.value);
        
        onChange(e)
    }
    return (
        <input placeholder={children} type={"text"} name={nome} onChange={handleChange} value={valor} required={true}>
        </input>
    )
}
