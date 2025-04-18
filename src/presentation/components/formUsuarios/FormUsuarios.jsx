import React, { useEffect, useState } from 'react';

export default function FormUsuarios() {
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [cidadeDigitada, setCidadeDigitada] = useState('');
  const [inputFocado, setInputFocado] = useState(false);

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        const data = await response.json();
        const estadosOrdenados = data.sort((a, b) => a.nome.localeCompare(b.nome));
        setEstados(estadosOrdenados);
      } catch (error) {
        console.error('Erro ao buscar estados:', error);
      }
    };
    fetchEstados();
  }, []);

  useEffect(() => {
    if (estadoSelecionado) {
      const fetchCidades = async () => {
        try {
          const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`);
          const data = await response.json();
          setCidades(data);
        } catch (error) {
          console.error('Erro ao buscar cidades:', error);
        }
      };
      fetchCidades();
    } else {
      setCidades([]);
    }
  }, [estadoSelecionado]);

  const cidadesFiltradas = cidades.filter(cidade =>
    cidade.nome.toLowerCase().includes(cidadeDigitada.toLowerCase())
  );

  return (
    <form>
      <input placeholder="Nome completo" />
      <input placeholder="E-mail" />
      <input placeholder="Senha" type="password" />

      <select 
        value={estadoSelecionado} 
        onChange={e => {
          setEstadoSelecionado(e.target.value);
          setCidadeDigitada('');
        }}
      >
        <option value="">Selecione o estado</option>
        {estados.map(estado => (
          <option key={estado.id} value={estado.sigla}>
            {estado.nome}
          </option>
        ))}
      </select>

      <div>
        <input
          placeholder="Digite a cidade"
          value={cidadeDigitada}
          onChange={e => setCidadeDigitada(e.target.value)}
          onFocus={() => setInputFocado(true)}
          onBlur={() => setTimeout(() => setInputFocado(false), 200)}
          disabled={!estadoSelecionado}
        />
        {estadoSelecionado && cidadeDigitada && inputFocado && cidadesFiltradas.length > 0 && (
          <ul style={{
            maxHeight: '150px',
            overflowY: 'auto',
            border: '1px solid #ccc',
            padding: '5px',
            margin: 0,
            listStyle: 'none'
          }}>
            {cidadesFiltradas.map(cidade => (
              <li 
                key={cidade.id}
                style={{ cursor: 'pointer', padding: '2px 0' }}
                onMouseDown={() => setCidadeDigitada(cidade.nome)}
              >
                {cidade.nome}
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}
