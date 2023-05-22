import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Col, Row, Card, CardBody,
    CardTitle, Button, Form, FormGroup, Label, Input, FormText, FormFeedback, Spinner, Progress
} from 'reactstrap';
import { useAdministrative } from '../../../../../context/AdministrativeContext/useAdministrative';
import { useAuth } from '../../../../../context/AuthContext/useAuth';


const FormRegister = () => {
    const { createOfficialDocument, loading } = useAdministrative();
    const { user } = useAuth()

    const [documentNumber, setDocumentNumber] = useState('');
    const [documentDescription, setDocumentDescription] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [documentFile, setDocumentFile] = useState(null);
    const [isDocumentValidated, setIsDocumentValidated] = useState(false);
    const [isDescriptionValidated, setIsDescriptionValidated] = useState(false);
    const [isTypeValidated, setIsTypeValidated] = useState(false);
    const [isFileValidated, setIsFileValidated] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);


    const handleFileChange = (event) => {
        setDocumentFile(null);
        const file = event.target.files[0];
        setDocumentFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadstart = () => setUploadProgress(0);
            reader.onprogress = (progressEvent) => {
                if (progressEvent.lengthComputable) {
                    const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    setUploadProgress(progress);
                }
            };
            reader.onloadend = () => setUploadProgress(100);
            reader.readAsDataURL(file);
        } else {
            setUploadProgress(0);
        }
    };


    // validation function for document number
    const validateDocument = () => {
        if (documentNumber.length === 0) {
            return 'Campo obrigatório';
        }

        return null;
    }
    const handleDocumentBlur = () => {
        setIsDocumentValidated(true);
    };


    // validation function for document description
    const validateDescription = () => {
        if (documentDescription.length === 0) {
            return 'Campo obrigatório';
        }

        return null;
    }
    const handleDescriptionBlur = () => {
        setIsDescriptionValidated(true);
    };

    // validation function for document type
    const validateType = () => {
        if (documentType.length === 0) {
            return 'Campo obrigatório';
        }

        return null;
    }
    const handleTypeBlur = () => {
        setIsTypeValidated(true);
    };

    // validation function for file upload
    const validateFile = () => {
        if (!documentFile) {
            return 'Selecione um arquivo!';
        } else if (
            !['application/pdf', 'image/jpeg', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(documentFile.type)
        ) {
            return 'O arquivo deve estar no formato PDF, JPEG, XLS ou DOCX';
        } else if (documentFile.size > 5000000) {
            return 'O arquivo deve ter no máximo 5MB';
        }

        return null;
    }

    const handleFileBlur = () => {
        setIsFileValidated(true);
    };

    //function to register document template
    const handleCreateDocument = (event) => {
        event.preventDefault();

        // Check for validation errors
        const documentValidation = validateDocument();
        const descriptionValidation = validateDescription();
        const typeValidation = validateType();
        const fileValidation = validateFile();

        if (documentValidation || descriptionValidation || typeValidation || fileValidation) {
            toast.error('Por favor, preencha os campos corretamente');
            return;
        }
        /*setDocumentNumber('');
        setDocumentDescription('');
        setDocumentType('');
        setDocumentFile(null);*/

        const data = new FormData();
        data.append('numero_documento', documentNumber);
        data.append('descricao', documentDescription);
        data.append('tipo', documentType);
        data.append('file', documentFile);
        data.append('id_user', user?.id);
        //console.log(data);
        createOfficialDocument(data);

    }


    return (
        <div>
            <Card className="main-card mb-3">
                <CardBody>
                    {loading &&
                        <div className="d-flex justify-content-center">
                            <Spinner color="primary" />
                        </div>

                    }
                    <CardTitle>Cadastro de Documento Oficial</CardTitle>

                    <Form onSubmit={handleCreateDocument}>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Nº Documento</Label>
                                    <Input type="text" name="document"
                                        placeholder="Digite o número do documento"
                                        value={documentNumber}
                                        onChange={(e) => setDocumentNumber(e.target.value)}
                                        onBlur={handleDocumentBlur}
                                        invalid={isDocumentValidated && validateDocument()}
                                        valid={isDocumentValidated && !validateDocument()} // adicionando validação aqui
                                    />
                                    <FormFeedback>
                                        {validateDocument()}
                                    </FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Descrição</Label>
                                    <Input type="text" name="description"
                                        placeholder="Digite a Descrição do documento"
                                        value={documentDescription}
                                        onChange={(e) => setDocumentDescription(e.target.value)}
                                        onBlur={handleDescriptionBlur}
                                        invalid={isDescriptionValidated && validateDescription()}
                                        valid={isDescriptionValidated && !validateDescription()} />
                                    <FormFeedback>
                                        {validateDescription()}
                                    </FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Tipo de documento</Label>
                                    <Input type="select" name="type"
                                        value={documentType}
                                        onChange={(e) => setDocumentType(e.target.value)}
                                        onBlur={handleTypeBlur}
                                        invalid={isTypeValidated && validateType()}
                                        valid={isTypeValidated && !validateType()}
                                    >
                                        <option value="">Selecione o tipo de documento</option>
                                        <option>Ofício</option>
                                        <option>Memorando</option>
                                        <option>Instrução</option>

                                    </Input>
                                    <FormFeedback>
                                        {validateType()}
                                    </FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Arquivo</Label>
                                    <Input type="file" name="file"
                                        onChange={handleFileChange}
                                        onBlur={handleFileBlur}
                                        invalid={isFileValidated && validateFile()}
                                        valid={isFileValidated && !validateFile()}

                                    />
                                    <FormFeedback>
                                        {validateFile()}
                                    </FormFeedback>


                                    {uploadProgress >= 0 && (
                                        <div className="mt-3">
                                            <Progress animated color='success' value={uploadProgress}>
                                                {uploadProgress}%
                                            </Progress>

                                        </div>
                                    )}


                                    <FormText color="muted">
                                        O arquivo deve estar no formato PDF, JPEG, XLS ou DOCX com tamanho máximo de 5mb.
                                    </FormText>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Button color="primary" className="mt-2" type='submit' outline>Cadastrar</Button>
                    </Form>

                </CardBody>
            </Card>

        </div>
    )
}

export default FormRegister;
