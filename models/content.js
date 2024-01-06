import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const content = new Schema({
    pageId: { type: Schema.Types.ObjectId },
    pageName: { type: String },
    tab: { type: String },
    content: { type: String },
});

mongoose.models = {};

const Content = mongoose.model('Content', content);

export default Content;