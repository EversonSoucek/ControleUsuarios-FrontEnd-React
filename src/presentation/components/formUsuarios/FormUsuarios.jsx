import React, { useEffect, useState } from 'react';

export default function FormUsuarios({ onChange, validaCidade, usuario = {} }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [cidadeDigitada, setCidadeDigitada] = useState('');
  const [inputFocado, setInputFocado] = useState(false);

  // Preenche campos iniciais vindos do servidor
  useEffect(() => {
    if (usuario) {
      setNome(usuario.nome || '');
      setEmail(usuario.email || '');
      setTelefone(usuario.telefone || '');
      setEstadoSelecionado(usuario.estado || '');
      setCidadeDigitada(usuario.cidade || '');

      if (onChange) {
        onChange({
          nome: usuario.nome || '',
          email: usuario.email || '',
          telefone: usuario.telefone || '',
          estado: usuario.estado || '',
          cidade: usuario.cidade || '',
        });
      }
    }
  }, [onChange]);

  // Busca estados no IBGE
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

  // Busca cidades sempre que o estado mudar
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

  // Sempre que campos mudam, envia pro componente pai
  useEffect(() => {
    if (onChange) {
      onChange({
        nome,
        email,
        telefone,
        estado: estadoSelecionado,
        cidade: cidadeDigitada,
      });
    }
  }, [nome, email, telefone, estadoSelecionado, cidadeDigitada, onChange]);

  // Validação: cidade existe na lista de cidades do estado?
  useEffect(() => {
    const cidadeEhValida = cidades.some(cidade => cidade.nome === cidadeDigitada);
    if (validaCidade) {
      validaCidade(cidadeEhValida);
    }
  }, [cidadeDigitada, cidades, validaCidade]);

  const cidadesFiltradas = cidades.filter(cidade =>
    cidade.nome.toLowerCase().includes(cidadeDigitada.toLowerCase())
  );

  return (
    <>
      <input
        required
        placeholder="Nome completo"
        value={nome}
        onChange={e => setNome(e.target.value)}
      />
      <input
        required
        placeholder="E-mail"
        type='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        required
        placeholder="Telefone"
        value={telefone}
        onChange={e => setTelefone(e.target.value)}
      />

      <select
        required
        value={estadoSelecionado}
        onChange={e => {
          setEstadoSelecionado(e.target.value);
          setCidadeDigitada('');  // Limpa cidade ao trocar estado
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
          required
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

      {cidadeDigitada && !cidades.some(cidade => cidade.nome === cidadeDigitada) && (
        <p style={{ color: 'red' }}>Por favor, selecione uma cidade válida da lista.</p>
      )}
    </>
  );
}
