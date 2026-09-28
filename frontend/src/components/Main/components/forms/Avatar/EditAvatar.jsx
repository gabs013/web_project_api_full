import { useContext, useRef } from 'react';
import CurrentUserContext from '../../../../../contexts/CurrentUserContext';

export default function EditAvatar(){

  const { handleUpdateAvatar} = useContext(CurrentUserContext);
  const avatarRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    handleUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return(
    <form 
      className='popup__form form' 
      id='form-edit-avatar' 
      onSubmit={handleSubmit}
    >
      <h1 className='popup__title'>Cambiar foto de perfil</h1>

      <input
        type='url'
        className='popup__input'
        placeholder='Enlace de la imagen'
        required
        ref={avatarRef}
      />
      <span className='popup__input-error input-avatar-link-error'></span>
      <button type='submit' className='popup__button popup__submit'>
        Guardar
      </button>
    </form>
  );
}