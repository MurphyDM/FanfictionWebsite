import React from "react"
import { CardGroup } from "react-bootstrap"
import CardItem from "./CardItem"

function CardsCatalog(props) {
    return (
        <CardGroup> {
            props.items.map((item, i) => {
                return (
                    <CardItem
                        image={
                            item.image||"https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder-1024x512.png"
                        }
                        caption={
                            item.title
                        }
                        description={
                            item.body
                        }
                        time={
                            item.time
                        }
                        user={
                            item.userId
                        }
                        key = {
                            item.id
                        }/>
                );
            })
        } </CardGroup>

    );
}

export default CardsCatalog;
