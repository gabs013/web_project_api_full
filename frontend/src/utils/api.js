import { BASE_URL } from './config';

class Api {
  constructor({ baseUrl }) {
  this._baseUrl = baseUrl;
}

get _headers() {
  return {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json',
  };
}

  //Método privado para verificar la respuesta
  _checkResponse(res) {
    if (res.ok) {
    return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  //Obtiene información del usuario
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //Obtiene el array inicial de tarjetas
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //Edita el perfil
  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then(this._checkResponse);
  }

  //Agrega una nueva tarjeta
  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then(this._checkResponse);
  }

  //Elimina una tarjeta
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //Da "like" a una tarjeta
  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //Quita "like" a una tarjeta
  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //Actualiza la foto de perfil
  updateUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then(this._checkResponse);
  }
}

// Instancio de la API (¡Uso de mi Token!)
const api = new Api({
  baseUrl: BASE_URL,
});

export default api;