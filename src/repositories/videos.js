/* eslint-disable linebreak-style */
import config from '../config';

const VIDEOS_URL = `${config.URL_BACKEND}/videos`;
function create(objetoDoVideo) {
  return fetch(`${VIDEOS_URL}?_embed=videos`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(objetoDoVideo),
  })
    .then(async (respostaServidor) => {
      if (respostaServidor.ok) {
        const resposta = await respostaServidor.json();
        return resposta;
      }
      throw new Error('Não foi possível cadastrar os dados :( ');
    });
}
export default {
  create,
};
