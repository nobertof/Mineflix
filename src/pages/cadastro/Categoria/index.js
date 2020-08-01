/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import repositoryCategoria from '../../../repositories/categorias';
import './categoria.css';

function validate(values) {
  const errors = {
    link_extra: {
      text: '',
      url: '',
    },
  };
  if (values.titulo.length === 0) {
    errors.titulo = '*por favor, insira um titulo valido';
  }
  if (values.descricao.length === 0) {
    errors.descricao = '*por favor, insira uma descrição valida';
  }
  if (values.cor.length === 0) {
    errors.cor = '*por favor, insira uma cor valida';
  }
  if (values.link_extra.text.length === 0) {
    errors.link_extra.text = '*por favor, insira um texto de link valido';
  }
  if (values.link_extra.url.length === 0) {
    errors.link_extra.url = '*por favor, insira uma url de link extra valida';
  } else if (!values.link_extra.url.includes('https://www.youtube.com/user')) {
    errors.link_extra.url = '*A url do link extra deve ser referente a um canal do youtube';
  }
  return errors;
}

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
  const [errors, setErrors] = useState({
    link_extra: {
      text: '',
      url: '',
    },
  });
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
        setErrors(validate(values));
        if (errors.length === 0) {
          repositoryCategoria.create(values)
            .then(() => {
              history.push('/');
            });
          clearForm();
        }
      }}
      >
        {errors.titulo && <span className="formField_error">{errors.titulo}</span>}
        <FormField
          label="Nome da Categoria"
          name="titulo"
          type="text"
          value={values.titulo}
          onChange={funcaoHandle}
        />
        {errors.descricao && <span className="formField_error">{errors.descricao}</span>}
        <FormField

          label="Descrição"
          name="descricao"
          type="textarea"
          value={values.descricao}
          onChange={funcaoHandle}
        />
        {errors.cor && <span className="formField_error">{errors.cor}</span>}
        <FormField
          label="Cor"
          name="cor"
          type="color"
          value={values.cor}
          onChange={funcaoHandle}
        />
        {errors.link_extra.text && <span className="formField_error">{errors.link_extra.text}</span>}
        <FormField
          label="Texto Link extra"
          name="linkText"
          value={values.link_extra.text}
          onChange={funcaoHandle}
        />
        {errors.link_extra.url && <span className="formField_error">{errors.link_extra.url}</span>}
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
        <thead>
          <tr>
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
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={`${categoria.id}`}>
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
        </tbody>
      </table>
    </PageDefault>
  );
}

export default CadastroCategoria;
