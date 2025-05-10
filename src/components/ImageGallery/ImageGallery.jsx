import { ImageCard } from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export function ImageGallery({ images, onClickImage }) {
  return (
    <ul className={css.imageList}>
      {images.map((image) => {
        return (
          <li
            key={image.id}
            className={css.imageItem}
            onClick={() => onClickImage(image)}
          >
            <ImageCard image={image} />
          </li>
        );
      })}
    </ul>
  );
}
