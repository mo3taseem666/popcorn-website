import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export default function App() {
  const [number, setNumber] = useState(0);
  const [searchKey, setSearchKey] = useState("");
  const [id, setId] = useState("");
  const [showRightNav, setShowRightNav] = useState(true);
  return (
    <div className="p-3 font-font1 justify-center flex flex-col h-screen bg-gradient-to-t from-slate-950 via-slate-800 to-slate-700 ">
      <Navbar
        number={number}
        searchKey={searchKey}
        setSearchKey={setSearchKey}
      />
      <Hero
        number={number}
        setNumber={setNumber}
        showRightNav={showRightNav}
        setShowRightNav={setShowRightNav}
        id={id}
        setId={setId}
        searchKey={searchKey}
      />
    </div>
  );
}
