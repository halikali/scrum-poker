import './_modal.scss'

interface IModalProps {
  children: React.ReactNode
}

const Modal: React.FC<IModalProps> = ({ children }) => {
  return (
    <div className="modal">
      <div className="modal__content">{children}</div>
    </div>
  )
}

export default Modal
