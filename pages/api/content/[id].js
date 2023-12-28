import connectDB from "@/middleware/mongoDB"
import Content from "@/models/content"

const handler = async (req, res) => {

    const { id } = req.query;

    if (req.method === 'PATCH') {
        try {
            const updatedContent = await Content.findByIdAndUpdate(id, req.body);
            return res.status(200).send(updatedContent);
        }
        catch (error) {
            return res.status(500).send("content_patch", error.message);
        }
    }

    else if (req.method === 'GET') {
        try {
            const content = await Content.findById(id);
            return res.status(200).send(content);
        }
        catch (error) {
            return res.status(500).send("content_get", error.message);
        }
    }

    else {
        res.status(422).send('req_method_not_supported');
    }

    res.end();
};

export default connectDB(handler);