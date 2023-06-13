import React, { useEffect, useState } from 'react';

import { Button, Scheduler } from 'devextreme-react';
import { Resource, View } from 'devextreme-react/scheduler';
import { locale, loadMessages } from 'devextreme/localization';
import ptBR from 'devextreme/localization/messages/pt.json';
import { useEventsContext } from '../../context/EventsContext';
import { useAuth } from '../../context/AuthContext/useAuth';
import { toast } from 'react-toastify';
import { useRegister } from '../../context/RegisterContext/useRegister';

export const ScheduleView = ({ scheduleView, height }) => {
    const { listUsers, listUserGroup, listUserInsideUserGroup } = useRegister();
    const { saveEvent, updateEvent, getEvents, removeEvent, getPriority } = useEventsContext();
    const { user } = useAuth();
    const data = {
        id_empresa: user.empresa?.id_empresa
    }


    const [events, setEvents] = useState([]); //
    const [priority, setPriority] = useState([]); //
    const [userList, setUserList] = useState([])
    const [userGroup, setUserGroup] = useState([])


    const getEventsData = async () => {
        try {
            //get events from api by user id in params
            const response = await getEvents(user?.id);
            setEvents(response);
        } catch (error) {
            toast.error(`Erro ao carregar os eventos salvos!`);
        }
    };

    const getPriorityData = async () => {
        try {
            //get events from api by user id in params
            const response = await getPriority();

            setPriority(response);
        } catch (error) {
            toast.error(`Erro ao carregar os tipos de eventos!`);
        }
    };

    const getUserList = async () => {
        const response = await listUsers(data)
        const userList = response.map((user) => {
            return {
                id: user.id,
                text: user.name,

            }
        })
        setUserList(userList)
    };

    const getUserGroup = async () => {
        const response = await listUserGroup(data)
        const userGroup = response.map((userGroup) => {
            return {
                id: userGroup.id_grupo,
                text: userGroup.nome_grupo,

            }
        })
        setUserGroup(userGroup)
    };

    useEffect(() => {
        getEventsData();
        getPriorityData();
        getUserList();
        getUserGroup();
        loadMessages(ptBR);
        locale(navigator.language);
    }, []);
    const handleAppointmentAdd = async (e) => {

        const { startDate, endDate, text, usersId, priorityId, groupId, description } =
            e.appointmentData;

        try {
            let mergedUsersId = usersId;


            if (groupId) {
                const groupIdArray = Array.isArray(groupId) ? groupId : [groupId];
                const promises = groupIdArray.map((id) => listUserInsideUserGroup(id));
                const responses = await Promise.all(promises);
                const usersIdFromGroup = responses.flatMap((response) => response.map((user) => user.id));

                if (usersId) {
                    mergedUsersId = [...usersId, ...usersIdFromGroup];
                } else {
                    mergedUsersId = usersIdFromGroup;
                }
            }

            // Filter mergedUsersId to contain only unique values
            const uniqueUsersId = Array.from(new Set(mergedUsersId));

            const newEvent = {
                startDate,
                endDate,
                text,
                priorityId,
                description,
                userIds: uniqueUsersId,
                ownerId: user?.id,
                groupId,
            };

            saveEvent(newEvent);
        } catch (error) {

            toast.error('Erro ao obter os usuários do grupo.');
        }
    };

    const handleAppointmentUpdate = async (e) => {
        const { id, startDate, endDate, text, usersId, priorityId, groupId, description } =
            e.appointmentData;

        try {
            let mergedUsersId = usersId;


            if (groupId) {
                const groupIdArray = Array.isArray(groupId) ? groupId : [groupId];
                const promises = groupIdArray.map((id) => listUserInsideUserGroup(id));
                const responses = await Promise.all(promises);
                const usersIdFromGroup = responses.flatMap((response) => response.map((user) => user.id));

                if (usersId) {
                    mergedUsersId = [...usersId, ...usersIdFromGroup];
                } else {
                    mergedUsersId = usersIdFromGroup;
                }
            }

            // Filter mergedUsersId to contain only unique values
            const uniqueUsersId = Array.from(new Set(mergedUsersId));

            const newEvent = {
                id,
                startDate,
                endDate,
                text,
                priorityId,
                description,
                userIds: uniqueUsersId,
                ownerId: user?.id,
                groupId,
            };

            updateEvent(newEvent);
        } catch (error) {
            console.error(error);
            toast.error('Erro ao atualizar, tente novamente.');
        }
    };

    const handleAppointmentRemove = (e) => {

        const { id } = e.appointmentData;
        removeEvent(id, user?.id);
    };


    return (

        <Scheduler
            dataSource={events}
            timeZone="America/Sao_Paulo"
            defaultCurrentView={scheduleView}
            firstDayOfWeek={1}
            startDayHour={8}
            endDayHour={18}
            height={height}
            locale="pt-BR"
            onAppointmentAdded={handleAppointmentAdd}
            onAppointmentUpdated={handleAppointmentUpdate}
            onAppointmentDeleted={handleAppointmentRemove}
            noDataText='Nenhum evento encontrado'

        >

            <Resource
                dataSource={priority}
                fieldExpr="priorityId"
                label="Tipo"
                useColorAsDefault={true}
            />

            <Resource
                fieldExpr="usersId"
                allowMultiple={true}
                dataSource={userList}
                label="Usuarios"

            />

            <Resource
                fieldExpr="groupId"
                allowMultiple={true}
                dataSource={userGroup}
                label="Grupos"

            />
            <View type="month" name="Mês" />
            <View type="day" name="Dia" />
            <View type="agenda" name="Próximos Eventos" />
        </Scheduler>

    );
};

