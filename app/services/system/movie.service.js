const Movie = require("../../models/system/movie.model");
const ShowSchedule = require("../../models/system/showSchedule.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { responseSuccess } = require('../../common/helpers/responsive.helper');
const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRES } = require('../../common/constant/app.constant');

const buildQuery = (where) => {
    let query = {};
    Object.keys(where).forEach(key => {
        query[key] = where[key];
    });
    return query;
};

const buildSearchQuery = (search) => {
    let searchQuery = {};
    search.forEach(item => {
        searchQuery[item.name] = { $regex: item.value, $options: 'i' };
    });
    return searchQuery;
};

const movieAdminServices = {
  getMovies: async (skip, take, where, search, sorted, requiresCounts) => {
    try {
        let query = buildQuery(where);
        query = { $and: [query, { status: { $ne: 'archived' } }] };

        if (search.length > 0) {
            const searchQuery = buildSearchQuery(search);
            query = { $and: [query, searchQuery] };
        }

        let sortOptions = {};
        if (sorted.length > 0) {
            sorted.forEach(sort => {
                sortOptions[sort.name] = sort.direction === 'ascending' ? 1 : -1;
            });
        }

        let movieList = await Movie.find(query)
            .sort(sortOptions)
            .skip(parseInt(skip, 10))
            .limit(parseInt(take, 10))
            .lean();

        if (movieList.length > 0) {
            movieList = movieList.map(item => ({
                ...item,
                createdBy: item.systemInfo?.createdBy,
                updatedBy: item.systemInfo?.updatedBy,
                lastUpdated: item.systemInfo?.lastUpdated,
                systemInfo: undefined, // Remove systemInfo field
            }));
        }

        const totalRecords = requiresCounts ? await Movie.countDocuments(query) : undefined;

        return { movieList, totalRecords };
    } catch (error) {
        console.error('Error fetching movie data:', error);
        throw new Error('Failed to fetch movie data');
    }
  },

  createMovie: async (movieName, movieImage, movieDescription, movieTrailer, movieDuration, releaseDate, rating, isShowing, comingSoon, createdBy) => {
    try {
      const newMovie = new Movie({
        movieName,
        movieImage,
        movieDescription,
        movieTrailer,
        movieDuration,
        releaseDate,
        rating,
        isShowing,
        comingSoon,
        createdBy
      });
      await newMovie.save();
      return responseSuccess(`Movie ${movieName} created successfully`);
    } catch (error) {
      console.error('Error creating movie:', error);
      throw new Error('Failed to create movie');
    }
  },

  updateMovie: async (_id, movieCode, movieName, movieImage, movieDescription, movieTrailer, movieDuration, releaseDate, rating, isShowing, comingSoon, updatedBy) => {
    try {
      // find the movie by id
      const movie = await Movie.findOne({ _id });
      if (!movie) {
        throw new Error('Movie not found');
      }
      await Movie.updateOne({ _id }, { movieCode, movieName, movieImage, movieDescription, movieTrailer, movieDuration, releaseDate, rating, isShowing, comingSoon, updatedBy, status: 'draft' });
    
      return responseSuccess(`Movie ${movieName} updated successfully`);
    } catch (error) {
      console.error('Error updating movie:', error);
      throw new Error('Failed to update user');
    }
  },

  deleteMovie: async (_id, status) => {
    try {
      // Find the user by _id
      const movie = await Movie.findOne({ _id });
      if (!movie) {
        throw new Error('Movie not found');
      }
    
      // Update the user's status
      movie.status = status;
      await movie.save();
    
      return responseSuccess(`Movie ${movie.movieName} deleted successfully`);
    } catch (error) {
      console.error('Error deleting movie:', error);
      throw new Error('Failed to delete movie');
    }
  },

  updateStatusMovie: async (_id, status) => {
    try {
        // Find the user by _id
        const movie = await Movie.findOne({ _id });
        if (!movie) {
          throw new Error('Movie not found');
        }
      
        // Update the user's status
        movie.status = status;
        await movie.save();
      
        return responseSuccess(`Movie ${movie.movieName} ${status} successfully`);
      } catch (error) {
        console.error('Error updating movie status:', error);
        throw new Error('Failed to update movie status');
      }
  },

  createSchedule: async (maRap, maCumRap, theaterCode, releaseDate, price, movieCode) => {
    try {
      const newSchedule = new ShowSchedule({
        maRap,
        maCumRap,
        theaterCode,
        releaseDate,
        price,
        movieCode
      });
      await newSchedule.save();
      return responseSuccess(`Schedule created successfully`);
    } catch (error) {
      console.error('Error creating schedule:', error);
      throw new Error('Failed to create schedule');
    }
  },

  findSchedule: async (maLichChieu) => {
    try {
      const schedule = await ShowSchedule.findOne({ maLichChieu });
      return schedule;
    } catch (error) {
      console.error('Error finding schedule:', error);
      throw new Error('Failed to find schedule');
    }
  }
};

const movieServices = {
    getMovies: async (skip, take, where, search, sorted, requiresCounts) => {
        try {
            let query = buildQuery(where);
            query = { $and: [query, { status: 'published' }] };
    
            if (search.length > 0) {
                const searchQuery = buildSearchQuery(search);
                query = { $and: [query, searchQuery] };
            }
    
            let sortOptions = {};
            if (sorted.length > 0) {
                sorted.forEach(sort => {
                    sortOptions[sort.name] = sort.direction === 'ascending' ? 1 : -1;
                });
            }
    
            let movieDataList = await Movie.find(query)
                .sort(sortOptions)
                .skip(parseInt(skip, 10))
                .limit(parseInt(take, 10))
                .lean();
    
            if (movieDataList.length > 0) {
                movieDataList = movieDataList.map(item => ({
                    ...item,
                    createdBy: item.systemInfo?.createdBy,
                    updatedBy: item.systemInfo?.updatedBy,
                    lastUpdated: item.systemInfo?.lastUpdated,
                    systemInfo: undefined, // Remove systemInfo field
                }));
            }
    
            const totalRecords = requiresCounts ? await Movie.countDocuments(query) : undefined;
    
            return { movieDataList, totalRecords };
        } catch (error) {
            console.error('Error fetching movie data:', error);
            throw new Error('Failed to fetch movie data');
        }
    },
    getMovieDetail: async (movieCode) => {
        try {
            const movieDetail = await Movie.findOne({ movieCode });
            return movieDetail;
        } catch (error) {
            console.error('Error getting movie detail:', error);
            throw new Error('Failed to get movie detail');
        }
    }
}

module.exports = { movieAdminServices, movieServices };