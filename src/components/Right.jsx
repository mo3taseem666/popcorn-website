import React, { useEffect, useState } from "react";
import RightNav from "./RightNav";
import Stamp from "./Stamp";
import Stars from "./Stars";

export default function Right({
  id,
  setId,
  showRightNav,
  clickedOne,
  setClickedOne,
  hoveredOne,
  setHoveredOne,
  setShowRightNav,
  listId,
  setListId,
}) {
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [Nmovies, setNMovies] = useState(0);
  const [rank, setRank] = useState(0);
  const [runtime, setRuntime] = useState(0);
  const [alreadyAdded, setAlreadyAdded] = useState([]);
  const [forBelowNav, setForBelowNav] = useState(() => {
    const x = localStorage.getItem("watched");
    return JSON.parse(x) || [];
  });
  const [rated, setRated] = useState(false);
  const [Rstars, setRateDetails] = useState(() => {
    const y = localStorage.getItem("rates");
    return JSON.parse(y) || {};
  });
  const [d, setD] = useState([]);

  console.log(Rstars);

  function deleteBtn(x) {
    let y = Rstars;
    delete y[x];
    setRateDetails(y);
  }

  useEffect(() => {
    localStorage.setItem("rates", JSON.stringify(Rstars));
  }, [Rstars]);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(forBelowNav));
  }, [forBelowNav]);

  const KEY = "2ca7e81a";
  useEffect(() => {
    async function getMovies() {
      setIsLoading(true);
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${id}`);
      const data = await res.json();
      setMovieData(data);
      setIsLoading(false);
    }
    getMovies();
  }, [id]);

  useEffect(() => {
    setNMovies(forBelowNav.length);
  }, [forBelowNav]);

  useEffect(() => {
    const ratings = forBelowNav.map((el) => Number(el.imdbRating));
    if (ratings.length >= 1) {
      setRank(ratings.reduce((a, b) => a + b) / ratings.length);
    } else {
      setRank(0);
    }
  }, [forBelowNav]);

  useEffect(() => {
    const runtimes = forBelowNav.map((el) => Number(el.Runtime.split(" ")[0]));
    if (runtimes.length >= 1) {
      setRuntime(runtimes.reduce((a, b) => a + b));
    } else {
      setRuntime(0);
    }
  }, [forBelowNav]);

  function handleLocaldlt(id) {
    let x = localStorage.getItem("rates");
    console.log(x);
    if (x) {
      x = JSON.parse(x);
      delete x[id];
      const updated = JSON.stringify(x);
      localStorage.setItem("rates", updated);
    } else {
      console.log("oh no");
    }
  }

  return (
    <Stamp
      Children={
        <RightContent
          handleLocaldlt={handleLocaldlt}
          runtime={runtime}
          deleteBtn={deleteBtn}
          rank={rank}
          d={d}
          setD={setD}
          Rstars={Rstars}
          setRateDetails={setRateDetails}
          rated={rated}
          setRated={setRated}
          alreadyAdded={alreadyAdded}
          setAlreadyAdded={setAlreadyAdded}
          Nmovies={Nmovies}
          setNMovies={setNMovies}
          forBelowNav={forBelowNav}
          setForBelowNav={setForBelowNav}
          listId={listId}
          setListId={setListId}
          setShowRightNav={setShowRightNav}
          isLoading={isLoading}
          hoveredOne={hoveredOne}
          setHoveredOne={setHoveredOne}
          clickedOne={clickedOne}
          setClickedOne={setClickedOne}
          movieData={movieData}
          id={id}
          showRightNav={showRightNav}
        />
      }
    />
  );
}

function RightContent({
  handleLocaldlt,
  runtime,
  deleteBtn,
  rank,
  d,
  setD,
  Rstars,
  setRateDetails,
  setStats,
  rated,
  setRated,
  showRightNav,
  id,
  stats,
  movieData,
  clickedOne,
  setClickedOne,
  hoveredOne,
  setHoveredOne,
  isLoading,
  setShowRightNav,
  listId,
  setListId,
  setForBelowNav,
  forBelowNav,
  setNMovies,
  Nmovies,
  alreadyAdded,
  setAlreadyAdded,
}) {
  return (
    <div className="flex flex-col justify-between">
      {showRightNav ? (
        <div>
          <RightNav
            forBelowNav={forBelowNav}
            runtime={runtime}
            rank={rank}
            Rstars={Rstars}
            stats={stats}
            Nmovies={Nmovies}
          />
          <BelowRNav
            handleLocaldlt={handleLocaldlt}
            deleteBtn={deleteBtn}
            setRateDetails={setRateDetails}
            Rstars={Rstars}
            rated={rated}
            setRated={setRated}
            setAlreadyAdded={setAlreadyAdded}
            setForBelowNav={setForBelowNav}
            forBelowNav={forBelowNav}
          />
        </div>
      ) : !isLoading ? (
        <MovieDark
          handleLocaldlt={handleLocaldlt}
          deleteBtn={deleteBtn}
          d={d}
          setD={setD}
          Rstars={Rstars}
          setRateDetails={setRateDetails}
          rated={rated}
          setRated={setRated}
          stats={stats}
          Nmovies={Nmovies}
          setStats={setStats}
          alreadyAdded={alreadyAdded}
          setAlreadyAdded={setAlreadyAdded}
          setNMovies={setNMovies}
          forBelowNav={forBelowNav}
          setForBelowNav={setForBelowNav}
          listId={listId}
          setListId={setListId}
          setShowRightNav={setShowRightNav}
          hoveredOne={hoveredOne}
          setHoveredOne={setHoveredOne}
          clickedOne={clickedOne}
          setClickedOne={setClickedOne}
          movieData={movieData}
        />
      ) : (
        <p className=" text-3xl tracking-wider text-center">LOADING...</p>
      )}
    </div>
  );
}

function BelowRNav({
  handleLocaldlt,
  listId,
  forBelowNav,
  setForBelowNav,
  setAlreadyAdded,
  setRated,
  rated,
  Rstars,
  setRateDetails,
  deleteBtn,
}) {
  return (
    <div className=" rounded-xl mt-5">
      {forBelowNav.length >= 1
        ? forBelowNav.map(function (el, i) {
            return (
              <div
                className="flex items-center justify-between mb-5 bg-slate-700 p-2 rounded-xl"
                key={i}
              >
                <div className="flex gap-5">
                  <img
                    className="h-20 w-14 rounded-lg "
                    src={el.Poster}
                    alt="#"
                  />
                  <div className="flex justify-around flex-col">
                    <p className="text-lg font-medium ">{el.Title}</p>
                    <div className="flex gap-5 items-center">
                      <p>
                        <i className="fa-solid text-indigo-400 fa-ranking-star"></i>{" "}
                        {el.imdbRating}
                      </p>
                      <p>
                        <i className="fa-solid text-yellow-400 fa-star"></i>{" "}
                        {Rstars[el.imdbID]}
                      </p>
                      <p>
                        <i className="fa-solid text-orange-400 fa-hourglass-start"></i>{" "}
                        {el.Runtime}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLocaldlt(el.imdbID);
                    setForBelowNav((old) => {
                      return [...old].filter(function (element) {
                        return element.imdbID !== el.imdbID;
                      });
                    });
                    setAlreadyAdded((ell) =>
                      ell.filter(function (ell) {
                        return ell !== el.imdbID;
                      })
                    );
                    deleteBtn(el.imdbID);
                  }}
                  className="h-fit"
                >
                  <i className="fa-solid text-red-500 text-xl fa-circle-xmark"></i>
                </button>
              </div>
            );
          })
        : ""}
    </div>
  );
}

function MovieDark({
  handleLocaldlt,
  deleteBtn,
  d,
  setD,
  Rstars,
  setRateDetails,
  rated,
  setRated,
  movieData,
  Nmovies,
  stats,
  setStats,
  clickedOne,
  setClickedOne,
  hoveredOne,
  setHoveredOne,
  setShowRightNav,
  listId,
  setListId,
  setForBelowNav,
  forBelowNav,
  setNMovies,
  alreadyAdded,
  setAlreadyAdded,
}) {
  const [x, setX] = useState(0);
  useEffect(() => {
    setX(forBelowNav.length);
  }, [forBelowNav]);

  useEffect(() => {
    document.title = `MOVIE: ${movieData.Title}`;
    return function () {
      document.title = `Popcorn`;
    };
  }, [movieData.Title]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full mb-10 bg-slate-500/20 rounded-xl">
        <img
          className="h-60 w-40 rounded-l-xl"
          src={movieData.Poster}
          alt="No Pics Found"
        />
        <div className="p-3 flex gap-3 w-full justify-center flex-col items-center">
          <p className="text-2xl text-center tracking-wider font-bold">
            {movieData.Title}
          </p>
          <p className="text-sm">
            {movieData.Released} | {movieData.Runtime}
          </p>
          <p className="text-sm">{movieData.Genre}</p>
          <p>
            <i className="fa-solid fa-star text-slate-400"></i>{" "}
            <span className="font-semibold">{movieData.imdbRating}</span> IMDB
            Rating
          </p>
        </div>
      </div>
      <div className="w-[90%] flex flex-col items-center mx-auto">
        <Stars
          Rstars={Rstars}
          movieID={movieData.imdbID}
          movieData={movieData}
          d={d}
          setD={setD}
          setRated={setRated}
          hoveredOne={hoveredOne}
          setHoveredOne={setHoveredOne}
          setRateDetails={setRateDetails}
          clickedOne={clickedOne}
          setClickedOne={setClickedOne}
          number={10}
        />
        <p className="mt-5 mb-5 tracking-wider">
          {" "}
          <span className="text-slate-300">Plot</span> : {movieData.Plot}
        </p>
        <p className="mb-5">
          <span className="text-slate-300">Cast</span> : {movieData.Actors}
        </p>
        <p>
          <span className="text-slate-300">Directed By</span> :{" "}
          {movieData.Director}
        </p>
        {d.includes(movieData.imdbID) ? (
          rated ? (
            alreadyAdded.includes(movieData.imdbID) ? (
              <button
                onClick={() => {
                  setAlreadyAdded((el) =>
                    el.filter(function (el) {
                      return el !== movieData.imdbID;
                    })
                  );
                  setForBelowNav(function (prev) {
                    return [...prev].filter(function (el) {
                      return el.imdbID !== movieData.imdbID;
                    });
                  });
                  deleteBtn(movieData.imdbID);
                  setD((old) =>
                    old.filter((element) => {
                      return element !== movieData.imdbID;
                    })
                  );
                  handleLocaldlt(movieData.imdbID);
                }}
                className="bg-slate-700 mt-5 gap-2 flex items-center justify-center  rounded-full px-5 py-2"
              >
                <span className="text-2xl">-</span>Remove From Your Playlist
              </button>
            ) : (
              <button
                onClick={() => {
                  setForBelowNav((el) => [...el, movieData]);
                  setAlreadyAdded((el) => [...el, movieData.imdbID]);
                  setRateDetails((old) => ({
                    ...old,
                    [movieData.imdbID]: clickedOne + 1,
                  }));
                }}
                className="bg-slate-300 mt-5 gap-2 font-medium flex items-center text-black justify-center  rounded-full px-5 py-2"
              >
                <span className="text-2xl ">+</span>Add To Your List
              </button>
            )
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
      <button
        onClick={() => setShowRightNav(true)}
        className="bg-slate-500/20 absolute size-14 left-5 flex justify-center items-center bottom-5 mt-5 rounded-full px-5 py-2"
      >
        <i className="fa-solid text-xl fa-arrow-left"></i>
      </button>
    </div>
  );
}
