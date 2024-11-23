const mongoose=require("mongoose");

const bookingSchema = new mongoose.Schema({
    preferredDay: String,
    exerciseType: String,
    timeSlot: String,
    trainer: String,
    sessionType: String,
});
  
const Booking = mongoose.model('Booking', bookingSchema);
module.exports=Booking;