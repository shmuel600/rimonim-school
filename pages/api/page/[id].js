import connectDB from "@/middleware/mongoDB"
import Page from "@/models/page"

const handler = async (req, res) => {

    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const page = await Page.findById(id);
            return res.status(200).send(page);
        }
        catch (error) {
            return res.status(500).send("page_id_get", error.message);
        }
    }

    else if (req.method === 'PATCH') {
        try {
            const updatedPage = await Page.findByIdAndUpdate(id, req.body);
            return res.status(200).send(updatedPage);
        }
        catch (error) {
            return res.status(500).send("page_id_patch", error.message);
        }
    }

    else if (req.method === 'DELETE') {
        try {
            const page = await Page.findByIdAndDelete(id);
            return res.status(200).send(page);
        }
        catch (error) {
            return res.status(500).send("page_id_delete", error.message);
        }
    }

    else {
        res.status(422).send('req_method_not_supported');
    }

    res.end();
};

export default connectDB(handler);