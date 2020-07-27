import React from "react"
import {Table, Button} from "react-bootstrap"
import {Route} from "react-router-dom"


function InfoTable (props) {
        return (
            <Table striped bordered hover size="sm">
            <thead>
              <tr>
              { props.headers.map((header, i) => { return (
                <th key={i}> { header } </th>
              )})}
               <th/>
               <th/>
              </tr> 
            </thead>
            <tbody>
            { props.items.map((item, i) => { 
              return (
               <tr key={item[props.keyName]}>
                { props.headers.map((header, i) =>  { 
                  return (
                    <td key = {i}>
                        {item[header]}
                    </td>
                )})}
                
                 <td>
                  <input type="checkbox" onChange = { (e) => {
                    e.target.checked?props.addCheckedItem(item[props.keyName]):
                    props.removeCheckedItem(item[props.keyName]);
                  }}/> 
                 </td>
                 <td>
                  <Button />
                 </td>
              </tr>
            )})}
            </tbody>
          </Table>

        )
}

export default InfoTable;