/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import repositoryCategoria from '../../../repositories/categorias';
import './categoria.css';

function CadastroCategoria() {
  const valoresIniciais = {
    titulo: '',
    descricao: '',
    cor: '',
    link_extra: {
      text: '',
      url: '',
    },
  };
  const { funcaoHandle, values, clearForm } = useForm(valoresIniciais);
  const [categorias, setCategorias] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const URL_CATEGORIAS = window.location.hostname.includes('localhost')
      ? 'http://localhost:8080/categorias'
      : 'https://nobertoflix.herokuapp.com/categorias';
    fetch(URL_CATEGORIAS).then(async (respostaDoServidor) => {
      const resposta = await respostaDoServidor.json();
      setCategorias([
        ...resposta,
      ]);
    });
  }, []);
  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {values.titulo}
      </h1>
      <form onSubmit={function handleSubmit(infoEvent) {
        infoEvent.preventDefault();
        repositoryCategoria.create(values)
          .then(() => {
            history.push('/');
          });
        clearForm();
      }}
      >

        <FormField
          label="Nome da Categoria"
          name="titulo"
          type="text"
          value={values.titulo}
          onChange={funcaoHandle}
        />

        <FormField

          label="Descrição"
          name="descricao"
          type="textarea"
          value={values.descricao}
          onChange={funcaoHandle}
        />

        <FormField
          label="Cor"
          name="cor"
          type="color"
          value={values.cor}
          onChange={funcaoHandle}
        />
        <FormField
          label="Texto Link extra"
          name="linkText"
          value={values.link_extra.text}
          onChange={funcaoHandle}
        />
        <FormField
          label="Link extra"
          name="link"
          value={values.link_extra.url}
          onChange={funcaoHandle}
        />
        <Button className="botaoCadastrar">
          Cadastrar
        </Button>
      </form>
      <Button className="botaoHome" as={Link} to="/">
        Ir para home
      </Button>
      {categorias.length === 0 && (
      <div>
        Carregando...
      </div>
      )}
      <table className="tabela">
        <th className="id">
          Id
        </th>
        <th className="titulo">
          Titulo
        </th>
        <th className="cor">
          Cor
        </th>
        <th className="textoLink">
          Texto Link Extra
        </th>
        <th className="link">
          Link Extra
        </th>
        {categorias.map((categoria) => (
          <tr>
            <td className="id">
              {categoria.id}
            </td>
            <td className="titulo">
              {categoria.titulo}
            </td>
            <td className="cor">
              {categoria.cor}
            </td>
            <td className="textoLink">
              {categoria.link_extra.text}
            </td>
            <td className="link">
              {categoria.link_extra.url}
            </td>
          </tr>
        ))}
      </table>
    </PageDefault>
  );
}

export default CadastroCategoria;
