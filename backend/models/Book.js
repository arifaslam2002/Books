import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
          type:String,
        required:true
    },
    department:{
          type:String,
        required:true
    },
    condition:{
          type:String,
        required:true
    },
    ownerName:{
          type:String,
        required:true
    }
})
const Book = mongoose.model("Book",bookSchema);
export default Book;
