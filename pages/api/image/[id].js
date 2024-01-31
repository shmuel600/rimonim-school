import connectDB from "@/middleware/mongoDB"
import { cloudinary } from './cloudinary'
import Image from "@/models/image"

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
}

const handler = async (req, res) => {

    const { id } = req.query;
    const { filename } = req.body;

    if (req.method === 'DELETE') {
        try {
            await cloudinary.uploader.destroy(filename);
            await Image.findByIdAndDelete(id)
            const gallery = await Image.find()
            return res.status(200).send(gallery);
        }
        catch (error) {
            alert('Error deleting image:', error);
            return res.status(500).send("image_delete", error.message);
        }
    }

    else {
        res.status(422).send('req_method_not_supported');
    }
}

export default connectDB(handler);
