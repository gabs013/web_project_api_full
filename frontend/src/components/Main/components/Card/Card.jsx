import { useContext } from 'react';
import CurrentUserContext from '../../../../contexts/CurrentUserContext';
import Trash from '../../../../images/trash-normal.svg';
import Like from '../../../../images/Vector.svg';
import ActiveLike from '../../../../images/Union.png';

export default function Card({
  card,
  link, 
  name, 
  isLiked=false, 
  onCardLike,
  onCardDelete,
  onImageClick,
}){

  const { currentUser } = useContext(CurrentUserContext);

  const ownerId =
    typeof card.owner === 'string' ? card.owner : card.owner?._id;

  const isOwn = ownerId === currentUser._id;

  {/*Botón de like*/}
  const likeClassName=`gallery__icon gallery__like-button ${
    isLiked ? 'gallery__like-button--active' : ''
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return(
    <div className='gallery__photo'>

      {isOwn && (
        <button
          type='button'
          className='gallery__trash-button'
          onClick={handleDeleteClick}
          aria-label='Eliminar tarjeta'
        >
          <img
            src={Trash}
            alt=''
            className='gallery__trash-icon'
          />
        </button>
      )}  

        <img 
          src={link} 
          alt={name} 
          className='gallery__about-places' 
          onClick={onImageClick}
        />
        <div className='gallery__footer'>
          <h3 className='gallery__name-place gallery__text-ellipsis'>
            {name}
          </h3>

          <button
            type='button'
            className={likeClassName}
            aria-label='Botón en forma de corazón'
            onClick={handleLikeClick}
          >
            <img
              src={isLiked ? ActiveLike : Like}
              alt=''
              className='gallery__like-icon'
            />
          </button>
        </div>
    </div>
  );
}