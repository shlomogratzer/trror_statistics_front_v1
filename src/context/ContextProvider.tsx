import React, { createContext, useState } from "react";
import { IAttack } from "../models/terrorAtack";

export interface Props {
  children: React.ReactNode;
}
export interface ITAttacks {
  tAttacks: IAttack[];
  setTAttacks: React.Dispatch<React.SetStateAction<IAttack[]>>;
}
export const TAttackContext = createContext<ITAttacks | null>(null);
const ContextProvider = ({ children }: Props) => {
  const [tAttacks, setTAttacks] = useState<IAttack[]>([]);
  return (
    <TAttackContext.Provider value={{ tAttacks, setTAttacks }}>
      {children};
    </TAttackContext.Provider>
  );
};

export default ContextProvider;
