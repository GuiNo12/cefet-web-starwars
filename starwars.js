// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.dev/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução

const API_ENDPOINT = 'https://swapi.dev/api'
import { play } from './music.js'
import { restartAnimation } from './restart-animation.js'

//Player de Música
play({
    audioUrl: './audio/tema-SW.mp3',
    coverImageUrl: './imgs/logo.svg',
    title: 'Intro Star Wars',
    artist: 'John Williams'
}, document.body);

//função para Colocar número dos filmes em número Romano
function numParaRomano(filme) {
    switch (filme.episode_id) {
        case 1: return `Episode I   - ${filme.title}`; break;
        case 2: return `Episode II  - ${filme.title}`; break;
        case 3: return `Episode III - ${filme.title}`; break;
        case 4: return `Episode IV  - ${filme.title}`; break;
        case 5: return `Episode V   - ${filme.title}`; break;
        case 6: return `Episode IV  - ${filme.title}`; break;
    }
}

let filmes;
//função para fazer fatch dos filmes
async function fetchFilmes() {
    let resposta = await fetch(`${API_ENDPOINT}/films/`);
    filmes = await resposta.json();
}

//Salvar os filmes no LocalStorage
let cacheFilmes = localStorage.getItem('filmes');
if (cacheFilmes) {
    filmes = JSON.parse(cacheFilmes);
}
else {
    await fetchFilmes();
    localStorage.setItem('filmes', JSON.stringify(filmes));
}

//ordenar os filmes por ordem crescente
filmes.results.sort((a, b) => a.episode_id - b.episode_id);

//Criar li para cada filme e adicionar no HTML
filmes.results.forEach(filme => {
    const filmeEl = document.getElementById('filmes');
    let li = document.createElement('li');  

    li.innerHTML = `${numParaRomano(filme)}`;  

    li.addEventListener('click', () => {
        let introEl = document.querySelector('pre');
        restartAnimation(introEl);

        introEl.innerHTML = `
            <h1>${filme.title}</h1>
            ${filme.opening_crawl}`;
    });

    filmeEl.appendChild(li);
});