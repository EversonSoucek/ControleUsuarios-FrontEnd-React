import { usuarioService } from "../../infra/apis/UsuarioService";


export async function buscarUsuarioPorId(id) {
  return await usuarioService.buscarPorId(id);
}

export async function atualizarUsuario(id, dados) {
  return await usuarioService.atualizar(id, dados);
}
