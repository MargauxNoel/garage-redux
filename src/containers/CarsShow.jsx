import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import Aside from '../components/Aside';
import { deleteCar } from '../actions';

class CarsShow extends Component {
  handleClick() {
    this.props.deleteCar(this.props.history, this.props.car);
  }
  render() {
    const { car } = this.props;
    if (!car) {
      return (
        <Aside key="aside" garage={this.props.garage}>
          <Link to="/">Back to list</Link>
        </Aside>
      );
    }
    return (
      <div>
        <Aside key="aside" garage={this.props.garage}>
          <Link to="/">Back to list</Link>
        </Aside>,
        <div className="car-item">
          <h3>`{car.brand} - {car.model}`</h3>
          <p>{car.plate}</p>
          <p>{car.owner}</p>
        </div>
        <Link to="/">
          Back
        </Link>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={this.handleClick}
        >
          Delete
        </button>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const idFromUrl = parseInt(ownProps.match.params.id, 10); // From URL
  const car = state.cars.find(p => p.id === idFromUrl);
  return { car };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteCar }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsShow);
