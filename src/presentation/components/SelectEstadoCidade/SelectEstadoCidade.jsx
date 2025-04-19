import { useEffect, useState } from 'react';
import { estadoCidadeService } from '../../../application/services/IbgeServices';

export default function SelectEstadoCidade({ usuario, setUsuario }) {
    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [estadoSelecionado, setEstadoSelecionado] = useState(usuario.estado || '');

    // Buscar estados ao carregar
    useEffect(() => {
        estadoCidadeService.obterEstados()
            .then(setEstados)
            .catch(error => console.error('Erro ao buscar estados:', error));
    }, []);

    // Buscar cidades se o usuário já tiver estado ao montar (ex: edição)
    useEffect(() => {
        if (estadoSelecionado) {
            estadoCidadeService.obterCidadesPorEstado(estadoSelecionado)
                .then(setCidades)
                .catch(error => console.error('Erro ao buscar cidades:', error));
        } else {
            setCidades([]);
        }
    }, [estadoSelecionado]);

    return (
        <>
            <select
                required
                value={estadoSelecionado}
                onChange={e => {
                    const uf = e.target.value;
                    setEstadoSelecionado(uf);
                    setUsuario(prev => ({
                        ...prev,
                        estado: uf,
                        cidade: '' // Limpa cidade quando troca o estado
                    }));
                }}
            >
                <option value="">Selecione o estado</option>
                {estados.map(estado => (
                    <option key={estado.id} value={estado.sigla}>
                        {estado.nome}
                    </option>
                ))}
            </select>

            <select
                required
                value={usuario.cidade || ''}
                onChange={e => {
                    setUsuario(prev => ({
                        ...prev,
                        cidade: e.target.value
                    }));
                }}
                disabled={!estadoSelecionado}
            >
                <option value="">Selecione a cidade</option>
                {cidades.map(cidade => (
                    <option key={cidade.id} value={cidade.nome}>
                        {cidade.nome}
                    </option>
                ))}
            </select>
        </>
    );
}
