import React from "react"
import {Card} from "react-bootstrap"

const BOOK_COVER_PLACEHOLDER = "https://images.squarespace-cdn.com/content/v1/5a5547e1a803bb7df0649e50/1569021071787-GQ6QWL4IMADHSY7W7VH2/ke17ZwdGBToddI8pDm48kKDp-7ip__g8QobJS6Y5m3dZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVFhb23Mwiwo3IFHbJH9edcC4_w0H8oueJbNNKCuHf_kD6QvevUbj177dmcMs1F0H-0/placeholder.png?format=1000w";
const styles = {
    text: {
        whiteSpace: "nowrap",
        overflow: "hidden" ,
        padding: "5px"
    }

}

class CardItem extends React.Component {
    render() {
        let image = BOOK_COVER_PLACEHOLDER;
        if(this.props.image != "idundefined") image = this.props.image;
        return (
            <div style={ { padding: "1.5vw" } }>
                    <Card style = { { width:"250px", padding: '1rem'} }>
                        <a href={`/catalog/${this.props.id}`}>
                            <Card.Img 
                            variant = "top" 
                            src = { image }
                            width = { 180 }
                            height = { 250 } />
                        </a>
                        <Card.Body style = { { whiteSpace: "pre-wrap" } }>  
                            <Card.Title style = { styles.text }>
                                { this.props.caption }
                            </Card.Title>
                            <Card.Text style = { styles.text }>
                                { this.props.description }
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer >
                            <small className = "text-muted">
                                { this.props.genre } 
                            </small>
                        </Card.Footer>
                    </Card>
            </div>
        )
    }
}

export default CardItem;
