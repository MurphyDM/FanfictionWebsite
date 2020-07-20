import React from 'react'
import axios from 'axios'

export function uploadFile(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e) => {
        const image = e.target.result;

        axios.post('/photo', {
            image: image,
            name: file.name
        }).then(res => {
            console.log('img upload to the server successfully')
        }).catch(() => console.log('can\'t upload image file right now'));
    }
}
