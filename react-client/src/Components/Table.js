import React, { Component } from "react";
import TableHeader from "./TableHeader";
import CustomRow from "./CustomRow";
import { withRouter } from "react-router-dom";

class Table extends Component {
  render() {
    console.log(this.props.tableHeaderData);
    console.log(this.props.tableRowData);

    // Ensure TableHeader returns <th>
    let headerNodes = this.props.tableHeaderData.map((headerData, index) => (
      <TableHeader key={index} tableHeaderValue={headerData} />
    ));

    // Ensure CustomRow returns <tr> with <td>
    let rowNodes = this.props.tableRowData.map((rowData, index) => (
      <CustomRow key={index} action={this.props.action} rowData={rowData} />
    ));

    return (
      <div className="panel-body">
        <div className="table-responsive">
          <table className="table table-striped" align="center">
            <thead>
              <tr align="center">{headerNodes}</tr>
            </thead>
            <tbody>{rowNodes}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withRouter(Table);