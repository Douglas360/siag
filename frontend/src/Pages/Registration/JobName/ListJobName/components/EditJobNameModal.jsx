import { useState } from "react";
import { Button, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

//open modal to UPDATE user group data 
const EditJobNameModal = ({ isOpen, toggleModal, handleUpdate, jobName }) => { 
    const [nameError, setNameError] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        const value = Object.fromEntries(form.entries());

        const data = {
            id_empresa: jobName.id_empresa,
            id_cargo: jobName.id_cargo,
            nome_cargo: value.nome_cargo,

        }
        await handleUpdate(data)
        toggleModal()
    }
    const handleNameBlur = (event) => {
        const { value } = event.target;
        // Check if the "nome_perfil" field has a size smaller or equal to 5
        if (value.length <= 1) {
            setNameError(true); // Set the error state to true
        } else {
            setNameError(false); // Set the error state to false if the validation passes
        }
    }
    return (
        <Modal isOpen={isOpen} toggle={toggleModal}>

            <ModalHeader toggle={toggleModal} className="text-lg font-medium">
                Atualizar cargo
            </ModalHeader>
            <ModalBody className="text-gray-600 mb-6">
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={12} className="mb-4">
                            <Label htmlFor="name" className="mb-2 font-medium">Nome do cargo</Label>
                            <Input
                                required
                                type="text"
                                id="name"
                                name="nome_cargo"
                                placeholder="Nome do cargo"
                                onBlur={handleNameBlur}
                                defaultValue={jobName?.nome_cargo}
                                invalid={nameError}
                                valid={!nameError}
                            />
                            <FormFeedback>
                                {nameError && "Nome do cargo é obrigatório e deve ter mais de 2 caracteres"}
                            </FormFeedback>
                        </Col>
                    </Row>
                    <ModalFooter className="flex justify-end">
                        <Button color="secondary" outline className="mr-2" onClick={toggleModal}>
                            Cancelar
                        </Button>
                        {nameError ? <Button color="primary" disabled>Atualizar</Button> : <Button color="primary" type="submit" outline>Atualizar</Button>}

                    </ModalFooter>
                </Form>
            </ModalBody>


        </Modal>
    );
};

export default EditJobNameModal;

