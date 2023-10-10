export const useImageUrl = (path) => {
    const baseUrl = 'https://image.tmdb.org/t/p/original';
    const imageUrl = `${baseUrl}${path}`;

    return imageUrl;
  };