import multer from 'multer';

const multerConfig = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'src/uploads');
        },
        filename: (req, file, cb) => {
            const fileName = `${Date.now()}-${file.originalname}`;
            cb(null, fileName);
        }
    }),

    // limits: {
    //     fileSize: 1024 * 1024 * 5,
    // },

    // fileFilter: {

    // },
}

export default multerConfig;