import React from "react";
import Table from "../../components/components/Table";
import {
  Container,
  Dropdown,
  DropdownButton,
  Button,
  Row,
} from "react-bootstrap";

function AdminTable(props) {
  return (
    props.users && (
      <Container fluid>
        <Row className="toolbar d-flex justify-content-end">
          <Button style={{ marginRight: "3vw" }}>Search</Button>
          <DropdownButton
            id="dropdown-basic-button"
            title="Change status"
            style={{ marginRight: "0.5vw" }}
          >
            <Dropdown.Item
              href=""
              onClick={() => props.changeUsersStatus("blocked")}
            >
              Blocked
            </Dropdown.Item>
            <Dropdown.Item
              href=""
              onClick={() => props.changeUsersStatus("active")}
            >
              Active
            </Dropdown.Item>
            <Dropdown.Item
              href=""
              onClick={() => props.changeUsersStatus("admin")}
            >
              *Admin
            </Dropdown.Item>
          </DropdownButton>
          <Button
            style={{ marginRight: "3vw" }}
            onClick={() => props.deleteUsers()}
          >
            delete
          </Button>
        </Row>
        <Table
          headers={[
            "id",
            "name",
            "sign_up_date",
            "last_sign_in_date",
            "status",
          ]}
          items={props.users}
          addCheckedItem={props.addCheckedUser}
          removeCheckedItem={props.removeCheckedUser}
          keyName="id"
          checkedUsers={props.checkedUsers}
        />
      </Container>
    )
  );
}

export default AdminTable;
