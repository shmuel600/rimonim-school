import connectDB from "@/middleware/mongoDB"
import Content from "@/models/content"
import mongoose from "mongoose";

const handler = async (req, res) => {

    if (req.method === 'POST') {

        const { pageId, pageName, tab } = req.body;

        if (pageId && pageName && tab) {
            const existingPageContent = await Content.findOne({ pageId, tab })
            try {
                if (existingPageContent) return res.status(200).send(existingPageContent);
                else {
                    const pageContent = new Content({
                        pageId,
                        pageName,
                        tab,
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