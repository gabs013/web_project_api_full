import { useContext } from 'react';
import Card from './components/Card/Card';
import Popup from './components/Popup/Popup';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import editButtonPerfil from '../../images/edit-button.png';
import addButtonDesktop from '../../images/add-button-desktop.png';
import addButtonMobile from '../../images/add-button-mobile.png';

export default function Main({ 

  cards,
  onCardLike,
  onCardDelete,
  onEditProfile,
  onEditAvatar,
  onAddCard,
  onImageClick,
  popup,
  onClosePopup,

}) {

  const {currentUser} = useContext(CurrentUserContext);

  return(
    <>
    <main className='content'>
      <section className='main__content'>
        <div className='main__left'>
          {/*Avatar con overlay*/}
          <button
            type='button' 
            className='main__image-container'
            onClick={onEditAvatar}
            aria-label='Editar foto de perfil'
          >
            <img
              src={currentUser.avatar}
              alt='Fotografía de la autora de esta página: Gabriela Arroyo'
              className='main__image'
            />
            <span className='main__image-overlay'>
              <span className='main__edit-avatar-icon'/>
            </span>
          </button>

          <div className='main__info'>
            <div className='main__profile'>
              <h1 className='main__name'>{currentUser.name}</h1>
              <button
                type='button'
                className='main__edit-button'
                onClick={onEditProfile}
                aria-label='Editar Información del perfil'
              >
                <img
                  src={editButtonPerfil}
                  alt=''
                  className='main__edit-icon'
                />
              </button>
            </div>
              
            <span className='main__description'>{currentUser.about}</span>
          </div>
        </div>

        <button
          type='button'
          className='main__add-button-desktop main__create-button'
          onClick={onAddCard}
          aria-label='Agregar una nueva tarjeta'
        >
          <img
            src={addButtonDesktop}
            alt=''
            className='main__add-icon'
          />
        </button>

        <button
          type='button' 
          className='main__add-button-mobile main__create-button'  
          onClick={onAddCard}
          aria-label='Agregar una nueva tarjeta'       
        >
          <img
            src={addButtonMobile}
            alt=''
            className='main__add-icon'
          />
        </button>
      </section>

      <section className='gallery'>
        {/*Aquí se insertan las tarjetas*/}
        <div className='gallery__photos'>
          {cards.map((item) => (
            <Card 
              key={item._id} 
              card={item}
              name={item.name} 
              link={item.link} 
              isLiked={item.likes?.includes(currentUser._id) ?? false}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              onImageClick={() => onImageClick(item)} 
            />  
          ))}
        </div>
      </section>
    </main>

    {popup && (
      <Popup 
        onClose={onClosePopup}
        containerClassName={popup.containerClassName}
      >
        {popup.children}
      </Popup>
    )}
    </>
  );
}