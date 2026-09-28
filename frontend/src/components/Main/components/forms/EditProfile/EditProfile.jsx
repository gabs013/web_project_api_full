import { useContext, useState } from 'react';
import CurrentUserContext from '../../../../../contexts/CurrentUserContext';

export default function EditProfile() {

  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name || '');
  const [description, setDescription] = useState(currentUser.about || '');

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    handleUpdateUser({
      name: name,
      about: description,
    });
  }

  return(
    <form 
      className='popup__form form' 
      id='form-edit-profile' 
      onSubmit={handleSubmit}
    >
      <h1 className='popup__title'>Editar perfil</h1>

      <input
        type='text'
        id='inputName'
        className='popup__input'
        name='name'
        minLength='2'
        maxLength='40'
        placeholder='Nombre'
        required
        value={name}
        onChange={handleNameChange}
      />

      <span className='popup__input-error inputName-error'></span>
          
      <input
        type='text'
        id='inputDescription'
        className='popup__input'
        name='about'
        minLength='2'
        maxLength='200'
        placeholder='Acerca de mí'
        required
        value={description}
        onChange={handleDescriptionChange}
      />

      <span className='popup__input-error inputDescription-error'></span>

      <button type='submit' className='popup__button popup__submit'>
        Guardar
      </button>
    </form>
  );
}