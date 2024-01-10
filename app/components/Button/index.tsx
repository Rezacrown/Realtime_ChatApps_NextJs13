"use client";
// Gunakan React client-side rendering

import { signIn, signOut } from "next-auth/react";

export function Logout() {
  // Fungsi logout dengan signOut dari next-auth/react
  return (
    <button onClick={() => signOut()} className="btn-logout">
      Logout
    </button>
  );
}

export function NavLogin() {
  // Fungsi login ke Github dengan signIn
  return (
    <button onClick={() => signIn("github")} className="btn-signin">
      Login
    </button>
  );
}

export function MainLogin() {
  // Fungsi login ke Github dengan signIn
  return (
    <button onClick={() => signIn("github")} className="btn-main">
      Login with Github
    </button>
  );
}
