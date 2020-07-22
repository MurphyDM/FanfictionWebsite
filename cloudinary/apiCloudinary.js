const cloudinary = require("./cloudinary");

function uploadImage(res, imageName, imageBody, userId) {
    cloudinary.cloudinary.uploader.upload(
        imageBody, function (error, result) {
        if (error) 
            res.send(error);
         else 
            res.send(result);
        
    });

    

function transformImage(imageName, userId, width=200, height=200, gravity="face", crop="thumb" ){
    cloudinary.image(userId+imageName, {transformation: [
        {width: width, height: height, gravity: gravity, crop: crop},
        {radius: 20, border: "5px_solid_black"},
        {overlay: "cloudinary_icon", opacity: 50, width: "0.25", flags: "relative", gravity: "north_east", y: 10, x: 10}
        ]})
}

module.exports = {
    uploadImage,
    transformImage
}