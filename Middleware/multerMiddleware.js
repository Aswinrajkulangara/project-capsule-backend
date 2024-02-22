const multer = require('multer')

const storage = multer.diskStorage({  // diskstorage method is used to create storage 
    destination:(req,file,callback)=>{
        callback(null,'./uploads') // the file will be stored in uploads folder


    },
    filename:(req,file,callback)=>{
        const filename = `image-${Date.now()}-${file.originalname}` // it set the name of file that we are going to upload
        callback(null,filename) // it set the filename as the uploaded files name
    }
})

 // only allow these type of files

 
const fileFilter= (req,file,callback)=>{
    // mimetype is used to set the type of files
    if(file.mimetype ==='image/png' || file.mimetype ==='image/jpg' || file.mimetype ==='image/jpeg')
    {
        callback(null,true)
    }
    else
    {
        callback(null,false)
        return callback(new Error("only png,jpg,jpeg files are allowed"))
    }
    
}


const multerConfig = multer({

    storage,  // where the file is stored
    fileFilter  // which all file can be stored
})

module.exports = multerConfig