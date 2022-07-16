import './modal.css';
import { useMediaQuery } from 'react-responsive'

const Modal = ({ handleClose, show, children, isCreate }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const isMobile = useMediaQuery({ query: '(max-width: 1000px)' });
  const isShort = useMediaQuery({ query: '(max-height: 600px)' });
  return (
    <div className={showHideClassName}>
      <section className="modal-main" style={{ width: isMobile ? '80%' : '40%',height: isShort ? '70%' : '40%', border: isCreate ? '1px solid rgb(255, 0, 106)' : '1px solid  rgba(0,212,255,1)' }}>
        {children}
        <button type="button" className='closeButton' onClick={handleClose}>
          &#10006;
        </button>
      </section>
    </div>
  );
};

export default Modal