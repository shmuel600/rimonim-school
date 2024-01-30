import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const image = new Schema({
    url: { type: String, required: true },
});

mongoose.models = {};

const Image = mongoose.model('Image', image);

export default Image;