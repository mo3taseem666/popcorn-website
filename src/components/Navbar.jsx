import React, { useEffect, useState } from "react";

export default function Navbar({ setSearchKey, number }) {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    document.querySelector(".pickme").focus();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setSearchKey(value);
  };

  return (
    <div className="bg-slate-800 text-slate-200 rounded-lg mb-3 px-5 py-4 flex justify-between items-center">
      <p className="text-3xl cursor-pointer tracking-wider font-semibold">
        POPCORN
      </p>
      <input
        onChange={handleInputChange}
        className="bg-slate-700 pickme focus:outline-none placeholder:text-slate-300 focus:border-slate-400 border border-transparent px-96 pl-3 text-lg py-2 rounded-lg"
        placeholder="Search movies"
        type="text"
        value={searchValue}
      />
      {searchValue ? (
        <p className="w-[265px] text-right">
          Found <span className="font-bold">{number}</span> Results
        </p>
      ) : (
        <p className="w-[266px] text-right">Start Searching For Your Movies</p>
      )}
    </div>
  );
}
