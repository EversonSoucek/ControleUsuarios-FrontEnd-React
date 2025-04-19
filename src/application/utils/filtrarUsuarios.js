export function filtrarUsuarios(usuarios, filtro) {
    if (!Array.isArray(usuarios)) return [];
    return usuarios.filter(usuario =>
        usuario.nome.toLowerCase().includes(filtro.toLowerCase())
    );
}
