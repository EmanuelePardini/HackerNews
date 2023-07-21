//Import delle variabili necessarie da api.js
import { loadNewsIds, loadNews, NEWS_COUNT } from './api';

//Dichiarazione delle variabili e costanti
const newsContainer = document.getElementById('news-container');
const loadMoreButton = document.getElementById('load-more-button');

let newsIds = [];
let currentIndex = 0;

//Funzione del tasto loadMore per caricare più news
async function loadMoreNews() {
  let nextNewsIds = newsIds.slice(currentIndex, currentIndex + NEWS_COUNT);
  currentIndex += NEWS_COUNT;


  for (const id of nextNewsIds) {
    try {
      const news = await loadNews(id);
      renderNews(news);
    } 
    catch (error) {
      console.error('Error loading news:', error);
    }
  }
}

//Funzione per caricare l'elemento html relativo alla News reperita
function renderNews(news) {
  const newsElement = document.createElement('div');
  newsElement.classList.add('news-item');
  if (news.url) {
    newsElement.innerHTML = `
      <h3><a href="${news.url}" target="_blank">${news.title}</a></h3>
      <p>Published: ${new Date(news.time * 1000).toLocaleDateString()}</p>
    `;
  } else {
    //Gestione dei link mancanti sugli articoli
    newsElement.innerHTML = `
      <h3>${news.title}</h3>
      <p>Published: ${new Date(news.time * 1000).toLocaleDateString()}</p>
      <p>No link available for this news</p>
    `;
  }
  newsContainer.appendChild(newsElement);
}

loadMoreButton.addEventListener('click', loadMoreNews);

//Reperisce tutte le News e carica le prime 10 all'avvio dell'app
async function initApp() {
  try {
    newsIds = await loadNewsIds();
    loadMoreNews(); 
  } catch (error) {
    console.error('Error loading news IDs:', error);
  }
}

initApp();
