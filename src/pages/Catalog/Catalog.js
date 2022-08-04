import React from "react";
import { useParams } from "react-router-dom";
import { category as cate } from "../../api/tmdbApi";
import "./catalog.scss";
import bg from "../../assets/bg.jpg";
import { MovieGrid } from "../../components";

const Catalog = () => {
  const { category } = useParams();

  return (
    <>
      <div className="page-header" style={{ backgroundImage: `url(${bg})` }}>
        <h2>{category === cate.movie ? "Movies" : "TV Series"}</h2>
      </div>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid category={category}></MovieGrid>
        </div>
      </div>
    </>
  );
};

export default Catalog;
