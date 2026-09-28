import Popup from '../Main/components/Popup/Popup';

export default function InfoTooltip({
  isOpen,
  onClose,
  isSuccess,
}) {
  if (!isOpen) {
    return null;
  }

  const iconClassName =
    'info-tooltip__icon ' +
    (isSuccess
      ? 'info-tooltip__icon_success'
      : 'info-tooltip__icon_error');

  const message = isSuccess
    ? '¡Correcto! Ya estás registrado.'
    : 'Uy, algo salió mal. Por favor, inténtalo de nuevo.';

  return (
    <Popup
      onClose={onClose}
      containerClassName='popup__container_info'
    >
      <div className='info-tooltip'>
        <div className={iconClassName} aria-hidden='true'>
          {isSuccess ? '✓' : '×'}
        </div>

        <p className='info-tooltip__message'>{message}</p>
      </div>
    </Popup>
  );
}
