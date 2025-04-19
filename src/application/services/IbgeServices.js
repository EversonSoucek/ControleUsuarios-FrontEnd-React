import { ibgeService } from "../../infra/apis/IbgeApi";

export const estadoCidadeService = {
    async obterEstados() {
        return await ibgeService.buscarEstados();
    },

    async obterCidadesPorEstado(uf) {
        if (!uf) return [];
        return await ibgeService.buscarCidadesPorEstado(uf);
    }
};
