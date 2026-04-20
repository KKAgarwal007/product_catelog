import ImageKit from "@imagekit/nodejs";
import dotenv from "dotenv";
dotenv.config();
const client = new ImageKit({
  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'],
});

const uploadFile = async (file) => {
  try {
    const response = await client.files.upload({
        file: file.toString('base64'), // Use the buffer from multer's memory storage
        fileName: `product_${Date.now()}.jpg`, // You can customize the file name as needed
    });
    return response;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

export default uploadFile;