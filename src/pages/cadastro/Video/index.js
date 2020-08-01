/* eslint-disable linebreak-style */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import useForm from '../../../hooks/useForm';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';
import './video.css';

function validate(values, categoria) {
  const errors = {};
  if (values.titulo.length === 0) {
    errors.titulo = '*Por favor, insira um titulo valido';
  }
  if (values.url.length === 0) {
    errors.url = '*Por favor, insira uma url valida';
  } else if (!values.url.includes('https://www.youtube.com/watch')) {
    errors.url = '*O sistema aceita apenas links de videos do youtube';
  }
  if (values.categoria.length === 0) {
    errors.categoria = '*Por favor, insira uma categoria valida';
  } else if (categoria === undefined) {
    errors.categoria = '*A categoria digitada nao esta cadastrada no sistema';
  }
  return errors;
}
function CadastroVideo() {
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const categoryTitles = categorias.map(({ titulo }) => titulo);
  const { funcaoHandle, values } = useForm({
    titulo: '',
    url: '',
    categoria: '',
  });
  useEffect(() => {
    categoriasRepository
      .getAll()
      .then((categoriasFromServer) => {
        setCategorias(categoriasFromServer);
      });
  }, []);
  return (
    <PageDefault>
      <h1>Cadastro de Video</h1>
      <form onSubmit={(event) => {
        event.preventDefault();
        const change = categorias.find((categoria) => (categoria.titulo === values.categoria));
        setErrors(validate(values, change));
        if (errors.length === 0) {
          videosRepository.create({
            titulo: values.titulo,
            url: values.url,
            categoriaId: change.id,
          })
            .then(() => {
              history.push('/');
            });
        }
      }}
      >
        {errors.titulo && <span className="formField_error">{errors.titulo}</span>}
        <FormField
          label="Nome do Video"
          name="titulo"
          value={values.titulo}
          onChange={funcaoHandle}
        />
        {errors.url && <span className="formField_error">{errors.url}</span>}
        <FormField
          label="URL"
          name="url"
          value={values.url}
          onChange={funcaoHandle}
        />
        {errors.categoria && <span className="formField_error">{errors.categoria}</span>}
        <FormField
          label="Categoria"
          name="categoria"
          value={values.categoria}
          onChange={funcaoHandle}
          suggestions={categoryTitles}
        />
        <Button className="buttonCadastrar" type="submit">
          Cadastrar
        </Button>
      </form>
      <Button as={Link} className="buttonCadastrarCategoria" to="/cadastro/categoria">
        Cadastrar Categoria
      </Button>
    </PageDefault>
  );
}

export default CadastroVideo;
