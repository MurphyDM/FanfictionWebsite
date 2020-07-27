import React, { Suspense } from "react";
import { Tabs, Tab } from "react-bootstrap";
import "../Style.css";

function ControlledTabs(props) {
  const [activeKey, setKey] = React.useState(1);

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={activeKey}
      onSelect={(k) => setKey(k)}
    >
      {props.components.map((component, i) => {
        return (
          <Tab eventKey={i} title={component.name} key={i}>
            {activeKey == i && (
              <Suspense fallback={<div>Loading...</div>}>
                <component.component />
              </Suspense>
            )}
          </Tab>
        );
      })}{" "}
    </Tabs>
  );
}

export default ControlledTabs;
