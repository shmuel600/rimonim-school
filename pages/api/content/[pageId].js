import connectDB from "@/middleware/mongoDB"
import Content from "@/models/content"

const handler = async (req, res) => {

    const { pageId } = req.query;
    const { content, tab, user } = req.body;

    if (req.method === 'PATCH') {
        try {
            const editor = user?.name ? user.name : ''
            const updatedContent = await Content.findOneAndUpdate({ pageId, tab }, { content, lastEdit: Date.now(), editor })
            return res.status(200).send(updatedContent);
        }
        catch (error) {
            return res.status(500).send("content_patch", error.message);
        }
    }

    else if (req.method === 'GET') {
        try {
            const content = await Content.findOne({ pageId, tab });
            return res.status(200).send(content);
        }
        catch (error) {
            return res.status(500).send("content_get", error.message);
        }
    }

    else if (req.method === 'DELETE') {
        try {
            const content = await Content.findByIdAndDelete(id);
            return res.status(200).send(content);
        }
        catch (error) {
            return res.status(500).send("content_delete", error.message);
        }
    }

    else {
        res.status(422).send('req_method_not_supported');
    }

    res.end();
};

export default connectDB(handler);