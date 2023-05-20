import React, { useState } from 'react';
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { useRegister } from '../../../../../context/RegisterContext/useRegister';

const EditProfileModal = ({ isOpen, toggleModal, profile, handleEdit }) => {
    const [nameError, setNameError] = useState(false);
    const [checked, setChecked] = useState(false);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedSubroles, setSelectedSubroles] = useState([]);




    const { roles } = useRegister();
    console.log(roles)

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        const value = Object.fromEntries(form.entries());

        // Include the selected roles in the values object
        value.roles = selectedSubroles.map((subrole) => subrole.id);

        //Valide if the role is empty or not 
        if (value.roles.length === 0) {
            setChecked(true);
            return;
        }

        const data = {
            id: profile.id_perfil,
            nome_perfil: value.nome_perfil,
            descricao_perfil: value.descricao_perfil,
            roles: value.roles,
        };
        await handleEdit(data);

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
        <Modal isOpen={isOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal} className="text-lg font-medium">
                Editar Perfil de acesso</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={12} className='mb-4'>
                            <Label htmlFor="name" className="mb-2 font-medium">Nome do perfil</Label>
                            <Input
                                required
                                type="text"
                                name="nome_perfil"
                                placeholder="Nome do Perfil"
                                onBlur={handleNameBlur}
                                defaultValue={profile?.nome_perfil}
                                invalid={nameError}
                                valid={!nameError}
                            />
                            <FormFeedback>
                                {nameError && "Nome do perfil é obrigatório e deve ter mais de 2 caracteres"}
                            </FormFeedback>
                        </Col>


                        <Col md={12}>
                            <Label htmlFor="description" className="mb-2 font-medium">Descrição</Label>
                            <Input
                                type="text"
                                name="descricao_perfil"
                                placeholder="Descrição do Perfil"
                                defaultValue={profile?.descricao_perfil}
                            />
                        </Col>

                    </Row>
                    <Row className="mt-4">
                        <Col md={12}>
                            <Label>{
                                checked ? <ListGroupItem color="danger">Selecione pelo menos uma Permissão</ListGroupItem> : 'Selecione as Permissões'

                            }</Label>

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

                    <ModalFooter>
                        <Button color="secondary" outline onClick={toggleModal}>
                            Cancelar
                        </Button>
                        {nameError ? <Button color="primary" disabled>Atualizar</Button> : <Button color="primary" type="submit" outline>Atualizar</Button>}
                    </ModalFooter>
                </Form>
            </ModalBody>
        </Modal>
    );
};

export default EditProfileModal;
