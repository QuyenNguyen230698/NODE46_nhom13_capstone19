const Theater = require("../../models/system/theater.model");
const { responseSuccess } = require('../../common/helpers/responsive.helper');
const TheaterComplex = require('../../models/system/theaterComplex.model');
const Chair = require('../../models/system/chair.model');

const theaterServices = {
    getTheaters: async (req) => {
        try {
            const theaterDataList = await Theater.find({});

            return responseSuccess('Get theaters successfully', theaterDataList);
        } catch (error) {
            console.error('Error fetching theater data:', error);
            throw new Error('Failed to fetch theater data');
        }
    },
    findTheater: async (theaterCode) => {
        try {
            const theaters = await TheaterComplex.find({ theaterCode });
            return responseSuccess('Get theaters successfully', theaters);
        } catch (error) {
            console.error('Error finding theaters:', error);
            throw new Error('Failed to find theaters');
        }
    },
    getChairs: async (req) => {
        try {
            const chairDataList = await Chair.find({});

            return responseSuccess('Get chairs successfully', chairDataList);
        } catch (error) {
            console.error('Error fetching chair data:', error);
            throw new Error('Failed to fetch chair data');
        }
    }
}

module.exports = { theaterServices };