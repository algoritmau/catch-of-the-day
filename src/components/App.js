import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  static propTypes = {
    match: PropTypes.object,
  };

  state = {
    fishes: {},
    order: {},
  };

  componentDidMount() {
    const refFromLocalStorage = localStorage.getItem(
      this.props.match.params.storeId
    );

    if (refFromLocalStorage) {
      this.setState({ order: JSON.parse(refFromLocalStorage) });
    }

    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  // clean up by removing binding
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    // 1. Take a copy of the state to update
    const fishes = { ...this.state.fishes };

    // 2. Add new fishes
    fishes[`fish-${Date.now()}`] = fish;

    // 3. Set the new state
    this.setState({
      fishes,
    });
  };

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of current state
    const fishes = { ...this.state.fishes };

    // 2. Update that state
    fishes[key] = updatedFish;

    // 3. Set that to state
    this.setState({ fishes });
  };

  deleteFish = (key) => {
    // 1. Copy of the state
    const fishes = { ...this.state.fishes };

    // 2. Set item to remove to null for firebase removal
    fishes[key] = null;

    // 3. Update the state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes,
    });
  };

  addToOrder = (key) => {
    // 1. Take a copy of state
    const order = { ...this.state.order };

    // 2. Add to order or update the number in our order
    order[key] = order[key] + 1 || 1;

    // 3. Call setState to update our state
    this.setState({ order });
  };

  removeFromOrder = (key) => {
    // 1. Take a copy of state
    const order = { ...this.state.order };

    // 2. Remove item from order
    delete order[key];

    // 3. Update our state
    this.setState({ order });
  };

  render() {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Seafood Market' />
          <ul className='fishes'>
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;
