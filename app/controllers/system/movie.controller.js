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
}

module.exports = { movieAdminController, movieController };
