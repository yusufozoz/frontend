"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBakiye } from "@/Context/balanceContext"; 

const harfler = ["", "Tohum", "Fidan", "Bitki", "Çiçek", "Kurumuş çiçek", ""];

const baseImages = {
  1: "/tohum.png",
  2: "/fidan.png",
  3: "/bitki.png",
};

const flowerImages: Record<string, Record<number, string>> = {
  daisy: {
    4: "/daisy.png",
    5: "/kurumusPapatya.png",
  },
  tulip: {
    4: "/tulip.png",
    5: "/driedTulip.png",
  },
};

const Tarla = ({ onTopla }: { onTopla: () => void }) => {
  const [harf, setHarf] = useState(0);
  const [calisiyor, setCalisiyor] = useState(false);
  const [tur, setTur] = useState<string | null>(null);
  const [secimEkrani, setSecimEkrani] = useState(false);

  useEffect(() => {
    if (!calisiyor) return;

    let timeout: NodeJS.Timeout;

    if (harf === 5) {
      timeout = setTimeout(() => {
        setHarf(0);
        setCalisiyor(false);
        setTur(null);
      }, 4000);
    } else if (harf >= 1 && harf < 3) {
      timeout = setTimeout(() => {
        setHarf((prev) => prev + 1);
      }, 2000);
    } else if (harf === 3) {
      timeout = setTimeout(() => {
        setHarf(4);
      }, 2000);
    } else if (harf === 4) {
      timeout = setTimeout(() => {
        setHarf(5);
      }, 4000);
    }

    return () => clearTimeout(timeout);
  }, [calisiyor, harf]);

  const handleClick = () => {
    if (harf >= 1 && harf < 5) {
      if (harf === 4) {
        onTopla();
      }
      setHarf(0);
      setCalisiyor(false);
      setTur(null);
      return;
    }

    if (harf === 0 && !calisiyor) {
      setSecimEkrani(true);
    }
  };

  const handleSecim = (secilen: string) => {
    setTur(secilen);
    setHarf(1);
    setCalisiyor(true);
    setSecimEkrani(false);
  };

  const getImage = () => {
    if (harf >= 1 && harf <= 3) {
      return baseImages[harf as 1 | 2 | 3];
    }
    if ((harf === 4 || harf === 5) && tur) {
      return flowerImages[tur]?.[harf];
    }
    return "";
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: 80,
        height: 80,
        border: "1px solid #ccc",
        margin: 5,
        position: "relative",
        backgroundColor: "#951c1cff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      {secimEkrani && (
        <div
          style={{
            position: "absolute",
            top: -40,
            display: "flex",
            gap: 4,
            zIndex: 10,
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSecim("daisy");
            }}
            style={{
              padding: "2px 6px",
              fontSize: 10,
              backgroundColor: "#FFD700",
              border: "1px solid #ccc",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Daisy
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSecim("tulip");
            }}
            style={{
              padding: "2px 6px",
              fontSize: 10,
              backgroundColor: "#074158ff",
              border: "1px solid #ccc",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Tulip
          </button>
        </div>
      )}

      {getImage() ? (
        <img
          src={getImage()}
          alt={harfler[harf]}
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      ) : (
        ""
      )}
    </div>
  );
};

const FazlaTarla = () => {
  const router = useRouter();
  const { bakiye, setBakiye } = useBakiye(); 

  const handleTopla = () => {
    setBakiye(bakiye + 10);
  };

  const handleStoreClick = () => {
    router.push("/store");
  };

  return (
    <div style={{ textAlign: "center", marginTop: 20, position: "relative" }}>
      <button
        onClick={handleStoreClick}
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          padding: "10px 16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        }}
      >
        Mağaza
      </button>

      <h2>Bakiye: {bakiye} TL</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          width: 360,
          margin: "0 auto",
        }}
      >
        {Array.from({ length: 16 }, (_, i) => (
          <Tarla key={i} onTopla={handleTopla} />
        ))}
      </div>
    </div>
  );
};

export default FazlaTarla;
