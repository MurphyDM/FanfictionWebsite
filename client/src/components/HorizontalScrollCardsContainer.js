import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

import HorizontalScrollCards from './HorizontalScrollCards'
import CardItem from './CardItem'

function HorizontalScrollCardsContainer(props) {
    const [stories, setStories] = React.useState([]);

    React.useEffect(() => {
        const genre = props.genre;
        console.log('genre', genre)
        axios.get('/getStories', {
            params: {
                page: 0,
                quantity: 10,
                key: genre || null,
                sort: null
            }
        }).then(response => {
            setStories(response.data);
        }).catch((error) => {
            console.log('error 3 ' + error);
        });
    }, []);

    return (
        (stories.length > 0) ?
          <HorizontalScrollCards cards={stories}
            content={CardItem}
            subpath={
                props.genre
            }/>:
           <>
                <div className="d-flex justify-content-center text-center text-dark" style={{marginTop: '20vh'}}>
                        <h1>Welcome!</h1>
                        <h2>We don't have stories yet.</h2> 
                        <h3><Link to="/Signup">Sign up</Link> and write the first one:)</h3>
                </div>
        </>
    )
}


export default HorizontalScrollCardsContainer;
