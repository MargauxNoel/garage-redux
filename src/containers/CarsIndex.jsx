import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCars } from '../actions/index';
import Aside from '../components/Aside';

class CarsIndex extends Component {
  componentDidMount() {
    this.props.fetchCars(this.props.garage);
  }

  renderCars() {
    return this.props.cars.map((car) => {
      return (
        <Link to={`/cars/${car.id}`} key={car.id}>
          <div key={car.id} className="car-item">
            <h3>{car.brand} - {car.model}</h3>
            <p>{car.owner}</p>
          </div>
        </Link>
      );
    });
  }

  render() {
    if (this.props.cars.length === 0) {
      return [
        <Aside key="aside" garage={this.props.garage}>
          <Link to="/cars/new">Add a car</Link>
        </Aside>,
        <div className="no-car" key="nocar">No car yet</div>
      ];
    }

    return [
      <Aside key="aside" garage={this.props.garage}>
        <Link to="/cars/new">Add a car</Link>
      </Aside>,
      <div>
        <div className="first-row">
          <h3>{this.props.garage}</h3>
          <Link className="btn btn-primary btn-cta" to="/cars/new">
            Add a car
          </Link>
        </div>
        {this.renderCars()}
      </div>
    ];
  }
}

function mapStateToProps(state) {
  return { cars: state.cars, garage: state.garage };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCars }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsIndex);
