export interface IMember{
    member:{
      nome: string,
      reports: number,
      profile: string,
    },
    onClick?: () => void,
    selected?: boolean
  }