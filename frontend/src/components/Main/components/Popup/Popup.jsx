import IconDesktop from '../../../../images/close-icon-desktop.png';
import IconMobile from '../../../../images/close-icon-mobile.png';

export default function Popup({
    children, 
    onClose,
    containerClassName = '',
  }) {
    return(
        <div className='popup popup_opened'>
      <div className={`popup__container ${containerClassName}`}>
        <button type='button' className='popup__close-button' onClick={onClose}>
          <img
            src={IconDesktop}
            alt='Ícono para cerrar la ventana'
            className='popup__close-icon popup__icon-desktop'
          />
    
          <img
            src={IconMobile}
            alt='Ícono para cerrar la ventana'
            className='popup__close-icon popup__icon-mobile'
          />
        </button>
        {children}
      </div>
    </div>
    );
}