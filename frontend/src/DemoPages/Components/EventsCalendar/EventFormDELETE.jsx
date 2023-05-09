import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Chip, InputLabel, MenuItem, Select } from '@mui/material'
import { Button, Form, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup, Label, Input, Row, Col } from 'reactstrap'
import { useForm } from 'react-hook-form'
import { useEventsContext } from '../../../context/EventsContext'

export const EventForm = ({appointmentData}) => {
    const { saveEventStorage, updateEventStorage, removeEventStorage } = useEventsContext()
    const [modal, setModal] = useState(true)
    const toggle = () => setModal(!modal)
    const [title, setTitle] = useState('')
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [allDay, setAllDay] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        if (data) {
            updateEventStorage(data)
        } else {
            saveEventStorage(data)
        }
        toggle()
    }

    const handleCreateEvent = () => {
        console.log(title, startDate, startTime, endDate, endTime, allDay)
    }

    const handleAllDayChange = (e) => {
        setAllDay(e.target.checked);
    };

    const handleStartDateTimeChange = (e) => {
        const [selectedDate, selectedTime] = e.target.value.split('T');
        setStartDate(selectedDate);
        setStartTime(selectedTime);
    };

    const handleEndDateTimeChange = (e) => {
        const [selectedDate, selectedTime] = e.target.value.split('T');
        setEndDate(selectedDate);
        setEndTime(selectedTime);
    };

    const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
        { id: 3, name: 'Alice' },
        { id: 4, name: 'Bob' },
    ];

    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleUserSelect = (event) => {
        setSelectedUsers(event.target.value);
    };

    const handleDeleteUser = (userToDelete) => {
        return alert(userToDelete.name)
        setSelectedUsers(selectedUsers.filter((user) => user.id !== userToDelete.id));
    };


    return (

        <>

            {modal && (
                <Modal isOpen={modal} toggle={toggle}>

                    <ModalHeader toggle={toggle}>Novo Evento</ModalHeader>


                    <ModalBody>
                        <Form
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            {/*<input
                                {...register('id')}
                                id="id"
                                type="hidden"
                                value={data?.id || uuidv4()}
            />*/}
                            <FormGroup>
                                <Label for="title">Título</Label>
                                <Input type="text" name="title" id="title" placeholder="Título do evento"
                                    onChange={(e) => { setTitle(e.target.value) }}
                                    value={appointmentData}
                                />
                            </FormGroup>

                            <FormGroup>

                                <Row>
                                    <Col>
                                        <Input
                                            type={allDay ? 'date' : 'datetime-local'}
                                            name="date"
                                            id="date"
                                            placeholder="Data do evento"
                                            value={allDay ? startDate : `${startDate}T${startTime}`}
                                            onChange={handleStartDateTimeChange}
                                            className="form-control"
                                        />
                                    </Col>
                                    <Col>
                                        <Input
                                            type={allDay ? 'date' : 'datetime-local'}
                                            name="date"
                                            id="date"
                                            placeholder="Data do evento"
                                            value={allDay ? endDate : `${endDate}T${endTime}`}
                                            onChange={handleEndDateTimeChange}
                                            className="form-control"
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>

                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" checked={allDay} onChange={handleAllDayChange} />
                                    Dia inteiro
                                </Label>
                            </FormGroup>



                            <FormGroup>
                                <InputLabel id="user-select-label" >Usuários</InputLabel>

                                <Select
                                    labelId="user-select-label"
                                    id="user-select"
                                    multiple
                                    size='small'
                                    value={selectedUsers}
                                    onChange={handleUserSelect}
                                    renderValue={(selected) => (
                                        <div>
                                            {selected.map((value) => (
                                                <Chip
                                                    key={value}
                                                    label={value}
                                                    size='small'
                                                    onDelete={() => handleDeleteUser(value)}
                                                    variant='outlined'
                                                    style={{ margin: '2px' }} />
                                            ))}
                                        </div>
                                    )}
                                >
                                    {users.map((user) => (
                                        <MenuItem key={user.id} value={user.name}>
                                            {user.name}
                                        </MenuItem>
                                    ))}
                                </Select>

                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Descrição</Label>
                                <Input type="textarea" name="description" id="description" placeholder="Descrição do evento" />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="link" onClick={toggle}>Cancelar</Button>
                        <Button color="primary" onClick={handleCreateEvent}>Salvar</Button>{' '}
                    </ModalFooter>
                </Modal>
            )}
        </>

    )
}
