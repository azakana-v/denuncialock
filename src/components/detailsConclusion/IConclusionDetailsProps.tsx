export interface IConclusionDetailsProps {
  conclusion: {
      _id: string;
      usuarioId: string; 
      titulo: string;
      data: string;
      status: string;
      descricao: string;
      evidencias: string[];
      reportId?:string;
      createdAt?: string;

  };
  agenteDetalhes?: {
      _id: string;
      nome: string;
      reports: string[];
      profile?: string;
  };
}