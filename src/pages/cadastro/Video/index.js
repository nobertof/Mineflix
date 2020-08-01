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

function CadastroVideo() {
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
        videosRepository.create({
          titulo: values.titulo,
          url: values.url,
          categoriaId: change.id,
        })
          .then(() => {
            history.push('/');
          });
      }}
      >
        <FormField
          label="Nome do Video"
          name="titulo"
          value={values.titulo}
          onChange={funcaoHandle}
        />
        <FormField
          label="URL"
          name="url"
          value={values.url}
          onChange={funcaoHandle}
        />
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
