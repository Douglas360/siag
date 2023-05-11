import React, { useState } from 'react';
import { Card, CardBody, Col, Form, Input, Label, Row, FormFeedback, Button, FormGroup } from 'reactstrap';

const FormCreateProfile = () => {
  const [nameError, setNameError] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedSubroles, setSelectedSubroles] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const values = Object.fromEntries(form.entries());

    // Include the selected roles in the values object
    values.roles = selectedSubroles;

    console.log(values);
    // createProfile(values);
  };

  const handleNameBlur = (event) => {
    const { value } = event.target;
    // Check if the "nome_perfil" field has a size smaller or equal to 5
    if (value.length <= 1) {
      setNameError(true); // Set the error state to true
    } else {
      setNameError(false); // Set the error state to false if the validation passes
    }
  };

  // Create a list of roles with subroles to be selected by the user in the form of checkboxes
  const roles = [
    {
      id: 1,
      name: 'Cadastro',
      subroles: [
        {
          id: 10,
          name: 'Perfil de Usuário',
          
         
        },
        {
          id: 20,
          name: 'Usuário',
        },
        {
          id: 30,
          name: 'Empresa',
        },
      ],
    },
    {
      id: 2,
      name: 'Financeiro',
      subroles: [
        {
          id: 11,
          name: 'Contas a Pagar',
        },
        {
          id: 21,
          name: 'Contas a Receber',
        },
        {
          id: 31,
          name: 'Fluxo de Caixa',
        },
      ],
    },
    {
      id: 2,
      name: 'Administrativo',
      subroles: [
        {
          id: 11,
          name: 'Modelo de Documentos',
        },
        {
          id: 21,
          name: 'Agenda',
        },
        {
          id: 31,
          name: 'Relatorios',
        },
        {
          id: 32,
          name: 'Documentos Oficiais',
        }
      ],
    },
  ];

  const handleRoleChange = (event) => {
    const { name, checked } = event.target;
  
    if (checked) {
      const role = roles.find((role) => role.name === name);
  
      if (role) {
        const subroleNames = role.subroles.map((subrole) => subrole.name);
        setSelectedRoles((prevRoles) => [...prevRoles, ...subroleNames]);
        setSelectedSubroles((prevSubroles) => [...prevSubroles, ...role.subroles]);
      }
  
      setSelectedRoles((prevRoles) => [...prevRoles, name]);
    } else {
      const role = roles.find((role) => role.name === name);
  
      if (role) {
        const subroleNames = role.subroles.map((subrole) => subrole.name);
        setSelectedRoles((prevRoles) =>
          prevRoles.filter((role) => !subroleNames.includes(role))
        );
        setSelectedSubroles((prevSubroles) =>
          prevSubroles.filter((subrole) => !subroleNames.includes(subrole.name))
        );
      }
  
      setSelectedRoles((prevRoles) => prevRoles.filter((role) => role !== name));
      setSelectedSubroles((prevSubroles) =>
        prevSubroles.filter((subrole) => subrole.name !== name)
      );
    }
  };

  const renderSubroles = (role) => {
    if (!selectedRoles.includes(role.name)) {
      return null;
    }
  
    return role.subroles.map((subrole) => (
      <FormGroup check key={subrole.id}>
        <Label check style={{ marginLeft: '1rem' }}>
          <Input
            type="checkbox"
            name={subrole.name}
            checked={selectedRoles.includes(subrole.name)}
            onChange={handleRoleChange}
          />{' '}
          {subrole.name}
        </Label>
      </FormGroup>
    ));
  };

  return (
    <Card className="main-card mb-3">
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={5}>
              <Label for="nome_perfil">Nome</Label>
              <Input
                required
                type="text"
                name="nome_perfil"
                placeholder="Nome do Perfil"
                onBlur={handleNameBlur}
                invalid={nameError}
                valid={!nameError}
              />
              <FormFeedback>
                {nameError && "Nome do perfil é obrigatório e deve ter mais de 2 caracteres"}
              </FormFeedback>
            </Col>
            <Col md={5}>
              <Label for="descricao_perfil">Descrição</Label>
              <Input
                type="text"
                name="descricao_perfil"
                placeholder="Descrição do Perfil"
              />
            </Col>
            <Col md={2}>
              <Button color="primary" className="mt-4" block outline type="submit">
                Salvar Perfil
              </Button>
            </Col>
          </Row>
        </Form>

        {/* Select roles */}
        <Row className="mt-4">
          <Col md={12}>
            <Label>Selecione as permissões</Label>

            {roles.map((role) => (
              <FormGroup key={role.id}>
                <Label check>
                  <Input
                    type="checkbox"
                    name={role.name}
                    checked={selectedRoles.includes(role.name)}
                    onChange={handleRoleChange}
                  />{' '}
                  {role.name}
                </Label>

                {renderSubroles(role)}

              </FormGroup>
            ))}
          </Col>
        </Row>

      </CardBody>
    </Card>
  );
};

export default FormCreateProfile;
