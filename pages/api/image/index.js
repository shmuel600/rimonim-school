import connectDB from '@/middleware/mongoDB'
import { cloudinary } from './cloudinary'
import Image from '@/models/image'


export const config = {
    api: {
        bodyParser: {
            sizeLimit: '100mb',
        },
    },
}


const handler = async (req, res) => {

    if (req.method === 'POST') {
        try {
            const fileStr = req.body.data;
            const uploadResponse = await cloudinary.uploader.upload(fileStr, {
                folder: `gallery`
            });
            const newImage = new Image({ url: uploadResponse.secure_url })
            await newImage.save();
            const gallery = await Image.find()
            return res.status(200).send(gallery);
        }
        catch (error) {
            return res.status(500).send("gallery_post", error.message);
        }
    }

    else if (req.method === "GET") {
        try {
            const gallery = await Image.find()
            return res.status(200).send(gallery);
        }
        catch (error) {
            return res.status(500).send("gallery_get", error.message);
        }
    }

    else {
        return res.status(422).send("req_method_not_supported");
    }
}

export default connectDB(handler);