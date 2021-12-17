const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '24011643-a99499b85595b827654661749';

export default async function apiService(query, page) {
  const searchParams = new URLSearchParams({
    q: query,
    page: page,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: '12',
  });

  const apiFetch = await fetch(`${BASE_URL}?${searchParams}`);
  const response = await apiFetch.json();
  const { hits } = response;
  return hits;
}
