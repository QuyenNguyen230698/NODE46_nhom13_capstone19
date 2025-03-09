const Theater = require("../../models/system/theater.model");
const { responseSuccess } = require('../../common/helpers/responsive.helper');
const TheaterComplex = require('../../models/system/theaterComplex.model');
const Chair = require('../../models/system/chair.model');
const Booking = require('../../models/system/booking.model');
const ShowSchedule = require('../../models/system/showSchedule.model');

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
    },
    createBooking: async (email, maLichChieu, danhSachVe) => {
        try {
            const newBooking = new Booking({
                email,
                maLichChieu,
                danhSachVe
            });
            await newBooking.save();
            const updatedSchedule = await ShowSchedule.findOne({ maLichChieu });
            if (updatedSchedule) {
                updatedSchedule.seat.forEach(seat => {
                    danhSachVe.forEach(item => {
                        if (item.maGhe === seat.maGhe) {
                            item.placed = true;
                            item.accountPlaced = email;
                        }
                    });
                })
                try {
                    await updatedSchedule.save();
                    console.log('Schedule saved successfully');
                } catch (error) {
                    console.error('Error saving updated schedule:', error);
                }
            }
            return responseSuccess('Booking created successfully', newBooking);
        } catch (error) {
            console.error('Error creating booking:', error);
            throw new Error('Failed to create booking');
        }
    }
}

module.exports = { theaterServices };