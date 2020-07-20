import React from 'react'
import axios from 'axios'

import Slideshow from './Slideshow'
import SlideItem from './SlideItem'

function SlideshowContainer(props) {
    const [slides, setSlides] = React.useState([true]);

    React.useEffect(() => {
        axios.get('/getStories', {
            params: {
                page: 0,
                quantity: 3,
                key: null,
                sort: null
            }
        }).then(response => {
            setSlides(response.data);
        }).catch((error) => {
            console.log('error 3 ' + error);
        });
    }, []);

    return (
        <Slideshow slides={slides} content = {SlideItem} />
    )
}


export default SlideshowContainer;
