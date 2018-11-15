import React from 'react';
import ReactTable from 'react-table';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

// styles
import 'react-table/react-table.css';
import './part-table.scss';

// actions
import * as dataActions from "../../action/data";

class PartTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.makeData(),
      subLink: this.props.subLink,
    };
    console.log(this.props.subLink);
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
          columns={[
            {
              Header: 'Parts',
              columns: [
                {
                  Header: 'ID',
                  accessor: 'partId',
                },
                {
                  Header: 'Description',
                  id: 'partDescription',
                  accessor: d => d.partDescription,
                },
                {
                  Header: 'Sub',
                  id: 'partSub',
                  accessor: d => d.partSub,
                },
                {
                  Header: 'Src',
                  id: 'partSrc',
                  accessor: d => d.partSrc,
                },
                {
                  Header: 'MFG#',
                  id: 'partMfgNum',
                  accessor: d => d.partMfgNum,
                },
                {
                  Header: 'Price',
                  id: 'partPrice',
                  accessor: d => d.partPrice,
                },
                {
                  Header: 'Category',
                  id: 'partCategory',
                  accessor: d => d.partCategory,
                },
                {
                  Header: 'Location',
                  id: 'partLocation',
                  accessor: d => d.partLocation,
                },
                {
                  Header: 'Count',
                  id: 'partCount',
                  accessor: d => d.partCount,
                },
                {
                  Header: 'Long Lead',
                  id: 'partLongLead',
                  accessor: d => d.partLongLead,
                },
                {
                  Header: 'Notes',
                  id: 'partNotes',
                  accessor: d => d.partNotes,
                },
                {
                  Header: 'SubAssy',
                  id: 'subAssembly',
                  accessor: d => d.subAssembly,
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

// export default PartTable;

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
