import React from 'react';
import { render } from 'react-dom';
import ReactTable from 'react-table';
import { makeData } from './data-utils';

// Import React Table
import 'react-table/react-table.css';

const columns = [
  {
    Header: 'ID',
      {
        Header: 'Description',
        accessor: 'partDescription',
      },
      {
        Header: 'Sub',
        id: 'partSub',
        accessor: d => d.lastName,
      },
  },
  {
    Header: 'Source',
    columns: [
      {
        Header: 'Mfg Num',
        accessor: 'age',
      },
      {
        Header: 'Price',
        accessor: 'status',
      },
    ],
  },
  {
    Header: 'Category',
    columns: [
      {
        Header: 'Visits',
        accessor: 'visits',
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
          columns={columns}
          defaultPageSize={10}
          className="-striped -highlight"
          SubComponent={(row) => {
            return (
              <div style={{ padding: '20px' }}>
                <em>
                  You can put any component you want here, even another React
                  Table!
                </em>
                <br />
                <br />
                <ReactTable
                  data={data}
                  columns={columns}
                  defaultPageSize={3}
                  showPagination={false}
                  SubComponent={(row) => {
                    return (
                      <div style={{ padding: '20px' }}>
                        Another Sub Component!
                      </div>
                    );
                  }}
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
