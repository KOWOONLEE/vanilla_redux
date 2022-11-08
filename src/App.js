import React from "react";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import Main from "./Main";
import Todo from "./Todo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
