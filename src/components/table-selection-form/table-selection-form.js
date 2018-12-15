import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../routes';

class TableSelectionForm extends React.Component {
  constructor(props) {
    super(props);
    this.emptyState = {
      subAssemblies: '',
      unassociatedParts: '',
    };
    this.state = this.emptyState;
  }

  handleChange = (event) => {
    let { name, value } = event.target;
    let mutated = false;
    if (value === '') {
      value = 'render';
      mutated = true;
    }
    if (value === 'render' && mutated === false) {
      value = '';
    }
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState(this.emptyState);
  };

  render() {
    console.log(this.state);
    return (
      <section>
        <h2>Live Inventory</h2>
        <h3>Select data to render:</h3>
        <form>
          <button type="button"
                  name="subAssemblies"
                  value={this.state.subAssemblies}
                  onClick={this.handleChange}>
            {this.state.subAssemblies === 'render' ? 'Sub Assemblies - Selected' : 'Sub Assemblies'}
          </button>
        </form>
        <form>
          <button type="button"
                  name="unassociatedParts"
                  value={this.state.unassociatedParts}
                  onClick={this.handleChange}>
            {this.state.unassociatedParts === 'render' ? 'Unassociated Parts - Selected' : 'Unassociated Parts'}
          </button>
        </form>
        <br/>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">render selections</button>
        </form>
      </section>
    );
  }
}

export default TableSelectionForm;
