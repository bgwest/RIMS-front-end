import React from 'react';
import ReactTable from 'react-table';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import matchSorter from 'match-sorter';
import 'react-table/react-table.css';
import './sub-assemblies-table.scss';
import * as dataActions from "../../action/data";
import PartTable from '../part-table/part-table';

class SubAssembliesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.makeData(),
    };
  }

  range = len => {
    const arr = [];
    for (let i = 0; i < len; i++) {
      arr.push(i);
    }
    return arr;
  };

  newPart(inputData) {
    return inputData;
  };

  makeData(len = this.props.subAssy.length) {
    let lenCounter = -1;
    return this.range(len).map(d => {
      return {
        ...this.newPart(this.props.subAssy[lenCounter += 1]),
        children: this.range(10).map(this.newPart),
      };
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div className="dataTable">
        <ReactTable
          data={data}
          filterable
          defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
          columns = {[
          {
            Header: 'Sub Assemblies',
            columns: [
          {
            Header: 'Parts',
            id: 'parts',
            accessor: d => d.parts,
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["parts"] }),
            filterAll: true
          },
          {
            Header: 'Sub Id',
            id: "subId",
            accessor: d => d.subId,
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["subId"] }),
            filterAll: true
          },
          {
            Header: 'Sub Minutes',
            accessor: 'subMinutes',
            filterMethod: (filter, row) =>
              row[filter.id].startsWith(filter.value) &&
              row[filter.id].endsWith(filter.value)
          },
          {
            Header: 'Sub Part',
            id: 'subPart',
            accessor: d => d.subPart,
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["subPart"] }),
            filterAll: true
          },
          {
            Header: 'Sub Quantity',
            id: 'subQuantity',
            accessor: d => d.subQuantity,
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["subQuantity"] }),
            filterAll: true,
          },
          {
            Header: 'Sub Version',
            id: 'subVersion',
            accessor: d => d.subVersion,
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["subVersion"] }),
            filterAll: true          },
            ]
          }
        ]}
          defaultPageSize={10}
          style={{ height: '400px' }}
          className="-striped -highlight"
          SubComponent={(row) => {
            // used to give Parts Component instance only associated parts to Sub Assy
            const passToPartComponent = this.props.parts.filter((eachPart) => {
              if (eachPart.subIDRef === row.original.subId) {
                return eachPart;
              }
            });
            return (
              <div style={{ padding: "20px" }}>
                <PartTable subLink={passToPartComponent}/>
              </div>
            );
          }}
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

SubAssembliesTable.propTypes = {
  location: PropTypes.object,
  pGetSubAssy: PropTypes.func,
  pGetParts: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubAssembliesTable);
