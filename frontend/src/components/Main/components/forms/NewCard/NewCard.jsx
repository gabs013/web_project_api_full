import { useContext, useState } from 'react';
import CurrentUserContext from '../../../../../contexts/CurrentUserContext';

export default function NewCard(){

  const { handleAddPlaceSubmit } = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleLinkChange(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    handleAddPlaceSubmit({
      name,
      link,
    });
  }

  return(
    <form 
      className='popup__form form' 
      id='form-create-card'
      onSubmit={handleSubmit}
    >
      <h1 className='popup__title'>Nuevo lugar</h1>

      <input
        type='text'
        id='input-card-title'
        className='popup__input'
        name='title'
        minLength='2'
        maxLength='30'
        placeholder='Título'
        required
        value={name}
        onChange={handleNameChange}
      />
      <span className='popup__input-error input-card-title-error'></span>
      <input
        type='url'
        id='input-card-image'
        className='popup__input'
        name='link'
        placeholder='Enlace a la imagen'
        required
        value={link}
        onChange={handleLinkChange}
      />
      <span className='popup__input-error input-card-image-error'></span>
      <button type='submit' className='popup__button popup__submit'>
        Crear
      </button>
    </form>
  );
}