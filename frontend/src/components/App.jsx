import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { register, authorize, checkToken, } from '../utils/auth';
import Login from './Login/Login';
import Register from './Register/Register';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Main from './Main/Main';
import EditProfile from './Main/components/forms/EditProfile/EditProfile';
import EditAvatar from './Main/components/forms/Avatar/EditAvatar';
import NewCard from './Main/components/forms/NewCard/NewCard';
import ImagePopup from './Main/components/forms/ImagePopup/ImagePopup';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import InfoTooltip from './InfoTooltip/InfoTooltip';

function App() {

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [popupContent, setPopupContent] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);

  //Efecto para corroborar el token y, en base a eso mantener una sesión abierta.
  useEffect(() => {
  const token = localStorage.getItem('jwt');

  if (!token) {
    return;
  }

  checkToken(token)
    .then((response) => {
      setLoggedIn(true);
      setEmail(response.email);
      navigate('/');
    })
    .catch((error) => {
      console.error(error);
      localStorage.removeItem('jwt');
      setLoggedIn(false);
      setEmail('');
    });
}, [navigate]);

  useEffect(() => {

    if (!loggedIn) {
      return;
    }

    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => {
        console.error(error);
    });
  }, [loggedIn]);

  useEffect(() => {

    if (!loggedIn) {
      return;
    }

    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [loggedIn]);

  const handleUpdateUser = (data) => {
    api
      .editUserInfo(data)
      .then((newData) => {
      setCurrentUser(newData);
      handleClosePopup();
    })
      .catch((error) => {
      console.error(error);
    });
  };


  function handleEditProfileClick() {
    setPopupContent({
      children: <EditProfile/>,
      containerClassName: 'popup__container_send',
    });
  }
  
  function handleEditAvatarClick() {
    setPopupContent({
      children: <EditAvatar/>,
      containerClassName: 'popup__container_send',
    });
  }
  
  function handleAddCardClick() {
    setPopupContent({
      children: <NewCard/>,
      containerClassName: 'popup__container_send',
    });
  }
  
  
  function handleImageClick(card){
    setPopupContent({
      children: (
        <ImagePopup 
          name={card.name} 
          link={card.link}
        />
      ),
      containerClassName: 'popup__container_image',
    });
  }
  
    
  function handleClosePopup() {
    setPopupContent(null);
  }

  const handleUpdateAvatar = (data) => {
    api
      .updateUserAvatar(data)
      .then((newData) => {
      setCurrentUser(newData);
      handleClosePopup();
    })
      .catch((error) => {
      console.error(error);
    });
  };


  async function handleCardLike(card) {
    const isLiked = card.likes?.includes(currentUser._id) ?? false;

      try {
        const newCard = isLiked
          ? await api.removeLike(card._id)
          : await api.addLike(card._id);

        setCards((state) =>
          state.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard
          )
        );
      } catch (error) {
          console.error(error);
        }
  }

  async function handleCardDelete(card) {
    try {
      await api.deleteCard(card._id);

      setCards((state) =>
        state.filter((currentCard) => currentCard._id !== card._id)
      );
    } catch (error) {
      console.error(error);
      }
  }


  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
      setCards((state) => [newCard, ...state]);
      handleClosePopup();
    })
      .catch((error) => {
        console.error(error);
    });
  }

  function handleRegister(data) {
    register(data)
      .then(() => {
        setIsRegistrationSuccessful(true);
        setIsInfoTooltipOpen(true);
      })
      .catch((error) => {
        console.error(error);
        setIsRegistrationSuccessful(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLogin(data) {
    authorize(data)
      .then((response) => {
        localStorage.setItem('jwt', response.token);
      setLoggedIn(true);
      setEmail(data.email);
      navigate('/');
    })
    .catch((error) => {
      console.error(error);
    });
  }

  function handleCloseInfoTooltip() {
    setIsInfoTooltipOpen(false);

    if (isRegistrationSuccessful) {
      navigate('/signin');
    }
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setEmail('');
    setCurrentUser({});
    setCards([]);
    navigate('/signin');
  }

  
  return (
    <CurrentUserContext.Provider 
      value={{
        currentUser, 
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddPlaceSubmit,
      }}>

      <div className='page'>

        <Header
          loggedIn={loggedIn}
          email={email}
          onSignOut={handleSignOut}
        />

        <Routes>

          <Route path='/signin' element={<Login onLogin={handleLogin} />} />

          <Route path='/signup' element={<Register onRegister={handleRegister} />} />

          <Route
            path='/'
            element={
              <ProtectedRoute loggedIn={loggedIn}>
              <>
                <Main
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddCard={handleAddCardClick}
                  onImageClick={handleImageClick}
                  popup={popupContent}
                  onClosePopup={handleClosePopup}
                />

                <Footer/>
              </>
              </ProtectedRoute>
            }
          />    

          <Route
            path='*'
            element={<Navigate to='/signin' replace />}
          />

        </Routes>

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={handleCloseInfoTooltip}
          isSuccess={isRegistrationSuccessful}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
