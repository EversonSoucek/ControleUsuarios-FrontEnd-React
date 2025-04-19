const AomudarInput = (e, usuario, setUsuario) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
};

export default AomudarInput