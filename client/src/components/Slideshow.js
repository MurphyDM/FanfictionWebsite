import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

const styles = {
    corousel: {
        height: '70vh',
        overflowX: 'scroll',
        overflowY: 'hidden',
        whiteSpace: 'nowrap',
        scroll: 'hidden'
    },
    carouselItem: {
        display: 'inline-block',
        height: '70vh',
        width: '100vw'
    },
    img: {
        height: '70vh',
        width: '100vw'
    }
}

function Slideshow(props) {
    const [index, setIndex] = React.useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    let Content = props.content;

    if(props.slides.length===0) return (<></>);
    
    return (
        <Carousel style = {styles.slider}
            activeIndex={index}
            onSelect={handleSelect}>
            {
            props.slides.map((slide, i) => {
                return (
                    <Carousel.Item key = {slide.id}>
                        <div className='d-flex'>
                            <Content 
                                image = { slide.image||"https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder-1024x512.png" } 
                                caption = { slide.title } 
                                description = { slide.body }
                                time = { slide.time }
                                user = { slide.userId }
                            />
                        </div>
                    </Carousel.Item>
                )
            })
        } </Carousel>
    );
}

export default Slideshow;
