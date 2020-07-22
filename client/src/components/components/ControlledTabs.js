import React from 'react'
import {Tabs, Tab} from 'react-bootstrap'
import '../Style.css'

function ControlledTabs(props) {
    const [key, setKey] = React.useState(1);

    return (
        <Tabs id="controlled-tab-example"
            activeKey={key}
            onSelect={
                (k) => setKey(k)
        }>
            {
            props.components.map((component, i) => {
                return (
                    <Tab eventKey={i}
                        title={
                            component.name
                        }
                        key={i}>
                        <component.component/>
                    </Tab>
                )
            })
        } </Tabs>
    );
}

export default ControlledTabs;
