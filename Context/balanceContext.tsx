"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type BakiyeContextType = {
  bakiye: number;
  setBakiye: (value: number) => void;
};

const BakiyeContext = createContext<BakiyeContextType | undefined>(undefined);

export const BakiyeProvider = ({ children }: { children: ReactNode }) => {
  const [bakiye, setBakiye] = useState(50);
  return (
    <BakiyeContext.Provider value={{ bakiye, setBakiye }}>
      {children}
    </BakiyeContext.Provider>
  );
};

export const useBakiye = () => {
  const context = useContext(BakiyeContext);
  if (!context) throw new Error("useBakiye must be used inside BakiyeProvider");
  return context;
};
