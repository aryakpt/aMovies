import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./detail.scss";

import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import { MovieList } from "../../components";

const Detail = () => {
  const { id, category } = useParams();
  // eslint-disable-next-line
  const [item, setItem] = useState([]);
  // eslint-disable-next-line
  const [credit, setCredit] = useState([]);
  // eslint-disable-next-line
  const [videos, setVideos] = useState([]);

  const getDetail = async () => {
    try {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
    } catch (e) {
      console.error(e.message);
    }
  };

  const getCredits = async () => {
    try {
      const response = await tmdbApi.credits(category, id, { params: {} });
      setCredit(response);
    } catch (e) {
      console.error(e.message);
    }
  };

  const getVideos = async () => {
    try {
      const response = await tmdbApi.getVideos(category, id);
      setVideos(response.results.slice(0, 5));
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    getDetail();
    getCredits();
    getVideos();
    // eslint-disable-next-line
  }, [id, category]);

  return (
    <>
      <div className="detail-banner" style={{ backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})` }}></div>
      <div className="detail-content container mb-3">
        <div className="detail-content__poster">
          <img src={apiConfig.w500Image(item.poster_path || item.backdrop_path)} alt={item.title} />
        </div>
        <div className="detail-content__info">
          <h1 className="title">{item.title}</h1>
          <div className="genres">
            {item.genres &&
              item.genres.map((genre, i) => {
                return (
                  <span className="genres__item" key={i}>
                    {genre.name}
                  </span>
                );
              })}
          </div>
          <p className="overview">{item.overview}</p>
          <CastsList credit={credit} />
        </div>
      </div>
      <div className="container mb-3">
        <VideosList videos={videos} />
      </div>
      <div className="container mb-3">
        <div className="similar-videos">
          <h2 className="mb-1">Similar</h2>
          <MovieList category={category} type="similar" id={id} />
        </div>
      </div>
    </>
  );
};

const CastsList = ({ credit }) => {
  return (
    <div className="casts">
      <h2 className="casts__header">Casts</h2>
      <div className="casts__content">
        {credit.cast &&
          credit.cast.slice(0, 5).map((cast, i) => (
            <div className="casts__content__item" key={i}>
              <img src={apiConfig.w500Image(cast.profile_path)} alt={cast.name} />
              <figcaption>{cast.name}</figcaption>
            </div>
          ))}
      </div>
    </div>
  );
};

const VideosList = ({ videos }) => {
  return (
    <div className="detail-videos">
      {videos.map((video, i) => (
        <div className="detail-videos__item mb-2" key={i}>
          <h3 className="detail-videos__item__title mb-1">{video.name}</h3>
          <div className="detail-videos__item__content">
            <iframe src={`https://www.youtube.com/embed/${video.key}`} width="100%" title="video"></iframe>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Detail;
