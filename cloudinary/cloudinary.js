const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "hoprofnfo",
    api_key: "454118165946315",
    api_secret: "iZgvT6xPYWz_SW5shvayMteqLF0",
    
});

module.exports = { cloudinary };