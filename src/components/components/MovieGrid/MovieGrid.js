import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";

import { MovieCard, Input, Button, OutlineButton } from "../../";
import tmdbApi, { category as cate, movieType, tvType } from "../../../api/tmdbApi";

import "./movieGrid.scss";

const MovieGrid = ({ category }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const { keyword } = useParams();

  const getItems = async (category) => {
    let response = [];
    if (keyword === undefined) {
      const params = {};
      switch (category) {
        case cate.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = {
        query: keyword,
      };
      response = await tmdbApi.search(category, { params });
    }
    setItems(response.results);
    setTotalPage(response.total_pages);
  };

  useEffect(() => {
    getItems(category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, keyword]);

  const loadMore = async () => {
    let response = [];
    if (keyword === undefined) {
      const params = {
        page: page + 1,
      };
      switch (category) {
        case cate.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      response = await tmdbApi.search(category, { params });
    }
    setItems([...items, ...response.results]);
    setPage(page + 1);
  };
  return (
    <>
      <div className="section mb-3">
        <MovieSearch category={category} key={keyword} />
      </div>
      <div className="movie-grid">
        {items.map((item, i) => (
          <MovieCard category={category} item={item} key={i}></MovieCard>
        ))}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className={`small`} onClick={loadMore}>
            Load More
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
};

const MovieSearch = ({ category, key }) => {
  const history = useHistory();
  const [keyword, setKeyword] = useState(key ? key : "");
  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      history.push(`${category}/search/${keyword}`);
    }
  }, [keyword, category, history]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <div className="movie-search">
      <Input type={`text`} placeholder={`Enter keyword`} value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <Button className={`small`} onClick={goToSearch}>
        Search
      </Button>
    </div>
  );
};

export default MovieGrid;
