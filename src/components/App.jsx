import { useEffect, useState } from "react";

import "./App.css";
import SearchBar from "./SearchBar/SearchBar";
import { fetchImages, fetchRandomImages } from "../api/search-api";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { PropagateLoader } from "react-spinners";
import { ErrorMessage } from "./ErrorMessage/ErrorMessage";
import { ImageModal } from "./ImageModal/ImageModal";
import { LoadMoreBtn } from "./LoadMoreBtn/LoadMoreBtn";

import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const onSubmit = (q) => {
    if (q === query) {
      return;
    }
    async function getImages(q) {
      try {
        setPage(1);
        setIsError(false);
        setIsLoading(true);
        setQuery(q);
        setImages([]);
        const res = await fetchImages(q, 1);
        setTotalPages(res.total_pages);
        setImages(res.results);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getImages(q);
  };

  const openModalImage = (image) => {
    document.body.style.overflow = "hidden";
    setIsModalOpen(true);
    setModalData(image);
  };

  const closeModalImage = () => {
    document.body.style.overflow = "visible";
    setIsModalOpen(false);
    setModalData({});
  };

  useEffect(() => {
    async function getRandomImages() {
      try {
        setImages([]);
        setIsError(false);
        setIsLoading(true);
        const res = await fetchRandomImages();
        setImages(res);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getRandomImages();
  }, []);

  const handleLoadMore = () => {
    setPage(page + 1);
    async function getImages() {
      try {
        setIsError(false);
        setIsLoading(true);
        const res = await fetchImages(query, page + 1);
        setImages((prevImgs) => [...prevImgs, ...res.results]);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getImages();
  };

  const isLastPage = page === totalPages;

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      {!isError ? (
        images.length > 0 && (
          <ImageGallery images={images} onClickImage={openModalImage} />
        )
      ) : (
        <ErrorMessage message={"Something went wrong..."} />
      )}
      {!isLastPage && query !== "" && <LoadMoreBtn onClick={handleLoadMore} />}
      {isLoading && <PropagateLoader color="#9a9a9a" loading size={25} />}
      {isModalOpen && (
        <ImageModal
          image={modalData}
          isClose={closeModalImage}
          isOpen={isModalOpen}
        />
      )}
    </>
  );
}

export default App;
