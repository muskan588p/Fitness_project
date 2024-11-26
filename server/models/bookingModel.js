const mongoose=require("mongoose");

const bookingSchema = new mongoose.Schema({
    preferredDay: { type: String, required: true },
    exerciseType: { type: String, required: true },
    timeSlot: { type: String, required: true },
    trainer: { type: String, required: true },
    sessionType: { type: String, required: true },
}, { timestamps: true });

  
bookingSchema.index(
    { trainer: 1, timeSlot: 1, preferredDay: 1 }, 
    { unique: true, message: "This session is already booked." }
);

const Booking = mongoose.model('Booking', bookingSchema);
module.exports=Booking;