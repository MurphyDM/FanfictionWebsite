import React from 'react'
import CardsCatalog from '../components/CardsCatalog'

const styles = {
    chapter: {
        marginTop: '10vh',
        marginBottom: '1vh'
    }
}

class Catalog extends React.Component {
    render() {
        return (
            <div>
                <h1 style={
                    styles.chapter
                }>
                    Catalog
                </h1>
                <CardsCatalog items={this.props.stories}/>
            </div>
        )
    }
}

export default Catalog;
