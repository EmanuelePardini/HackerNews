//Import librerie e dichiarazione variabili/costanti
import axios from 'axios';

const BASE_URL = process.env.HACKER_NEWS_API_BASE_URL;
const NEWS_COUNT = parseInt(process.env.NEWS_COUNT, 10);

//Reperire Id delle News
async function loadNewsIds() {
  try {
    const response = await axios.get(`${BASE_URL}/newstories.json`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to load news IDs');
  }
}

//Reperire dati delle News attraverso ID
async function loadNews(id) {
  try {
    const response = await axios.get(`${BASE_URL}/item/${id}.json`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to load news with ID ${id}`);
  }
}

//Funzioni e variabili necessarie in index.js
export { loadNewsIds, loadNews, NEWS_COUNT };
