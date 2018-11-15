import React from 'react';
import ReactTable from 'react-table';
import { makeData } from './data-utils';

// Import React Table
import 'react-table/react-table.css';

const columns = [
  {
    Header: 'Part ID',
    columns: [
      {
        Header: 'Part Description',
        accessor: 'partDescription',
      },
      {
        Header: 'Part Sub',
        id: 'partSub',
        accessor: d => d.lastName,
      },
    ],
  },
  {
    Header: 'Part Source',
    columns: [
      {
        Header: 'Part',
        accessor: 'age',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
    ],
  },
  {
    Header: 'Stats',
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
