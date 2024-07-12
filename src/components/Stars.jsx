import React, { useEffect, useState } from "react";

export default function Stars({
  number,
  clickedOne,
  setClickedOne,
  hoveredOne,
  setHoveredOne,
  setRated,
  setRateDetails,
  d,
  setD,
  movieData,
  movieID,
  Rstars,
}) {
  return (
    <div className="relative w-full flex justify-center gap-2 items-center h-16 rounded-xl bg-slate-500/20">
      <div
        onClick={() => {
          setClickedOne(-1);
          setHoveredOne(-1);
        }}
        className="absolute cursor-pointer size-8 rounded-full -top-3 flex justify-center items-center -right-3 bg-slate-600"
      >
        <i className="fa-solid fa-rotate-left"></i>
      </div>
      {Array.from({ length: Number(number) }, (_, i) => i).map(function (
        el,
        i
      ) {
        return (
          <Star
            Rstars={Rstars}
            movieData={movieData}
            movieID={movieID}
            d={d}
            setD={setD}
            setRateDetails={setRateDetails}
            setRated={setRated}
            hoveredOne={hoveredOne}
            setHoveredOne={setHoveredOne}
            clickedOne={clickedOne}
            setClickedOne={setClickedOne}
            key={i}
            idd={i}
          />
        );
      })}
    </div>
  );
}

function Star({
  setHoveredOne,
  hoveredOne,
  idd,
  clickedOne,
  setClickedOne,
  setRated,
  setRateDetails,
  setD,
  movieData,
  movieID,
  Rstars,
}) {
  const [hovered, setHovered] = useState(false);

  useEffect(
    function () {
      setClickedOne(Rstars[movieData.imdbID] - 1);
      setHoveredOne(Rstars[movieData.imdbID] - 1);
    },
    [Rstars, movieData.imdbID]
  );

  const handleMouseEnter = () => {
    setHovered(true);
    setHoveredOne(idd);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setHoveredOne(clickedOne);
  };

  const handleClick = () => {
    if (Rstars.hasOwnProperty(movieData.imdbID)) {
      setRateDetails((old) => ({ ...old, [movieID]: idd + 1 }));
    }
    // setRateDetails((old) => ({ ...old, [movieID]: idd + 1 }));
    setClickedOne(idd);
    setRated(true);
    setD((old) => [...old, movieData.imdbID]);
  };

  return (
    <i
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`fa-${
        hovered || idd <= hoveredOne ? "solid" : "regular"
      } text-yellow-400 fa-star`}
    ></i>
  );
}
