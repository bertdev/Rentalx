## Carros
---

### Cadastro de carro 
**RF**
- [x] Deve ser possível cadastrar um novo carro.

**RN**
- [x] Somente usuários com status de administrador podem cadastrar um novo carro.
- [x] Não deve ser possível cadastrar um novo carro com uma placa já existente.
- [x] O carro deve ser cadastrado por padrão com status de disponível.  

### Listagem de Carros 
**RF** 
- [x] Deve ser possível listar todos os carros com status de disponível. 
- [x] Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- [x] Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- [x] Deve ser possível listar todos os carros disponíveis pelo nome.

**RN** 
- [x] O usuário não precisa estar autenticado para ter acesso a listagem de carros.

### Cadastro de especificação do carro
**RF** 
- [x] Deve ser possível cadastrar uma especificação para um carro.

**RN** 
- [x] Somente usuários com status de administrador podem cadastrar uma nova especificação.
- [x] Não deve ser possível cadastrar uma especificação para um carro não cadastrado. 
- [x] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro. 

### Cadastro de imagens do carro 
**RF**
- [ ] Deve ser possível cadastrar imagens do carro.
- [ ] Deve ser possível listar todos os carros

**RNF**
- [ ] Utilizar multer para upload de arquivos.

**RN** 
- [ ] Somente usuários com o status de administrador podem cadastrar uma imagem de um carro.
- [ ] O usuário deve poder cadastrar mais de uma imagem para o carro.

### Aluguel de carro
**RF** 
- [ ] Deve ser possível cadastrar um aluguel.

**RN** 
- [ ] O aluguel deve ter duração miníma de 24 horas.
- [ ] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- [ ] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro. 

>Requisitos funcionais (RF)
Requisitos não funcionais (RNF)
Regras de negócio (RN)
