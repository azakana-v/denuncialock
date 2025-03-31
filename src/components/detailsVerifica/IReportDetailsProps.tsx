export interface IReportDetailsProps {
  report: {
    _id: string;
    usuarioId: string;
    titulo: string;
    data: string;
    status: string;
    descricao: string;
    evidencias: string[];
    conclusions: string[];
    createdAt?: Date;
    risk: string;
  };
  agenteDetalhes?: {
    _id: string;
    nome: string;
    reports: string[];
    profile?: string;
  };
}
