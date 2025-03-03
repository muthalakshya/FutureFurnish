import mongoose from "mongoose";

const flexibleSchema = new mongoose.Schema({}, { strict: false });

const JuteBag = mongoose.model("JuteBag", flexibleSchema);

export default JuteBag;
