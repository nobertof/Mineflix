/* eslint-disable linebreak-style */
import config from '../config';

const CATEGORIAS_URL = `${config.URL_BACKEND}/categorias`;
function create(objetoDaCategoria) {
  return fetch(CATEGORIAS_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(objetoDaCategoria),
  })
    .then(async (respostaServidor) => {
      if (respostaServidor.ok) {
        const resposta = await respostaServidor.json();
        return resposta;
      }
      throw new Error('Não foi possível cadastrar os dados :( ');
    });
}
function getAll() {
  return fetch(`${CATEGORIAS_URL}`)
    .then(async (respostaServidor) => {
      if (respostaServidor.ok) {
        const resposta = await respostaServidor.json();
        return resposta;
      }
      throw new Error('Não foi possível pegar os dados :( ');
    });
}
function getAllWithVideos() {
  return fetch(`${CATEGORIAS_URL}?_embed=videos`)
    .then(async (respostaServidor) => {
      if (respostaServidor.ok) {
        const resposta = await respostaServidor.json();
        return resposta;
      }
      throw new Error('Não foi possível pegar os dados :( ');
    });
}
export default {
  create,
  getAll,
  getAllWithVideos,
};
