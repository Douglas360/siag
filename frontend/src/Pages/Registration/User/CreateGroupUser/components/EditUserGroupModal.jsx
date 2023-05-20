import { useState } from "react";
import { Button, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

//open modal to UPDATE user group data 
const EditUserGroupModal = ({ isOpen, toggleModal, handleUpdate, userGroup }) => {
    const [nameError, setNameError] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        const value = Object.fromEntries(form.entries());


        const data = {
            id: userGroup.id_grupo,
            nome_grupo: value.nome_grupo,
            descricao_grupo: value.descricao_grupo,
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
    };

    return (
        <Modal isOpen={isOpen} toggle={toggleModal}>

            <ModalHeader toggle={toggleModal} className="text-lg font-medium">
                Atualizar grupo de usuário
            </ModalHeader>
            <ModalBody className="text-gray-600 mb-6">
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={12} className="mb-4">
                            <Label htmlFor="name" className="mb-2 font-medium">Nome do grupo</Label>
                            <Input
                                required
                                type="text"
                                id="name"
                                name="nome_grupo"
                                placeholder="Nome do grupo"
                                onBlur={handleNameBlur}
                                defaultValue={userGroup?.nome_grupo}
                                invalid={nameError}
                                valid={!nameError}
                            />
                            <FormFeedback>
                                {nameError && "Nome do perfil é obrigatório e deve ter mais de 2 caracteres"}
                            </FormFeedback>
                        </Col>
                        <Col md={12}>
                            <Label className="mb-2 font-medium" htmlFor="description">
                                Descrição
                            </Label>
                            <Input
                                className="border border-gray-300 rounded-md py-2 px-3 text-gray-600"
                                type="text"
                                id="description"
                                name="descricao_grupo"
                                placeholder="Descrição do grupo"
                                defaultValue={userGroup?.descricao_grupo}
                            />
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

export default EditUserGroupModal;

