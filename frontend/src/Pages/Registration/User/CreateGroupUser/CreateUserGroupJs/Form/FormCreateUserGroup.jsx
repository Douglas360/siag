import React, { useState } from 'react';
import { Card, CardBody, Col, Form, Input, Label, Row, FormFeedback, Button, FormGroup, Spinner, ListGroupItem } from 'reactstrap';
import { useRegister } from '../../../../../../context/RegisterContext/useRegister';

const FormCreateUserGroup = () => {
  const [nameError, setNameError] = useState(false);

  const { createUserGroup, loading } = useRegister();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const value = Object.fromEntries(form.entries());



    const data = {
      nome_grupo: value.nome_grupo,
      descricao_grupo: value.descricao_grupo,
      roles: value.roles,
    };
    createUserGroup(data);
  };

  const handleNameBlur = (event) => {
    const { value } = event.target;
    // Check if the "nome_grupo" field has a size smaller or equal to 5
    if (value.length <= 1) {
      setNameError(true); // Set the error state to true
    } else {
      setNameError(false); // Set the error state to false if the validation passes
    }
  };

  return (
    <Card className="main-card mb-3">
      <CardBody>
        {loading &&
          <div className="text-center"><Spinner color="primary" /></div>}


        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={5}>
              <Label for="nome_grupo">Nome</Label>
              <Input
                required
                type="text"
                name="nome_grupo"
                placeholder="Nome do Grupo de Usuário"
                onBlur={handleNameBlur}
                invalid={nameError}
                valid={!nameError}
              />
              <FormFeedback>
                {nameError && "Nome do grupo é obrigatório e deve ter mais de 2 caracteres"}
              </FormFeedback>
            </Col>
            <Col md={5}>
              <Label for="descricao_grupo">Descrição</Label>
              <Input
                type="text"
                name="descricao_grupo"
                placeholder="Descrição do Grupo de Usuário"
              />
            </Col>
            <Col md={2}>
              <Button color="primary" className="mt-4" block outline type="submit">
                Salvar Grupo
              </Button>
            </Col>
          </Row>
        </Form>


      </CardBody>
    </Card>
  );
};

export default FormCreateUserGroup;
