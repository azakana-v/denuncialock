export interface IReportDetailsProps {
  report: {
      _id: string;
      usuarioId: string; 
      titulo: string;
      data: string;
      status: string;
      descricao: string;
      evidencias: string[];
  };
  agenteDetalhes?: {
      _id: string;
      nome: string;
      reports: string[];
      profile?: string;
  };
}