export interface IMember{
    member:{
      _id?: string,
      nome: string,
      reports: number,
      profile: string,
    },
    onClick?: () => void,
    selected?: boolean
  }