import axios from "axios";

const BASE_URL = "https://api.unsplash.com/";
const ACCESS_KEY = "htHmJTmDvq4yw5iVKZkZcxt3fjSTH0D2qyk5r9U7lbw";

export async function fetchImages(query, page) {
  const response = await axios(BASE_URL + "search/photos/", {
    params: { client_id: ACCESS_KEY, query: query, page: page, per_page: 12 },
  });
  return response.data;
}

export async function fetchRandomImages() {
  const response = await axios(BASE_URL + "photos/random/", {
    params: { client_id: ACCESS_KEY, count: 12 },
  });
  return response.data;
}
