import React from "react"

function Home(props) {
    console.log('props: ', props);
    const storyId = props.match.params.storyId;
    return (
    <h1 style={{marginTop: '10vh'}}> Story #{storyId}</h1>
    )
}

export default Home;
