import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../requirements'))
    },

    filename: (req, file, cb) =>  {
        cb(null, file.originalname)
    }
})

export const upload = multer({
    storage: storage,
    /* fileFilter: function(req, file, cb) {
        const fileType = path.extname(file.originalname)
        console.log(fileType)
        if(fileType === '.png' || fileType === '.jpg' || fileType === '.jpeg' || fileType === '.pdf') {
            return cb(null, true);
        }
       
        else {
            return cb(new Error('Error: File type not supported!'));
        }
    }, */
    limits: { fileSize: 10 * 1024 * 1024 }
});


export const multerErrorHandler = (err, req, res, next) => {
    const start = Date.now();
    if(err instanceof multer.MulterError) {
        console.log(`Sending Multer Error: ${err.message}`);
        res.json({ error: err.message })
        console.log(`Multer Error Sended: ${ err.message }`);
        console.log(`MUlter Error Timeout at: ${ Date.now() - start }ms`)
        return;
    }
    else if(err) {
        console.log(`Sending General Error: ${err.message}`);;
        res.json({ error: err.message})
        console.log(`General Error Sended: ${ err.message }`);
        console.log(`General Error Timeout at: ${ Date.now() - start }ms`)
        return
    }

    console.log('Go to the next Step');
    console.log(`Multer Error Handler run at: ${ Date.now() - start }ms`);
    next();
}
