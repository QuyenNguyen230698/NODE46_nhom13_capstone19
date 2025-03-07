const {movieServices, movieAdminServices} = require("../../services/system/movie.service");
const Movie = require('../../models/system/movie.model');
const { BadRequestException } = require('../../common/helpers/error.helper');
const { ACCESS_TOKEN_SECRET } = require('../../common/constant/app.constant');

const movieAdminController = {

  getMovies: async (req, res) => {
    try {
      const { requiresCounts = false, skip = 0, take = 10, where = [], search = [], sorted = [] } = req.body;

      const { movieList, totalRecords } = await movieAdminServices.getMovies(skip, take, where, search, sorted, requiresCounts);

      res.status(200).json({
        result: movieList,
        count: totalRecords,
      });
    } catch (error) {
      console.error('Error fetching movie data:', error);
      res.status(500).json({ message: 'Error fetching movie data', error: error.message });
    }
  },

  createMovie: async (req, res) => {
    try {
      const { movieName, movieImage, movieDescription, movieTrailer, movieDuration, releaseDate, rating, isShowing, comingSoon, createdBy } = req.body;
      const movieCreated = await movieAdminServices.createMovie(movieName, movieImage, movieDescription, movieTrailer, movieDuration, releaseDate, rating, isShowing, comingSoon, createdBy);
      res.status(200).json({ result: true, message: 'Movie created successfully', data: movieCreated });
    } catch (error) {
      console.error('Error creating movie:', error);
      res.status(500).json({ message: 'Error creating movie', error: error.message });
    }
  },

  updateMovie: async (req, res) => {
    let result;
    try {
      const { _id, movieCode, movieName, movieImage, movieDescription, movieTrailer, movieDuration, releaseDate, rating, isShowing, comingSoon, updatedBy } = req.body;
      const movieUpdated = await movieAdminServices.updateMovie(_id, movieCode, movieName, movieImage, movieDescription, movieTrailer, movieDuration, releaseDate, rating, isShowing, comingSoon, updatedBy );
      result = true;
      res.status(200).json({ result, message: 'Movie updated successfully', data: movieUpdated });
    } catch (error) {
      result = false;
      res.status(400).json({ result, message: error.message });
    }
  },

  deleteMovie: async (req, res) => {
    let result;
    try {
      const { _id, status } = req.body;
      const movieDeleted = await movieAdminServices.deleteMovie(_id, status);
      result = true;
      res.status(200).json({ result, message: 'Movie deleted successfully', data: movieDeleted });
    } catch (error) {
      result = false;
      res.status(400).json({ result, message: error.message });
    }
  },

  updateStatusMovie: async (req, res) => {
    let result;
    try {
      const { _id, status } = req.body;
      const movieUpdated = await movieAdminServices.updateStatusMovie(_id, status);
      result = true;
      res.status(200).json({ result, message: 'Movie updated successfully', data: movieUpdated });
    } catch (error) {
      result = false;
      res.status(400).json({ result, message: error.message });
    }
  },

  findMovie: async (req, res) => {
    try {
      const searchCriteria = req.body; // Accept any search criteria

      // Find all movies based on input criteria
      const movies = await Movie.find(searchCriteria);

      if (movies.length === 0) {
        return res.status(404).json({
          result: false,
          message: 'No movies found'
        });
      }

      // Return movie data
      const movieData = movies.map(movie => ({
        _id: movie._id,
        movieName: movie.movieName,
        movieImage: movie.movieImage,
        movieDescription: movie.movieDescription,
        movieTrailer: movie.movieTrailer,
        movieDuration: movie.movieDuration,
        releaseDate: movie.releaseDate,
        rating: movie.rating,
        isShowing: movie.isShowing,
        comingSoon: movie.comingSoon
      }));

      res.status(200).json({
        result: true,
        message: 'Movies found',
        data: movieData
      });
    } catch (error) {
      res.status(500).json({
        result: false,
        message: error.message
      });
    }
  },

  createSchedule: async (req, res) => {
    try {
      const { maRap, maCumRap, theaterCode, releaseDate, price, movieCode } = req.body;
      const scheduleCreated = await movieAdminServices.createSchedule(maRap, maCumRap, theaterCode, releaseDate, price, movieCode);
      res.status(200).json({ result: true, message: 'Schedule created successfully', data: scheduleCreated });
    } catch (error) {
      console.error('Error creating Schedule:', error);
      res.status(500).json({ message: 'Error creating Schedule', error: error.message });
    }
  },

  findSchedule: async (req, res) => {
    try {
      const { maLichChieu } = req.body;
      const findSchedule = await movieAdminServices.findSchedule(maLichChieu);
      res.status(200).json({ result: true, message: 'Schedule found successfully', data: findSchedule });
    } catch (error) {
      console.error('Error finding schedule:', error);
      res.status(500).json({ message: 'Error finding schedule', error: error.message });
    }
  },

  createBanner: async (req, res) => {
    try {
      const { movieCode,bannerImage } = req.body;
      const createBanner = await movieAdminServices.createBanner(movieCode,bannerImage);
      res.status(200).json({ result: true, message: 'Create Banner Successfully', data: createBanner });
    } catch (error) {
      console.error('Error finding schedule:', error);
      res.status(500).json({ message: 'Error finding schedule', error: error.message });
    }
  }
};

const movieController = {
      getMovies: async (req, res) => {
        try {
          const { requiresCounts = false, skip = 0, take = 10, where = [], search = [], sorted = [] } = req.body;
    
          const { movieDataList, totalRecords } = await movieServices.getMovies(skip, take, where, search, sorted, requiresCounts);
    
          res.status(200).json({
            result: movieDataList,
            count: totalRecords,
          });
        } catch (error) {
          console.error('Error fetching movie data:', error);
          res.status(500).json({ message: 'Error fetching movie data', error: error.message });
        }
      },
      getMovieDetail: async (req, res) => {
        try {
          const { movieCode } = req.body;
          const movieDetail = await movieServices.getMovieDetail(movieCode);
          if (!movieDetail) {
            return res.status(404).json({
              result: false,
              message: 'Movie not found'
            });
          }
          res.status(200).json({
            result: true,
            message: 'Movie found',
            data: movieDetail
          });
        } catch (error) {
          res.status(500).json({
            result: false,
            message: error.message
          });
        }
      },
      getBanner: async (req,res) => {
        try {
          const dataBanner = await movieServices.getBanner();
          res.status(200).json({
            result: dataBanner
          });
        } catch (error) {
          console.error('Error fetching banner data:', error);
          res.status(500).json({ message: 'Error fetching banner data', error: error.message });
        }
      }
}

module.exports = { movieAdminController, movieController };
