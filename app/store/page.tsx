/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useBakiye } from "@/Context/balanceContext"; 

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export default function StorePage() {
  const router = useRouter();
  const { bakiye, setBakiye } = useBakiye(); 

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Tulip",
      price: 5,
      image: "/Tulip.png",
      quantity: 0,
    },
    {
      id: 2,
      name: "Daisy",
      price: 8,
      image: "/Daisy.png",
      quantity: 0,
    },
  ]);

  const increase = (id: number) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    const totalIncrease = product.price;

    if (bakiye < totalIncrease) {
      alert("Yetersiz bakiye!");
      return;
    }

   
    setBakiye(bakiye - totalIncrease);
    const updated = products.map((p) =>
      p.id === id ? { ...p, quantity: p.quantity + 1 } : p
    );
    setProducts(updated);
  };

  const decrease = (id: number) => {
    const product = products.find((p) => p.id === id);
    if (!product || product.quantity === 0) return;

    
    setBakiye(bakiye + product.price);
    const updated = products.map((p) =>
      p.id === id ? { ...p, quantity: p.quantity - 1 } : p
    );
    setProducts(updated);
  };

  const total = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h1>Sepet Uygulaması</h1>
      <h2>Bakiye: {bakiye} TL</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 30,
          flexWrap: "wrap",
          marginTop: 20,
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid gray",
              padding: 10,
              borderRadius: 10,
              width: 180,
              textAlign: "center",
              backgroundColor: "#8d1919ff",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: 100, objectFit: "contain" }}
            />
            <h3>{product.name}</h3>
            <p>Fiyat: {product.price} TL</p>
            <div>
              <button onClick={() => decrease(product.id)}>-</button>
              <span style={{ margin: "0 10px" }}>{product.quantity}</span>
              <button onClick={() => increase(product.id)}>+</button>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: 30 }}>Toplam Harcama: {total} TL</h2>

      <button
        onClick={() => router.push("/tarla")}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          borderRadius: 8,
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Oyuna Geri Dön
      </button>
    </div>
  );
}
