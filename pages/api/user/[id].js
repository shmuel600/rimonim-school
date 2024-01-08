import connectDB from "@/middleware/mongoDB"
import User from "@/models/user"

const handler = async (req, res) => {

    const { id } = req.query;

    if (req.method === 'GET') {
        // get user from page id
        try {
            const user = await User.findOne({ permissions: id });
            if (user) return res.status(200).send(user);
            else return res.status(200).send({ name: '' });
        }
        catch (error) {
            return res.status(500).send("user_pageId_get", error.message);
        }
    }

    else if (req.method === 'PATCH') {
        try {
            const updatedUser = await User.findByIdAndUpdate(id, req.body);
            return res.status(200).send(updatedUser);
        }
        catch (error) {
            return res.status(500).send("user_id_patch", error.message);
        }
    }

    else {
        res.status(422).send('req_method_not_supported');
    }

    res.end();
};

export default connectDB(handler);