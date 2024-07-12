import React, { useEffect, useState } from "react";
import Stamp from "./Stamp";

export default function Left({
  searchKey,
  setId,
  setShowRightNav,
  setNumber,
  setClickedOne,
  setHoveredOne,
  setListId,
}) {
  const [movies, setMovies] = useState([]);
  const [isL, setIsL] = useState(false);

  const KEY = "2ca7e81a";
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setIsL(true);
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${searchKey}&Runtime`,
          { signal }
        );
        const data = await response.json();

        if (data.Response === "True" && data.Search) {
          setMovies(data.Search);
          setNumber(data.Search.length);
        } else {
          setMovies([]);
          setNumber(0);
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error('Fetch error:', error);
        }
      } finally {
        setIsL(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
      console.log('Cleanup: Fetch aborted');
    };
  }, [searchKey]);

  return !isL ? (
    <Stamp
      Children={movies.map((el) => (
        <div
          onClick={() => {
            setId(el.imdbID);
            setShowRightNav(false);
            setClickedOne(-1);
            setHoveredOne(-1);
            setListId((ids) => new Set([...ids, el.imdbID]));
          }}
          className="flex mb-5 cursor-pointer rounded-lg bg-white/10 p-2 gap-10 items-center"
          key={el.imdbID}
        >
          <div className="w-14">
            <img className="rounded-lg" src={el.Poster} alt="#" />
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">{el.Title}</p>
            <p className="text-slate-300">{el.Year}</p>
          </div>
        </div>
      ))}
    />
  ) : (
    <Stamp
      Children={<p className="text-center tracking-wider text-3xl">LOADING...</p>}
    />
  );
}
