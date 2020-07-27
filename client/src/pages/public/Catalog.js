import React from "react"
import { Form } from "react-bootstrap";

import MediaList from "../../components/components/MediaList"

const styles = {
    chapter: {
        marginTop: "10vh",
        marginBottom: "1vh"
    }
}

function Catalog(props) {

        return (
            <div>
                <h1 style={
                    styles.chapter
                }>
                    Catalog
                </h1>

                <>
            <Form.Control as="select" className="mr-sm-2"
                value={props.genre}
                onChange=
                {e => {
                    props.setGenre(e.target.value);
                    }
                }
                custom>
                <option value="0">Genre...</option>
                <option value="fantasy">Fantasy</option>
                <option value="romance">Romance</option>
                <option value="adventures">Adventure</option>
                <option value="original">Original</option>
            </Form.Control>


            <MediaList 
                stories={props.stories} 
                setReadLaterItem = {props.setReadLaterItem}/>
            </>
            </div>
        )

}

export default Catalog;
