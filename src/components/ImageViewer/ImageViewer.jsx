import "./ImageViewer.css";

export default function ImageViewer({ image, onClose }) {

  return (
    <div 
      className="image-viewer-overlay"
      onClick={onClose}
    >

      <img
        src={image}
        className="image-viewer-image"
        alt="Imagem ampliada"
        onClick={(e)=>e.stopPropagation()}
      />

      <button
        className="image-viewer-close"
        onClick={onClose}
      >
        ×
      </button>

    </div>
  );
}