const {theaterServices} = require("../../services/system/theater.service");
const Theater = require('../../models/system/theater.model');
const TheaterComplex = require('../../models/system/theaterComplex.model');
const Chair = require('../../models/system/chair.model');

const theaterController = {
    getTheaters: async (req, res) => {
        try {
          const theaterDataList = await theaterServices.getTheaters(req);
    
          res.status(200).json({
            result: theaterDataList
          });
        } catch (error) {
          console.error('Error fetching movie data:', error);
          res.status(500).json({ message: 'Error fetching movie data', error: error.message });
        }
      },
      createTheater: async (req, res) => {
        try {
          const { theaterCode, theaterName, slug, logo } = req.body;
    
          const newTheater = new Theater({
            theaterCode,
            theaterName,
            slug,
            logo
          });
          await newTheater.save();
          res.status(200).json({ message: 'Theater created successfully' });
        } catch (error) {
          console.error('Error creating theater:', error);
          res.status(500).json({ message: 'Error creating theater', error: error.message });
        }
      },
      createTheaterComplex: async (req, res) => {
        try {
          const { theaterCode, maCumRap, tenCumRap, diaChi, danhSachRap } = req.body;
    
          const newTheaterComplex = new TheaterComplex({
            theaterCode,
            maCumRap,
            tenCumRap,
            diaChi,
            danhSachRap
          });
          await newTheaterComplex.save();
          res.status(200).json({ message: 'Theater complex created successfully' });
        } catch (error) {
          console.error('Error creating theater complex:', error);
          res.status(500).json({ message: 'Error creating theater complex', error: error.message });
        }
      },
      getChairs: async (req, res) => {
        try {
          const chairDataList = await theaterServices.getChairs(req);
    
          res.status(200).json({
            result: chairDataList
          });
        } catch (error) {
          console.error('Error fetching chair data:', error);
          res.status(500).json({ message: 'Error fetching chair data', error: error.message });
        }
      },
      createChair: async (req, res) => {
        try {
          const { maGhe, tenGhe, maRap, loaiGhe, stt, giaVe, daDat, taiKhoanNguoiDat } = req.body;
    
          const newChair = new Chair({
            maGhe,
            tenGhe,
            maRap,
            loaiGhe,
            stt,
            giaVe,
            daDat,
            taiKhoanNguoiDat
          });
          await newChair.save();
          res.status(200).json({ message: 'Chair created successfully' });
        } catch (error) {
          console.error('Error creating chair:', error);
          res.status(500).json({ message: 'Error creating chair', error: error.message });
        }
      },
      findTheater: async (req, res) => {
        try {
          const { theaterCode } = req.body;
    
          const theater = await theaterServices.findTheater(theaterCode);
          res.status(200).json({ result: theater });
        } catch (error) {
          console.error('Error finding theater:', error);
          res.status(500).json({ message: 'Error finding theater', error: error.message });
        }
      }
}

module.exports = { theaterController };
