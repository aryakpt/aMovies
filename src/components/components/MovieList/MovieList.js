import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./movieList.scss";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { MovieCard } from "../";

import tmdbApi, { category as categories } from "../../../api/tmdbApi";

const MovieList = ({ category, type, id }) => {
  const [items, setItems] = useState([]);
  const getList = async () => {
    let response = [];
    let params = {};
    try {
      if (type !== "similar") {
        if (category === categories.movie) {
          response = await tmdbApi.getMoviesList(type, { params });
        } else {
          response = await tmdbApi.getTvList(type, { params });
        }
      } else {
        response = await tmdbApi.similar(category, id);
      }
      setItems(response.results);
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={`auto`}>
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <MovieCard item={item} category={category}></MovieCard>
            {/* <img src={apiConfig.w500Image(item.poster_path)} alt={item.title} /> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MovieList;
