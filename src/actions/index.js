const ROOT_URL = `https://wagon-garage-api.herokuapp.com`;

export const FETCH_CARS = 'FETCH_CARS';
export const ADD_CAR = 'ADD_CAR';
export const DELETE_CAR = 'DELETE_CAR';

export function fetchCars(garage) {
  const url = `${ROOT_URL}/${garage}/cars`;
  const promise = fetch(url)
    .then(response => response.json());

  return {
    type: FETCH_CARS,
    payload: promise
  };
}

export function deleteCar(history, car) {
  const url = `https://wagon-garage-api.herokuapp.com/cars/${car}`;
  fetch(url, { method: 'DELETE' })
    .then(response => response.json())
    .then(() => history.push(""));

  return {
    type: DELETE_CAR,
    payload: car
  };
}

export function addCar(garage, body, callback) {
  const url = `${ROOT_URL}/${garage}/cars`;
  const request = fetch((url), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then(callback);

  return {
    type: ADD_CAR,
    payload: request
  };
}
