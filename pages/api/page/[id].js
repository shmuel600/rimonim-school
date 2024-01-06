import connectDB from "@/middleware/mongoDB"
import User from "@/models/user"

const handler = async (req, res) => {

    const { id: pageId } = req.query;

    if (req.method === 'GET') {
        try {
            const user = await User.findOne({ permissions: pageId });
            return res.status(200).send(user);
        }
        catch (error) {
            return res.status(500).send("user_pageId_get", error.message);
        }
    }

    else {
        res.status(422).send('req_method_not_supported');
    }

    res.end();
};

export default connectDB(handler);