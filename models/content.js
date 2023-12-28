import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const content = new Schema({
    _id: { type: Schema.Types.ObjectId },
    pageName: { type: String },
    content: { type: String },
});

mongoose.models = {};

const Content = mongoose.model('Content', content);

export default Content;