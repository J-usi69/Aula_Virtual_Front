import { FaTimes } from "react-icons/fa";

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-2xl shadow-2xl relative w-full max-w-md mx-4">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 transition text-xl"
        >
          <FaTimes />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

