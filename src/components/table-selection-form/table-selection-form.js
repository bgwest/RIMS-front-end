import React from 'react';

class TableSelectionForm extends React.Component {
  constructor(props) {
    super(props);
    this.emptyState = {
      subAssemblies: '',
      unassociatedParts: '',
      // import to leave this as the last piece of state to handle the
      // handleSelectionProperty with more simple logic
      nothingSelected: true,
    };
    this.state = this.emptyState;
  }

  handleChange = (event) => {
    let { name, value } = event.target;
    let mutated = false;
    let nothingSelected = true;

    if (value === '') {
      value = 'render';
      nothingSelected = false;
      mutated = true;
    }

    if (value === 'render' && mutated === false) {
      value = '';
    }

    // must check all state before claiming this is still true
    // if it's false, do nothing for small optimization
    if (nothingSelected === true) {
      const checkFullState = Object.values(this.state);
      // count the renders
      let addRenders = 0;
      for (let stateIndex = 0; stateIndex <= checkFullState.length - 1; stateIndex++) {
        if (checkFullState[stateIndex] === 'render') {
          addRenders += 1;
          nothingSelected = false;
        }
      }
      // check for unique scenario of there only being 1 render left that happens to be
      // the state that is about to change...
      if (addRenders === 1 && value === '') {
        // we can safely assume this should be true after setState...
        nothingSelected = true;
      }
    }
    // preserve all current state, change 'this' button state, change overall selection state
    this.setState({ ...this.state, [name]: value, nothingSelected: nothingSelected });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState(this.state);
  };

  render() {
    const { nothingSelected } = this.state;
    return (
      <section>
        <h2>Live Inventory</h2>
        <h3>Render selections OR uncheck all and clear:</h3>
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
          <button type="submit">{nothingSelected ? 'Clear renders' : 'Render selections'}</button>
        </form>
      </section>
    );
  }
}

export default TableSelectionForm;
