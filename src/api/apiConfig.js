const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  api_key: "100f1a4fcc6ed5a383e8171de21ed476",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
