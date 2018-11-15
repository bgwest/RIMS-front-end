import React from 'react';
import { render } from 'react-dom';
import matchSorter from 'match-sorter';

// Import React Table
import ReactTable from 'react-table';
import { makeData } from './data-utils';
import 'react-table/react-table.css';

const columns = [
  {
    Header: 'Sub Assemblies',
    columns: [
      {
        Header: 'Sub Id',
        accessor: 'subId',
      },
      {
        Header: 'Sub Part',
        accessor: 'subPart',
      },
      {
        Header: 'Sub Version',
        accessor: 'subVersion',
      },
      {
        Header: 'Sub Quantity',
        accessor: 'subQuantity',
      },
      {
        Header: 'Sub Minutes',
        accessor: 'subMinutes',
      },
      {
        Header: 'Parts',
        accessor: 'partIds',


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
  constructor() {
    super();
    this.state = {
      data: makeData(),
    };
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

export default DataTable;
