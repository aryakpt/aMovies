import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./heroSlide.scss";

import tmdbApi, { category, movieType } from "../../../api/tmdbApi";
import apiConfig from "../../../api/apiConfig";

import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { useHistory } from "react-router-dom";
import { Button, OutlineButton, Modal, ModalContent } from "../../index";

const HeroSlide = () => {
  const [movieItems, setMovieItems] = useState([]);
  const [videoSrc, setVideoSrc] = useState("");
  const [isModalActive, setIsModalActive] = useState(false);

  const onModalActiveHandler = async (id) => {
    const videos = await tmdbApi.getVideos(category.movie, id);
    if (videos.results.length > 0) {
      setVideoSrc(`https://www.youtube.com/embed/${videos.results[0].key}`);
    }
    setIsModalActive(true);
  };

  const onModalCloseHandler = () => {
    setIsModalActive(false);
  };

  const getMovies = async () => {
    const params = { page: 1 };
    try {
      const response = await tmdbApi.getMoviesList(movieType.popular, { params });
      setMovieItems(response.results.slice(0, 3));
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  // console.log(movieItems);

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
      >
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>{({ isActive }) => <HeroSlideItem item={item} isActive={isActive} onModalActiveHandler={() => onModalActiveHandler(item.id)}></HeroSlideItem>}</SwiperSlide>
        ))}
      </Swiper>
      {movieItems.map((item, i) => (
        <TrailerModel key={i} item={item} videoSrc={videoSrc} isActive={isModalActive} onModalCloseHandler={onModalCloseHandler} />
      ))}
    </div>
  );
};

const HeroSlideItem = ({ item, isActive, onModalActiveHandler }) => {
  let history = useHistory();
  const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

  return (
    <>
      <div className={`hero-slide__item ${isActive ? "active" : ""}`} style={{ backgroundImage: `url(${background})` }}>
        <div className="hero-slide__item__content container">
          <div className="hero-slide__item__content__poster">
            <img src={apiConfig.w500Image(item.poster_path)} alt={item.title} />
          </div>
          <div className="hero-slide__item__content__info">
            <h2 className="title">{item.title}</h2>
            <div className="overview">{item.overview}</div>
            <div className="btns">
              <Button onClick={() => history.push(`/movie/${item.id}`)}>Watch Now</Button>
              <OutlineButton onClick={onModalActiveHandler}>Watch Trailer</OutlineButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

HeroSlideItem.propTypes = {
  item: PropTypes.object,
  isActive: PropTypes.bool,
  onModalActiveHandler: PropTypes.func,
};

const TrailerModel = ({ item, videoSrc, isActive, onModalCloseHandler }) => {
  return (
    <Modal isActive={isActive} id={`modal_${item.id}`}>
      <ModalContent onClose={onModalCloseHandler}>
        <iframe src={videoSrc} width="100%" height="500px" title="trailer"></iframe>
      </ModalContent>
    </Modal>
  );
};

TrailerModel.propTypes = {
  item: PropTypes.object,
  videoSrc: PropTypes.string,
  isActive: PropTypes.bool,
  onModalCloseHandler: PropTypes.func,
};

export default HeroSlide;
