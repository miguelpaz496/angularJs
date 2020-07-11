const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/img')
    },
    filename: function(req, file, cb){
        var ext = file.originalname.split(".")[1];
        cb(null, req.body.titulo + " imagen." + ext)
    }
});

const fileFilter = function(req, file, cb){

    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }else{
        cb(new Error("ext mala"), false)
    }
    
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

module.exports = upload;