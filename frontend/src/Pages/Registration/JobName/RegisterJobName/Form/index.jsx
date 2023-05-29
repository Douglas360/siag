import React, { useState } from 'react';
import { Card, CardBody, Col, Form, Input, Label, Row, FormFeedback, Button, Spinner, } from 'reactstrap';
import { useRegister } from '../../../../../context/RegisterContext/useRegister';
import { useAuth } from '../../../../../context/AuthContext/useAuth';


const CreateJobNameJs = () => {
    const [nameError, setNameError] = useState(false);

    const { createJobName, loading } = useRegister();
    const { user } = useAuth();


    const handleSubmit = (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        const value = Object.fromEntries(form.entries());



        const data = {
            id_empresa: user.empresa?.id_empresa,
            nome_cargo: value.nome_cargo

        };
        createJobName(data);

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
                            <Label for="nome_cargo">Cargo</Label>
                            <Input
                                required
                                type="text"
                                name="nome_cargo"
                                placeholder="Nome do Cargo"
                                onBlur={handleNameBlur}
                                invalid={nameError}
                                valid={!nameError}
                            />
                            <FormFeedback>
                                {nameError && "Nome do cargo é obrigatório e deve ter mais de 2 caracteres"}
                            </FormFeedback>
                        </Col>

                        <Col md={2}>
                            <Button color="primary" className="mt-4" block outline type="submit">
                                Salvar Cargo
                            </Button>
                        </Col>
                    </Row>
                </Form>


            </CardBody>
        </Card>
    );
};

export default CreateJobNameJs;
