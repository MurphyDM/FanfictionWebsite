import React from 'react'
import axios from 'axios'

import { setNewestStories } from '../store/stories/actions'
import { connect } from 'react-redux';

import Catalog from './Catalog'

function CatalogContainer(props) {


     console.log('genre:', props.match.params)
        React.useEffect(() => {
            const genre = props.match.params.genre;
            axios.get('/getStories', {
              params: {
                page: 0,
                quantity: 10,
                key: genre||null,
                sort: null
              }
            }).then(response => {
              props.setNewestStories(response.data);
            })
            .catch((error) => {
              console.log('error 3 ' + error);
            });
        }, []);

        return <Catalog stories={props.newestStories}/>
}

const mapStateToProps = (state) => {
    return {
        newestStories: state.stories.newestStories
    }
  }
  
  const mapDispatchToProps = {
    setNewestStories
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(CatalogContainer)
