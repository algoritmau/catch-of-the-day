import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  static propTypes = {
    history: PropTypes.object,
  };

  myInput = React.createRef();

  goToStore = (e) => {
    e.preventDefault();
    // Using history's push method to change pages
    this.props.history.push(`/store/${this.myInput.current.value}`);
  };

  render() {
    return (
      <form className='store-selector' onSubmit={this.goToStore}>
        <h2>Please enter a store</h2>
        <input
          type='text'
          required
          placeholder='Store Name'
          defaultValue={getFunName()}
          ref={this.myInput}
        />
        <button type='submit'>Visit Store &rarr;</button>
      </form>
    );
  }
}

export default StorePicker;
