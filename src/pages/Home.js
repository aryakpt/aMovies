import React from "react";
import { HeroSlide, MovieList, OutlineButton } from "../components";
import { Link } from "react-router-dom";
import { category, movieType } from "../api/tmdbApi";
const Home = () => {
  return (
    <>
      <HeroSlide />
      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-1">
            <h2>Trending Movies</h2>
            <Link to={`/movie`}>
              <OutlineButton className={`small`}>View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular}></MovieList>
        </div>
        <div className="section mb-3">
          <div className="section__header mb-1">
            <h2>Top Rated Movies</h2>
            <Link to={`/movie`}>
              <OutlineButton className={`small`}>View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated}></MovieList>
        </div>

        <div className="section mb-3">
          <div className="section__header mb-1">
            <h2>Trending TV</h2>
            <Link to={`/tv`}>
              <OutlineButton className={`small`}>View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={movieType.popular}></MovieList>
        </div>

        <div className="section mb-3">
          <div className="section__header mb-1">
            <h2>Top Rated TV</h2>
            <Link to={`/tv`}>
              <OutlineButton className={`small`}>View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={movieType.top_rated}></MovieList>
        </div>
      </div>
    </>
  );
};

export default Home;