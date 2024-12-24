export interface ISumCasualties {
  amount: number;
  tAttak: ISAttack[];
}
export interface ISAttack {
  _id: string;
  sumCasualties: number;
}

export interface IAvgCasualties {
  amount: number;
  tAttak: IAvgAttack[];
}
export interface IAvgAttack {
  _id: string;
  AverageCasualties: number;
}
