import React, { useEffect, useState } from "react";

export default function RightNav({
  Nmovies,
  Rstars,
  rank,
  runtime,
  forBelowNav,
}) {
  const [rate, setRate] = useState(0);

console.log(rate);

  useEffect(() => {
    if (
      Object.keys(Rstars).map((el) => {
        return Rstars[el];
      }).length >= 1
    ) {
      setRate(
        Object.keys(Rstars)
          .map((el) => {
            return Rstars[el];
          })
          .reduce((x, y) => {
            return x + y;
          })
      );
    } else if (
      Object.keys(Rstars).map((el) => {
        return Rstars[el];
      }).length === 0
    ) {
      setRate(0);
    }
  }, [forBelowNav,Rstars]);


  return (
    <div className=" w-full bg-slate-700 p-3 rounded-2xl flex flex-col justify-center ">
      <div className="flex justify-center">
        <p className="uppercase text-xl  font-medium tracking-wide ">
          movies you watched
        </p>
      </div>
      <ul className="flex justify-between mt-10">
        <li className="flex gap-2 items-center">
          <i className="fa-solid text-sky-500 fa-hashtag"></i>
          <p className="font-semibold">{Nmovies}</p>
          <p>movies</p>
        </li>

        <li className="flex gap-2 items-center">
          <i className="fa-solid text-indigo-400 fa-ranking-star"></i>
          <p className="font-semibold">
            {rank.toFixed(2).replace(/\.00$/, "")}
          </p>
        </li>

        <li className="flex gap-2 items-center">
          <i className="fa-solid text-yellow-400 fa-star"></i>
          <p className="font-semibold">
            {(rate / (Nmovies || 1)).toFixed(2).replace(/\.00$/, "")}
          </p>
        </li>

        <li className="flex gap-2 items-center">
          <i className="fa-solid text-orange-400 fa-hourglass-start"></i>
          <p className="font-semibold">{runtime}</p>
          <p>min</p>
        </li>
      </ul>
    </div>
  );
}
