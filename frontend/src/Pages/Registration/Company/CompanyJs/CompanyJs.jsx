import React from 'react'
import { Button, Card, CardBody, Col, Form, Input, Label, Row, Spinner } from 'reactstrap'

import { useAuth } from '../../../../context/AuthContext/useAuth'
import { useRegister } from '../../../../context/RegisterContext/useRegister'


const CompanyJs = () => {
    const { user } = useAuth()
    const { updateCompany, loading } = useRegister()


    const handleSubmit = (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        const values = Object.fromEntries(form.entries());
        updateCompany(values);

        const updatedUserData = {
            ...user,
            empresa: {
                ...user.empresa,
                ...values,
            },

        };


        sessionStorage.setItem('user', JSON.stringify(updatedUserData));

    };


    return (
        <Card className="main-card mb-3">
            <CardBody>
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center">
                        <Spinner color="primary" />
                    </div>
                ) : (
                    <Form onSubmit={handleSubmit} >
                        <Row>
                            <Col md={1}>
                                <Label for="id">ID</Label>
                                <Input
                                    type="text"
                                    name="id_empresa"
                                    placeholder="Nome Fantasia"
                                    defaultValue={user.empresa.id_empresa}
                                />
                            </Col>

                            <Col md={6}>
                                <Label for="razaoSocial">Razão Social</Label>
                                <Input
                                    type="text"
                                    name="nome"
                                    placeholder="Razão Social"
                                    defaultValue={user.empresa.nome}
                                />
                            </Col>


                            <Col md={5}>
                                <Label for="telefone">Telefone</Label>
                                <Input
                                    type="text"
                                    name="telefone"
                                    placeholder="Telefone"
                                    defaultValue={user.empresa.telefone}
                                />
                            </Col>
                            <Col md={2}>
                                <Label for="telefone">CNPJ</Label>
                                <Input
                                    type="text"
                                    name="cnpj"
                                    placeholder="CNPJ"
                                    defaultValue={user.empresa.cnpj}

                                />
                            </Col>
                            <Col md={5}>
                                <Label for="email">E-mail</Label>
                                <Input
                                    type="text"
                                    name="email"
                                    placeholder="E-mail"
                                    defaultValue={user.empresa.email}
                                />
                            </Col>
                            <Col md={5}>
                                <Label for="endereceo">Endereco</Label>
                                <Input
                                    type="text"
                                    name="endereco"
                                    placeholder="Inscrição Estadual"
                                    defaultValue={user.empresa.endereco}
                                />
                            </Col>


                        </Row>
                        <div className="d-block text-center card-footer">
                            <Button color="primary" className="ml-auto" type='submit' outline>Salvar</Button>
                        </div>

                    </Form>
                )
                }


            </CardBody>

        </Card>

    )
}

export default CompanyJs