// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const uploadOnCloudinary = async (localFilePath) => {
//   try {
//     if (!localFilePath) {
//       return null;
//     }

//     //upload the file on cloudinary

//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     });

//     //file has been uploaded successfully
//     // console.log("file uploded on cloudinary", response.url); // url means the path of the upladed file

//     //unlinking file form public/temp
//     console.log('processing files...');
//     fs.unlinkSync(localFilePath);
//     return response;
//   } catch (error) {
//     fs.unlinkSync(localFilePath); // remeove the locally saved temprory file upload the opreation go faild
//     return null;
//   }
// };

// export { uploadOnCloudinary };