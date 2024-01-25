import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const page = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    // index: { type: Number, required: true },
});

mongoose.models = {};

const Page = mongoose.model('Page', page);

export default Page;