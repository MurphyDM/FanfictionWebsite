import React from 'react'

import SlideshowContainer from '../components/SlideshowContainer'
import HorizontalScrollCardsContainer from '../components/HorizontalScrollCardsContainer'

const storyMainGenres = ['fantasy', 'romance', 'adventures', 'original'];
const styles = {
    chapter: {
        marginTop: '15vh',
        marginBottom: '1vh'
    }
}


function Home(props) {
    return (
        <div style={
            styles.chapter
        }>
            <SlideshowContainer/> 
            {
                storyMainGenres.map((item, i) => {
                    return (
                        <HorizontalScrollCardsContainer genre={item}
                            key={i}/>
                    )
                })
            } 
        </div>
    )
}

export default Home;
