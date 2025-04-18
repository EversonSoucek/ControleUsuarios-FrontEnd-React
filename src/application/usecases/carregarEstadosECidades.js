import { ibgeService } from "../../infra/apis/IbgeService";

export async function carregarEstados() {
  return await ibgeService.buscarEstados();
}

export async function carregarCidades(estadoUF) {
  if (!estadoUF) return [];
  return await ibgeService.buscarCidadesPorEstado(estadoUF);
}
