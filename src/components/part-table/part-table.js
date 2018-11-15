import React from 'react';
import { render } from 'react-dom';
import ReactTable from 'react-table';
import { makeData } from './part-table-utils';

// Import React Table
import 'react-table/react-table.css';

class PartTable extends React.Component {
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
          columns={[
            {
              Header: 'Name',
              columns: [
                {
                  Header: 'Part ID',
                  accessor: 'partId',
                },
                {
                  Header: 'Last Name',
                  id: 'lastName',
                  accessor: d => d.lastName,
                },
              ],
            },
            {
              Header: 'Info',
              columns: [
                {
                  Header: 'Age',
                  accessor: 'age',
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
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

export default PartTable;
