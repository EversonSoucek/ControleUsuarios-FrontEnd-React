export const formatarTelefone = (value) => {
    let telefone = value.replace(/\D/g, '');

    if (telefone.length <= 2) {
        telefone = `(${telefone}`;
    } else if (telefone.length <= 6) {
        telefone = `(${telefone.slice(0, 2)}) ${telefone.slice(2)}`;
    } else {
        telefone = `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7, 11)}`;
    }

    return telefone;
};
