import React from "react"
import CardsCatalog from "../components/components/CardsCatalog"
import MediaList from "../components/components/MediaList"
import { Form } from "react-bootstrap";


const styles = {
    chapter: {
        marginTop: "10vh",
        marginBottom: "1vh"
    }
}

class Filter extends React.Component {
    render() {
        return (
            <div>
                <h1 style={
                    styles.chapter
                }>
                    Catalog
                </h1>

                <>
            <Form.Control as="select" className="mr-sm-2"
                value={this.props.genre}
                onChange=
                {e => {
                    this.props.setGenre(e.target.value);
                    }
                }
                custom>
                <option value="0">Genre...</option>
                <option value="fantasy">Fantasy</option>
                <option value="romance">Romance</option>
                <option value="adventures">Adventure</option>
                <option value="original">Original</option>
            </Form.Control>


            <MediaList stories={this.props.stories}/>
        </>
            </div>
        )
    }
}

export default Filter;
