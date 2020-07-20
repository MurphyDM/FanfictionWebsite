import React from 'react'
import {Col, Card} from 'react-bootstrap'

const styles = {
    text: {
        whiteSpace: 'nowrap',
        overflow: 'hidden' ,
        padding: '5px'
    }

}
class CardItem extends React.Component {
    render() {
        return (
            <div>
                    <Card style={{width:'300px'}}>
                        <Card.Img 
                        variant="top" 
                        src={this.props.image}
                        style={{width:'100%'}}/>
                        <Card.Body>
                            <Card.Title style={styles.text}>
                                { this.props.caption }
                            </Card.Title>
                            <Card.Text style={styles.text}>
                                { this.props.description }
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer >
                            <small className="text-muted">
                                Last updated UNDEFINED mins ago
                            </small>
                        </Card.Footer>
                    </Card>
            </div>
        )
    }
}

export default CardItem;
