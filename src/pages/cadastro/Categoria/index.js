import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
function CadastroCategoria(){
  const valoresIniciais = {
    nome:'',
    descricao:'',
    cor:'',
  }
  const [categorias,setCategorias] =  useState([]);
  const [values,setValues] = useState(valoresIniciais);
  
  function funcaoHandle(infoEvent){
    setValue(
       infoEvent.target.getAttribute('name')
      ,infoEvent.target.value
    );
  }
  function setValue(chave,valor){
    setValues({
      ...values,
      [chave]:valor,
    })
  }
 
  return (
      <PageDefault>
        <h1>Cadastro de Categoria: {values.nome}</h1>
        <form onSubmit={function handleSubmit(infoEvent){
          infoEvent.preventDefault();
          
          setCategorias([
            ...categorias,
            values
          ]);
          setValues(valoresIniciais);
        }}>

          <FormField
            label="Nome da Categoria"
            name="nome"
            type="text"
            value={values.nome}
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
          <button>
            Cadastrar
          </button>

        </form>
        <ul>
          {categorias.map((categoria,indice)=>{
            return(
              <li key={`${categoria}${indice}`}>
                {categoria.nome}
              </li>
            )
          })}
        </ul>
        <Link to ='/'>
          Ir para home
        </Link>
      </PageDefault>
    )
  }

  export default CadastroCategoria;