import { BASE_URL } from './config';
function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(new Error('Error: ' + response.status));
}

export function register({ email, password }) {
  return fetch(BASE_URL + '/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(checkResponse);
}

export function authorize({ email, password }) {
  return fetch(BASE_URL + '/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(checkResponse);
}

export function checkToken(token) {
  return fetch(BASE_URL + '/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  }).then(checkResponse);
}
