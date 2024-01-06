import connectDB from "@/middleware/mongoDB"
import Page from "@/models/page"

const handler = async (req, res) => {

    if (req.method === 'POST') {

        const {
            name,
            type
        } = req.body;

        if (name && type) {
            const existingPage = await Page.findOne({ name })
            try {
                if (existingPage) return res.status(409).send('page_already_exist');
                else {
                    const pageDetails = new Page({
                        name,
                        type,
                    });
                    const page = await pageDetails.save();
                    return res.status(200).send(page);
                }
            }
            catch (error) {
                return res.status(500).send("page_post", error.message);
            }
        }
        else {
            await res.status(422).send('data_incomplete');
        }
    }

    else if (req.method === 'GET') {
        try {
            console.log("get all pages");
            const pages = await Page.find()
            return res.status(200).send(pages);
        }
        catch (error) {
            return res.status(500).send("page_get", error.message);
        }
    }

    else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);