"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleTarla() {
    const userString = localStorage.getItem("users");
    const userObject = userString ? JSON.parse(userString) : {};

   
    if (userObject[name] && userObject[name] === password) {
      setMessage("Giriş başarılı! Yönlendiriliyorsunuz...");
      setTimeout(() => {
        router.push("/tarla");
      }, 1000);
    } else {
      setMessage("Kullanıcı adı veya şifre hatalı");
    }
  }

  return (
    <>
      <div>
        <h1>Giriş yap</h1>
      </div>
      <div>
        <label>İsim: </label>
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
        <button onClick={handleTarla}>Giriş yap</button>
        {message && <p>{message}</p>}
      </div>
    </>
  );
}
