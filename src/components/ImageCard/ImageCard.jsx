import css from "./ImageCard.module.css";

export function ImageCard({ image }) {
  return (
    <>
      <img src={image.urls.small} alt={image.alt_description} />
    </>
  );
}
