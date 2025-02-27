const { response } = require("express");
const Concerts = require("../../models/concertModel");


//!works

exports.getConcerts = async (req, res) => {
  try {
    const concerts = await Concerts.find().sort({ artist: 1 });
    if (!concerts) return res.status(404).json({ error: "concerts not found" });
    return res.status(200).json({ concerts: concerts });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//!works

exports.getConcertsByID = async (req, res) => {
  try {
    if (!req.params.id || req.params.id === "")
      return res.status(400).json({ error: "prams id not found" });
    const concerts = await Concerts.findOne({ id: req.params.id });
    if (!concerts)
      return res
        .status(404)
        .json({ error: "A concert with this ID does not exist" });
    return res.status(200).json({ concerts: concert });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//!works

exports.postConcerts = async (req, res) => {
  try {
    const concerts = req.body.bookings;
    concerts.forEach(async (concert) => {
      console.log(concert.artist);
      await Concerts.create({
        id: concert.id,
        artist: concert.artist,
        location: { id: concert.location_id },
        shows: [],
      });
    });

    if (!concerts) return res.status(404).json({ err: "concerts not found" });
    return res.status(200).json({ concerts: concerts });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//!works

exports.addShows = async (req, res) => {
  try {
    const shows = req.body.shows;
    shows.forEach(async (show) => {
      success = await Concerts.insertMany(
        { id: show.concert_id },
        {
          shows: [
            {
              id: show.id,
              concert_id: show.concert_id,
              start: show.start,
              end: show.end,
            },
          ],
        },
        { new: true }
      );
      console.log(success);
    });

    if (!shows) return res.status(404).json({ err: "shows not found" });
    return res.status(200).json({ concerts: shows });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//!works

exports.addRows = async (req, res) => {
  try {
    const rows = req.body.rows;
    rows.forEach(async (row) => {
      const concert = await Concerts.findOne({ "shows.id": row.show_id });
      success = await Concerts.findOneAndUpdate(
        { "shows.id": row.show_id },
       {
        $push: {
          "location.$.rows":
            {
              id: row.id,
              show_id: row.show_id,
              name: row.name,
              order: row.order,
            }
          },
       },
          { new: true, upsert: false }
      );
      console.log(success);
    });

    if (!rows) return res.status(404).json({ err: "shows not found" });
    return res.status(200).json({ concerts: rows });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//? does not work


exports.addSeats = async (req, res) => {
  try {
    const seats = req.body.seats;
    seats.forEach(async (seat) => {
      console.log( await Concerts.find({ "location.rows.id": seat.location_seat_row_id }) )
      success = await Concerts.findOneAndUpdate(
        { "location.rows.id": seat.location_seat_row_id },
       {
        $push: {
          "location.rows.&.id":
            {
              id: seat.id,
              location_seat_row_id: seat.location_seat_row_id,
              number: seat.number,
              reservation_id: seat.reservation_id,
              ticket_id: seat.ticket_id
            }
          },
       },
          { new: true, upsert: false }
      );
      // console.log(success);
    });

    if (!seats) return res.status(404).json({ err: "shows not found" });
    return res.status(200).json({ concerts: seats });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getSeating = async (req, res) => {
  try {
    if (!req.params.concert_id_id || req.params.show_id)
      return res.status(400).json({ error: "prams id not found" });


    const rows = Concerts.findOne({"shows.id": show_id})
    if (!rows) return res.status.json({error: "A concert or show with this ID does not exist"})

    return res.status(200).json({ concerts: rows });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


//? does not work

exports.makeReservation = async (req, res) => {
  try {
    if (!req.params.concert_id || req.params.show_id)
      return res.status(400).json({ error: "prams id not found" });


    const {reservation_token, reservations} = req.body

    if (!reservation_token || !reservations || reservations.length < 0) {
      return
    }

    const concert = findOne({id:req.params.concert_id , "show.$.id": req.params.show_id })

    // quary = {
    //   $push: { "shows.$.rows": rowData } 
    // }


    const rows = Concerts.findOne({"show.id": show_id})
    if (!rows) return res.status.json({error: "A concert or show with this ID does not exist"})

    return res.status(200).json({ concerts: rows });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};








// const mongoose = require('mongoose');
// const Concert = require('./models/Concert');
// async function updateConcerts(data) {
//     for (let row of data) {
//         const { concertId, showId, rowData } = row;

//         await Concert.findOneAndUpdate(
//             { concertId, "shows.showId": showId },
//             { 
//                 $push: { "shows.$.rows": rowData } 
//             },
//             { new: true, upsert: false } // Don't create new concerts, just update
//         );
//     }
// }

// // Example new rows to add
// const newRows = [
//     { concertId: "concert_001", showId: "show_001", rowData: { rowId: "row_2", seats: ["B1", "B2", "B3"] } },
//     { concertId: "concert_002", showId: "show_003", rowData: { rowId: "row_4", seats: ["D1", "D2", "D3"] } }
// ];

// updateConcerts(newRows).then(() => console.log("Concerts updated!")).catch(console.error);


// const { response } = require("express");
// const Concerts = require("../../models/concert/concertModel.js");
// const Tickets = require("../../models/concert/concertModel.js");
// const Bookings = require("../../models/concert/concertModel.js");
// const Rows = require("../../models/concert/concertModel.js");
// const Seats = require("../../models/concert/concertModel.js");
// const Shows = require("../../models/concert/concertModel.js");


// exports.postConcerts = async (req, res) => {
//   try {
//     const data = req.body.bookings
//     data.forEach (async element => {
//       console.log(element)
//       await Concerts.create(
//         {
//           _id: element.id,
//           artist: element.artist,
//           location: {id: element.location_id}
//         }
//       ).then( (r)=>console.log(r))
      
//     });

//   } catch (error) {
//     return res.status(500).json({"error": error})
//   }
// }