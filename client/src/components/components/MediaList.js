import React, {useState} from "react"
import {
    Media
} from "react-bootstrap"

const PLACEHOLDER_AVATAR = "https://media.istockphoto.com/vectors/default-avatar-profile-icon-gray-placeholder-photo-vector-id844060994?k=6&m=844060994&s=170667a&w=0&h=gqrpuJ3y31Kj1v3CA95g5Mo0ObxwAVf_Efu9nwc9cHs=" ;

const styles = {
    media: {
        marginBottom: "1rem",
        border: "3px solid #f0f0f0"
    },
    div: {
        margin: "1rem"
    },
    title: {
        fontFamily: "Gentium Book Basic, serif",
        fontWeight: "700"
    },
    genre: {
        overflowWrap: "anywhere",
        fontSize: "15px",
        fontWeight: "700", 
        color: "#cccccc"
    },
    description: {
        overflowWrap: "anywhere",
        fontSize: "17px",
        fontFamily: "Gentium Book Basic, serif",
        fontWeight: "400"
    }

}
function MediaList(props) {
    console.log(props.stories)
    const mediaCardDescriptionTextSize = 900;
    return (
        <>
        <ul className="list-unstyled">
            { props.stories.map((story, i) => {
                let descriptionText = story.description;
                if(descriptionText.length > mediaCardDescriptionTextSize){
                    descriptionText = descriptionText.slice(0, mediaCardDescriptionTextSize) + " ...";
                }
                if(story.image=="idundefined") story.image=PLACEHOLDER_AVATAR
                return (         
                    <Media as="li" key = { i } style = {styles.media}>
                    <div className="d-flex" style={styles.div}>
                       <img className="mr-3"
                            width={150}
                            height={200}     
                            src= { story.image }
                            alt="Story cover"
                        />
                        <Media.Body>
                            <h4 style={styles.title}> { story.title } </h4>
                            <p style={styles.genre}>
                                {story.genre}
                            </p>
                            <p style={styles.description}>
                                { descriptionText }
                            </p>
                        </Media.Body>
                    </div>
                    </Media>
                )
                })
            }
        </ul>
           
        </>
        )
    }

export default MediaList;

