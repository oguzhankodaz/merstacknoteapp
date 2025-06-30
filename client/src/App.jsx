/** @format */

import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteEditPage from "./pages/NoteEditPage";
import NoteDetailPage from "./pages/NoteDetailPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>} />
        <Route path="/create" element={<CreatePage></CreatePage>} />
        <Route path="/note/:id" element={<NoteEditPage />} />
        <Route path="/note/:id/detail" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
