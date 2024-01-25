import connectDB from "@/middleware/mongoDB"
import User from "@/models/user"

const handler = async (req, res) => {

    if (req.method === 'POST') {

        const {
            name,
            email,
            image
        } = req.body;

        if (name && email && image) {
            const existingUser = await User.findOne({ email })
            try {
                if (existingUser) return res.status(200).send(existingUser);
                else {
                    const userDetails = new User({
                        name,
                        email,
                        image,
                        permissions: null
                    });
                    const user = await userDetails.save();
                    return res.status(200).send(user);
                }
            }
            catch (error) {
                return res.status(500).send("user_post", error.message);
            }
        }
        else {
            await res.status(422).send('data_incomplete');
        }
    }

    else if (req.method === 'GET') {
        try {
            // delete all users without any permissions for more than 2 weeks
            const today = new Date();
            const twoWeeksAgo = today.setDate(today.getDate() - 14);
            await User.find({ permissions: null, lastPermissions: { $lt: twoWeeksAgo } }).deleteMany()
            // get all users
            const users = await User.find();
            return res.status(200).send(users);
        }
        catch (error) {
            return res.status(500).send("user_get", error.message);
        }
    }

    else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);