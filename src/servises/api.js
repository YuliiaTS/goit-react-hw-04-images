export const fetchImg = async (imgName, page) => {
  const response = await fetch(
    `https://pixabay.com/api/?q=${imgName}&page=${page}&key=28165538-7e7426cdce48f868d39c42e82&image_type=photo&orientation=horizontal&per_page=12`
  );
  if (response.ok) {
    return response.json();
  }
  return await Promise.reject(new Error(`Not found ${imgName}`));
};