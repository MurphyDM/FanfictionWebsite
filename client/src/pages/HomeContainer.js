import React from 'react'
import axios from 'axios'

import { setRomanceStories, setNewestStories, setAdventuresStories, setOriginalStories, setFantasyStories } from '../store/stories/actions'
import { connect } from 'react-redux';

import Home from './Home'

function HomeContainer(props) {
      React.useEffect(() => {
        axios.get('/getStories', {
            params: {
              page: 0,
              quantity: 10
            }
          }).then(response => {
            props.setNewestStories(response.data);
          })
          .catch((error) => {
            console.log('error 3 ' + error);
          });

          axios.get('/getStoriesWhere', {
            params: {
              page: 0,
              key: 'romance',
              quantity: 10
            }
          }).then(response => {
            props.setRomanceStories(response.data);
          })
          .catch((error) => {
            console.log('error 3 ' + error);
          });

          axios.get('/getStoriesWhere', {
            params: {
              page: 0,
              key: 'adventures',
              quantity: 10
            }
          }).then(response => {
            props.setAdventuresStories(response.data);
          })
          .catch((error) => {
            console.log('error 3 ' + error);
          });

          //
          axios.get('/getStoriesWhere', {
            params: {
              page: 0,
              key: 'fantasy',
              quantity: 10
            }
          }).then(response => {
            console.log('fantasy: ', response.data)
            props.setFantasyStories(response.data);
          })
          .catch((error) => {
            console.log('error 3 ' + error);
          });
          //

          axios.get('/getStoriesWhere', {
            params: {
              page: 0,
              key: 'original',
              quantity: 10
            }
          }).then(response => {
            props.setOriginalStories(response.data);
          })
          .catch((error) => {
            console.log('error 3 ' + error);
          });
      }, []);

        return (
                <Home 
                    newestStories = { props.newestStories } 
                    romanceStories = { props.romanceStories } 
                    fantasyStories = { props.fantasyStories }
                    adventuresStories = { props.adventuresStories }
                    originalStories = { props.originalStories }
                />
        )
}

const mapStateToProps = (state) => {
    return {
        newestStories: state.stories.newestStories,
        romanceStories: state.stories.romanceStories,
        fantasyStories: state.stories.fantasyStories,
        adventuresStories: state.stories.adventuresStories,
        originalStories: state.stories.originalStories

    }
  }
  
  const mapDispatchToProps = {
    setNewestStories, 
    setRomanceStories, 
    setAdventuresStories, 
    setFantasyStories, 
    setOriginalStories
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
