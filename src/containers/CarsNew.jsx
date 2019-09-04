import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { addCar } from '../actions';
import Aside from '../components/Aside';

const required = value => (value ? undefined : 'Required');

class CarsNew extends Component {
  onSubmit = (values) => {
    this.props.addCar(this.props.garage, values, (car) => {
      this.props.history.push('/'); // Navigate after submit
      return car;
    });
  }

  renderField(field) {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          className="form-control"
          type={field.type}
          {...field.input}
        />
      </div>
    );
  }

  render() {
    return [
      <Aside key="aside" garage={this.props.garage}>
        <Link to="/">Back to list</Link>
      </Aside>,
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            className="form-control"
            label="Brand"
            name="brand"
            type="text"
            component={this.renderField}
            validate={[required]}
          />
          <Field
            className="form-control"
            label="Model"
            name="model"
            type="text"
            component={this.renderField}
            validate={[required]}
          />
          <Field
            className="form-control"
            label="Owner"
            name="owner"
            type="text"
            component={this.renderField}
            validate={[required]}
          />
          <Field
            className="form-control"
            label="Plate"
            name="plate"
            type="text"
            component={this.renderField}
            validate={[required]}
          />
          <button
            className="btn btn-primary"
            type="submit"
          >
            Add car
          </button>
        </form>
      </div>
    ];
  }
}

function mapStateToProps(state) {
  return {
    garage: state.garage,
  };
}

export default reduxForm({ form: 'newCarForm' })(
  connect(mapStateToProps, { addCar })(CarsNew)
);
