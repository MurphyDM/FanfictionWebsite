import React from "react"
import {Container, Row, Col, Image, Table, Nav, Button} from "react-bootstrap"
import ModalWindow from './ModalWindow'
import './Story.css';
import IncreaseFontIcon from '../../images/increase_font.png'
import DecreaseFontIcon from '../../images/decrease_font.png'
import LightIcom from '../../images/light.png'

const BOOK_COVER_PLACEHOLDER = "https://images.squarespace-cdn.com/content/v1/5a5547e1a803bb7df0649e50/1569021071787-GQ6QWL4IMADHSY7W7VH2/ke17ZwdGBToddI8pDm48kKDp-7ip__g8QobJS6Y5m3dZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVFhb23Mwiwo3IFHbJH9edcC4_w0H8oueJbNNKCuHf_kD6QvevUbj177dmcMs1F0H-0/placeholder.png?format=1000w";
const DARK_THEME = "darkTheme";
const LIGHT_THEME = "lightTheme";
//turn off light
//switch page

function Story(props) {
    const changeTheme = (light, setLight) => {
        if(light===LIGHT_THEME) setLight(DARK_THEME);
        else setLight(LIGHT_THEME);
    }

console.log(props)
{console.log(props.light)}

    return (
        <>
        {props.isStarted&&<ModalWindow 
            title = "Hello, my lovely guest!"
            message = "Do you want to continue reading this book?"
            setIsAgreed = {props.setIsContinue}/>} 

        <Container fluid className = {props.light}>
            <Container style={{marginTop: "56px"}}>
                <Row style={{paddingTop: "30px"}}>
                    <Col className = "cover-wrapper"  
                        lg={{ span: 4, offset: 0}} 
                        md={3} 
                        sm={{ span: 4, offset: 4}} >
                    <Image className = "cover" src={props.story.image||BOOK_COVER_PLACEHOLDER} rounded  />
                  
                    </Col>
                    <Col lg={{ span: 7, offset: 1 }} sm={{ span: 8, offset: 2}}>
                        <h4>Info</h4>
                    <Table className = {props.light} style={{ width: '100%'}} >
                    <tbody className>
                        <tr>
                            <th>Title:</th>
                             <td>{props.story.title}</td>
                        </tr>
                        <tr>
                            <th>Description:</th>
                             <td>{props.story.description}</td>
                        </tr>
                        <tr>
                            <th>Author:</th>
                             <td>{props.story.userId} </td>
                        </tr>
                        <tr>
                            <th>Genre:</th>
                             <td>{props.story.genre}</td>
                        </tr>
                        <tr>
                            <th>Tags:</th>
                             <td>...</td>
                        </tr>
                        <tr>
                            <th>Comments:</th>
                             <td> 
                                 <a className="comments" href={`/Comments/${props.story.id}`}> Show comments </a>
                             </td>
                        </tr>
                        </tbody>
                        </Table>
                    </Col>
                </Row>
                
                <Nav className = {`toolbar ${props.light} justify-content-center`}>
                    <Nav.Item>
                        <Nav.Link href="" onClick={(e) => props.dispatch({type: 'decrementTextSize'})}>
                            <Image className = "textIcon" src={IncreaseFontIcon}/>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="" onClick={(e) => props.dispatch({type: 'incrementTextSize'})}>
                            <Image className = "textIcon" src={DecreaseFontIcon}/>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="" onClick={(e) => {changeTheme(props.light, props.setLight)}}>
                            <Image className = "lightIcon" src={LightIcom}/>
                        </Nav.Link>
                    </Nav.Item>            
                    </Nav>
               
                <Row className = "body" id="book">
                <Col sm={{ span: 10, offset: 1}} >
                    <h1>{props.story.title}</h1>
                    
                    {
                        console.log(`${props.state.textSize}px`)
                    }

                   <pre className = {`${props.light}`} style={{fontSize: `${props.state.textSize}px`, whiteSpace: 'pre-wrap' }}>
                        {props.pages&&(
                         props.pages.map((page, i) => {
                            return (page)} ))}
                    </pre>
                </Col>
                </Row>

            </Container>
        </Container>
       
    </>
    )
}

export default Story;
