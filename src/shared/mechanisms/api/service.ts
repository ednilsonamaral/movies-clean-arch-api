import getInstance from "./instance";

class MovieAPI {
  async getTrendingMovies () {
    try {
      const trendinMovies = await getInstance.get('/');
      return trendinMovies.data;
    } catch (err) {
      console.log('err: ', err);
    }
  }
}

export default new MovieAPI();