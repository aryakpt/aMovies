import React from "react";
import { Link } from "react-router-dom";
import apiConfig from "../../../api/apiConfig";
import { Button } from "../../atoms";
import "./movieCard.scss";

const MovieCard = ({ item, category }) => {
  const link = `/${category}/${item.id}`;
  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
    <Link to={link}>
      <div className="movie-card">
        <div className="movie-card__poster" style={{ backgroundImage: `url(${bg})` }}>
          <Button>
            <i className="bx bx-play"></i>
          </Button>
        </div>
        <div className="movie-card__title">
          <p>{item.title || item.name}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
