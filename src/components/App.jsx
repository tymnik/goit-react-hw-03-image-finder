import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const App = () => {
  const apiKey = '39819981-fb7a960ba48529567676f3c81';
  const perPage = 12;

  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          `https://pixabay.com/api/?q=${searchTerm}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`
        );

        if (!response.ok) {
          throw new Error('Error fetching images from Pixabay API');
        }

        const data = await response.json();
        const newImages = data.hits.map(hit => ({
          id: hit.id,
          webformatURL: hit.webformatURL,
          largeImageURL: hit.largeImageURL,
        }));

        setImages(prevImages => [...prevImages, ...newImages]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchTerm !== '') {
      setPage(1);
      setImages([]);
      fetchImages();
    }
  }, [searchTerm, page]);

  const handleSearchSubmit = newSearchTerm => {
    setSearchTerm(newSearchTerm);
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = image => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} openModal={openModal} />
      <Button onClick={loadMoreImages} isVisible={images.length > 0} />
      {isLoading && <Loader />}
      {selectedImage && (
        <Modal
          imageUrl={selectedImage.largeImageURL}
          altText={selectedImage.id}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default App;