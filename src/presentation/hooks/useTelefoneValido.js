import { useState, useEffect } from "react";

export default function useTelefoneValido(telefone, valorInicial = false) {
    const [telefoneValido, setTelefoneValido] = useState(valorInicial);

    useEffect(() => {
        if (!telefone) {
            setTelefoneValido(false);
            return;
        }

        if (telefone.length === 15) {
            setTelefoneValido(true);
        } else {
            setTelefoneValido(false);
        }
    }, [telefone]);

    return telefoneValido;
}
