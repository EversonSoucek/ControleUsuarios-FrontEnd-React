export const ibgeService = {
    async buscarEstados() {
      try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        if (!response.ok) throw new Error('Erro ao buscar estados');
        const data = await response.json();
        return data.sort((a, b) => a.nome.localeCompare(b.nome));
      } catch (error) {
        console.error('Erro no serviço IBGE ao buscar estados:', error);
        throw error;
      }
    },
  
    async buscarCidadesPorEstado(uf) {
      try {
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
        if (!response.ok) throw new Error('Erro ao buscar cidades');
        return await response.json();
      } catch (error) {
        console.error('Erro no serviço IBGE ao buscar cidades:', error);
        throw error;
      }
    }
  };
  