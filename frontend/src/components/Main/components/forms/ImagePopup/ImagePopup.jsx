export default function ImagePopup({name, link}){
    return(
        <>
        <img src={link} alt={name} className='popup__image' />
        <p className='popup__image-caption'>{name}</p>
        </>
    )
}