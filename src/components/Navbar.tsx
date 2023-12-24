"use client";
import Link from "next/link";
import React from "react";
import Logo from "./Logo";
import Button from "./Button";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const links = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Products",
    path: "/product",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Contact",
    path: "/contact",
  },
];

const Navbar = () => {
  const session = useSession();
  return (
    <header className="shadow-md">
      <nav className="max-w-[1140px] container flex items-center justify-between ">
        <Link href={"/"}>
          <Logo />
        </Link>
        <ul className="flex gap-4">
          {links.map((link, i) => (
            <li key={i}>
              <Link className="px-4 py-2 border" href={link.path}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          {session.status === "authenticated" ? (
            <>
              <button type="button">
                <Link href={"/profile"}>{session.data?.user.name}</Link>
              </button>
              <button type="button" onClick={() => signOut()}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Button className="py-2 px-4 border border-neutral-200 ">
                <Link href={"/register"}>Register</Link>
              </Button>
              <Button className="py-2 px-4 border border-neutral-200 ">
                <Link href={"/login"}>Login</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
