"use client";
import React from "react";
import FazlaTarla from "./tarla/tarla"; // doğru klasördeyse bu yeterli
// Eğer farklı bir klasördeyse import yolunu ayarlamalısın

const Page = () => {
  return (
    <main>
      <h1>Tarla Oyunu</h1>
      <FazlaTarla />
    </main>
  );
};

export default Page;
