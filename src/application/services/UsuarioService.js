import { usuarioService } from "../../infra/apis/UsuarioApi";

export async function buscarUsuarioPorId(id) {
  return await usuarioService.buscarPorId(id);
}

export async function atualizarUsuario(id, dados) {
  return await usuarioService.atualizar(id, dados);
}

export async function buscarUsuariosAtivos() {
  return await usuarioService.buscarAtivos();
}

export async function inativarUsuario(id) {
  return await usuarioService.inativar(id);
}
