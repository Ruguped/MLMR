import { Header } from "./Header";
import { Footer } from "../Footer";
import React from "react";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}