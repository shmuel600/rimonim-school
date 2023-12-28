import connectDB from "@/middleware/mongoDB"
import Content from "@/models/content"
import mongoose from "mongoose";

const handler = async (req, res) => {

    if (req.method === 'POST') {

        const { pageId, pageName } = req.body;

        if (pageId && pageName) {
            const existingPageContent = await Content.findOne({ _id: pageId })
            try {
                if (existingPageContent) return res.status(200).send(existingPageContent);
                else {
                    const pageContent = new Content({
                        _id: pageId,
                        pageName,
                        content: ''
                    });
                    const content = await pageContent.save();
                    return res.status(200).send(content);
                }
            }
            catch (error) {
                return res.status(500).send("content_post", error.message);
            }
        }
        else {
            await res.status(422).send('data_incomplete');
        }
    }

    else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);