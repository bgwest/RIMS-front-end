import React from 'react';
import ReactTable from 'react-table';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import matchSorter from 'match-sorter'
import 'react-table/react-table.css';
import './part-table.scss';
import * as dataActions from "../../action/data";

class PartTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.makeData(),
      subLink: this.props.subLink,
    };
  }

  range = (len) => {
    const arr = [];
    for (let i = 0; i < len; i++) {
      arr.push(i);
    }
    return arr;
  };

  newPerson = (inputData) => {
    return inputData;
  };

  makeData(len = this.props.subLink.length) {
    let lenCounter = -1;
    return this.range(len).map((d) => {
      return {
        ...this.newPerson(this.props.subLink[lenCounter += 1]),
        children: this.range(10).map(this.newPerson),
      };
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          columns={[
            {
              Header: 'Parts',
              columns: [
                {
                  Header: 'ID',
                  id: 'partId',
                  accessor: d => d.partId,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["partId"] }),
                  filterAll: true
                },
                {
                  Header: 'Description',
                  id: 'partDescription',
                  accessor: d => d.partDescription,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["partDescription"] }),
                  filterAll: true
                },
                {
                  Header: 'Sub',
                  id: 'partSub',
                  accessor: d => d.partSub,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["partSub"] }),
                  filterAll: true
                },
                {
                  Header: 'Src',
                  id: 'partSrc',
                  accessor: d => d.partSrc,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["partSrc"] }),
                  filterAll: true
                },
                {
                  Header: 'MFG#',
                  id: 'partMfgNum',
                  accessor: d => d.partMfgNum,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["partMfgNum"] }),
                  filterAll: true
                },
                {
                  Header: 'Price',
                  id: 'partPrice',
                  accessor: d => d.partPrice,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["partPrice"] }),
                  filterAll: true
                },
                {
                  Header: 'Category',
                  id: 'partCategory',
                  accessor: d => d.partCategory,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["partCategory"] }),
                  filterAll: true
                },
                {
                  Header: 'Location',
                  id: 'partLocation',
                  accessor: d => d.partLocation,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["partLocation"] }),
                  filterAll: true
                },
                {
                  Header: 'Count',
                  id: 'partCount',
                  accessor: d => d.partCount,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["partCount"] }),
                  filterAll: true
                },
                {
                  Header: 'Long Lead',
                  id: 'partLongLead',
                  accessor: d => d.partLongLead,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["partLongLead"] }),
                  filterAll: true
                },
                {
                  Header: 'Notes',
                  id: 'partNotes',
                  accessor: d => d.partNotes,
                },
                {
                  Header: 'subIDRef',
                  id: 'subIDRef',
                  accessor: d => d.subIDRef,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["subIDRef"] }),
                  filterAll: true
                },
                {
                  Header: 'subAssembly',
                  id: 'subAssembly',
                  accessor: d => d.subAssembly,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["subAssembly"] }),
                  filterAll: true
                },
              ],
            },
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
  subAssy: state.subAssy,
  parts: state.parts,
});

const mapDispatchToProps = dispatch => ({
  pGetSubAssy: subAssy => dispatch(dataActions.getSubAssy(subAssy)),
  pGetParts: parts => dispatch(dataActions.getParts(parts)),
});

PartTable.propTypes = {
  location: PropTypes.object,
  pGetSubAssy: PropTypes.func,
  pGetParts: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(PartTable);
