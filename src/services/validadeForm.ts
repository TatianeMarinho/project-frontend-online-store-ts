const validateForm = (formState: any) => {
  const newErrors: any = {};

  if (!formState.fullName && formState.fullName.length < 3) {
    newErrors.fullName = 'Por favor, informe o nome completo.';
  }
  if (!formState.cpf) {
    newErrors.cpf = 'Por favor, informe o CPF.';
  } else if (!/^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/.test(formState.cpf)) {
    newErrors.cpf = 'CPF inválido.';
  }
  if (!formState.email) {
    newErrors.email = 'Por favor, informe o email.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
    newErrors.email = 'Email inválido.';
  }
  if (!formState.phone) {
    newErrors.phone = 'Por favor, informe o telefone.';
  } else if (!/^\(?\d{2}\)?[-.\s]?\d{4,5}[-.\s]?\d{4}$/.test(formState.phone)) {
    newErrors.phone = 'Telefone inválido.';
  }
  if (!formState.cep) {
    newErrors.cep = 'Por favor, informe o CEP.';
  } else if (/^\d{5}-\d{3}$/.test(formState.cep)) {
    newErrors.cep = 'CEP inválido.';
  }
  if (!formState.address) {
    newErrors.address = 'Por favor, informe o endereço.';
  }
  // if (!formState.number) {
  //   newErrors.number = 'Por favor, informe o número.';
  // }
  // if (!formState.city) {
  //   newErrors.city = 'Por favor, informe a cidade.';
  // }
  // if (!formState.state) {
  //   newErrors.state = 'Por favor, selecione o estado.';
  // }
  if (!formState.paymentMethod) {
    newErrors.paymentMethod = 'Selecione um método de pagamento';
  }
  return newErrors;
};

export default validateForm;
