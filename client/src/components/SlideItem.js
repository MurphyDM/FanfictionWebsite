import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

const styles = {
    slider: {
        height: '70vh'
    },
    slide: {
        height: '70vh'
    },
    img: {
        height: '70vh',
        width: '100vw'
    }
}

class SliderItem extends React.Component {
    render() {
        return (
            <>
            <img className="d-block w-100"
                style={
                    styles.img
                }
                src={
                    this.props.image
                }
                alt="slider image"/>
            <Carousel.Caption>
                <h3>{
                     this.props.caption
                }</h3>
                <p>{
                     this.props.description
                }</p>
            </Carousel.Caption>
            </>
        )
    }
}

export default SliderItem;
