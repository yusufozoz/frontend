"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSave() {
    if (name === "" || password === "") {
      setMessage("Lütfen isim ve şifre giriniz!");
      return;
    }
    const userString = localStorage.getItem("users");
    const userObject = userString ? JSON.parse(userString) : {};


    userObject[name] = password;
    localStorage.setItem("users", JSON.stringify(userObject));

    setMessage("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...");

    
    setTimeout(() => {
      router.push("/signin"); 
    }, 1000);

    
  }

  return (
    <>
      <div>
        <h1>Kayıt ol:</h1>
      </div>
      <div>
        <label>İsim:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label>Şifre: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={handleSave}>Kayıt ol</button>
        {message && <p>{message}</p>}
      </div>
    </>
  );
}
