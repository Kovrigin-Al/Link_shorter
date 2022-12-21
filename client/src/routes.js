import React from "react";
import {LinksPage} from "./pages/LinksPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { DetailPage } from "./pages/DetailPage";
import { CreatePage } from "./pages/CreatePage";
import { AuthPage } from "./pages/AuthPage";

export const routesSwitcher = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/links" element={<LinksPage />}></Route>
        <Route path="/create" element={<CreatePage />}></Route>
        <Route path="/detail/:id" element={<DetailPage />}></Route>
        <Route path="/*" element={<Navigate replace to="/create" />}></Route>
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/*" element={<AuthPage />}></Route>
   </Routes>
  );
};
