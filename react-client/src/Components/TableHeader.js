import React, { Component } from "react";

class TableHeader extends Component {
  render() {
    return <th className="tableHeader">{this.props.tableHeaderValue}</th>;
  }
}

export default TableHeader;