// file-upload-s3-config.js
import multer from 'multer';

const storage = multer.memoryStorage(); // store in memory for manual upload

const upload = multer({ storage });

export default upload;
