export default function BarraPesquisa({ setFiltro }) {
    const handleChange = (e) => {
        setFiltro(e.target.value);
    };

    return (
        <input
            type='search'
            placeholder='Pesquise usuários pelo nome'
            className='barra-pesquisa'
            onChange={handleChange}
        />
    );
}
