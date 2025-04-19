import api from '../http/api';

export const usuarioService = {
  async buscarPorId(id) {
    try {
      const response = await api(`usuario/${id}`, 'GET');
      if (!response.ok) {
        throw new Error('Usuário não encontrado');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw error;
    }
  },

  async atualizar(id, dados) {
    try {
      const response = await api(`usuario/${id}`, 'PUT', dados);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || 'Erro ao atualizar usuário');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  },

  async buscarAtivos() {
    try {
      const response = await api('usuario?ativo=true', 'GET');
      if (!response.ok) throw new Error('Erro ao buscar usuários!');
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
  },

  async inativar(id) {
    try {
      const response = await api(`usuario/${id}`, 'PATCH');
      if (!response.ok) {
        throw new Error('Erro ao inativar usuário!');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao inativar usuário:', error);
      throw error;
    }
  }
};
