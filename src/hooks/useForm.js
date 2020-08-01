/* eslint-disable linebreak-style */
import { useState } from 'react';

function useForm(valoresIniciais) {
  const [values, setValues] = useState(valoresIniciais);
  function setValue(chave, valor) {
    if (chave === 'link') {
      setValues({
        ...values,
        link_extra: {
          url: valor,
          text: values.link_extra.text,
        },
      });
    } else if (chave === 'linkText') {
      setValues({
        ...values,
        link_extra: {
          url: values.link_extra.url,
          text: valor,
        },
      });
    } else {
      setValues({
        ...values,
        [chave]: valor,
      });
    }
  }
  function funcaoHandle(infoEvent) {
    setValue(
      infoEvent.target.getAttribute('name'),
      infoEvent.target.value,
    );
  }
  function clearForm() {
    setValues(valoresIniciais);
  }
  return {
    values,
    clearForm,
    funcaoHandle,
  };
}
export default useForm;
