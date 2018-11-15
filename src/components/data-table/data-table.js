import React from 'react';

// Import React Table
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import * as dataActions from "../../action/data";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

const columns = [
  {
    Header: 'Sub Assemblies',
    columns: [
      {
        Header: 'Parts',
        accessor: 'parts',
      },
      {
        Header: 'Sub Id',
        accessor: 'subId',
      },
      {
        Header: 'Sub Minutes',
        accessor: 'subMinutes',
      },
      {
        Header: 'Sub Part',
        accessor: 'subPart',
      },
      {
        Header: 'Sub Quantity',
        accessor: 'subQuantity',
      },
      {
        Header: 'Sub Version',
        accessor: 'subVersion',
      },
    ],

  },
];

const columnsParts = [
  {
    Header: 'Parts',
    columns: [
      {
        Header: 'Part Number',
        assessor: 'partIds',
      },
      {
        Header: 'Description',
        assessor: 'partDescription',
      },
      {
        Header: 'Part Sub',
        assessor: 'partSub',
      },
      {
        Header: 'Source',
        assessor: 'partSrc',
      },
      {
        Header: 'Mfg Number',
        assessor: 'partMfgNum',
      },
      {
        Header: 'Price',
        assessor: 'partPrice',
      },
      {
        Header: 'Category',
        assessor: 'partCategory',
      },
      {
        Header: 'Location',
        assessor: 'partLocation',
      },
      {
        Header: 'Count',
        assessor: 'partCount',
      },
      {
        Header: 'Long Lead Time',
        assessor: 'partLongLead',
      },
      {
        Header: 'Notes',
        assessor: 'partNotes',
      },
    ],
  },
];

class DataTable extends React.Component {
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
      <div>
        <ReactTable
          data={data}
          filterable
          defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value
          }
          columns={columns}
          defaultPageSize={10}
          style={{ height: '400px' }}
          className="-striped -highlight"
          SubComponent={(row) => {
            return (
              <div style={{ padding: '20px' }}>
                <br />
                <br />
                <ReactTable
                  data={data}
                  columns={columnsParts}
                  defaultPageSize={3}
                  showPagination={false}
                />
              </div>
            );
          }}
        />
        <br />
      </div>
    );
  }
}

// export default DataTable;

const mapStateToProps = state => ({
  token: state.token,
  subAssy: state.subAssy,
  parts: state.parts,
});

const mapDispatchToProps = dispatch => ({
  pGetSubAssy: subAssy => dispatch(dataActions.getSubAssy(subAssy)),
  pGetParts: parts => dispatch(dataActions.getParts(parts)),
});

DataTable.propTypes = {
  location: PropTypes.object,
  pGetSubAssy: PropTypes.func,
  pGetParts: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
