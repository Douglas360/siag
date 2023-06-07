import React, { useEffect, useMemo } from 'react';

import { Scheduler } from 'devextreme-react';
import { Resource, View } from 'devextreme-react/scheduler';
import { locale, loadMessages } from 'devextreme/localization';
import ptBR from 'devextreme/localization/messages/pt.json';
import { useEventsContext } from '../../context/EventsContext';
import { groupData, priorityData, resourcesData } from '../../mocks/dataResources';


export const ScheduleView = ({ scheduleView, height }) => {

    const { saveEventStorage, updateEventStorage, removeEventStorage } =
        useEventsContext();

    useEffect(() => {
        loadMessages(ptBR);
        locale(navigator.language);
    }, []);

    const appointmentsData = useMemo(() => {
        try {
            return JSON.parse(localStorage.getItem('events')) || [];
        } catch (error) {
            console.error('Error parsing appointments data:', error);
            return [];
        }
    }, []);

    const handleAppointmentAdd = (e) => {
        const { startDate, endDate, text, ownerId, priority, description } =
            e.appointmentData;
        const newEvent = {
            id: Math.random().toString(36).substr(2, 9),
            startDate,
            endDate,
            text,
            ownerId,
            priority,
            description,
        };
        saveEventStorage(newEvent);
    };

    const handleAppointmentUpdate = (e) => {
        const { startDate, endDate, text, ownerId, priority, description } =
            e.appointmentData;
        const newEvent = {
            startDate,
            endDate,
            text,
            ownerId,
            priority,
            description,
        };
        updateEventStorage(newEvent);
    };

    const handleAppointmentRemove = (e) => {
        const { id } = e.appointmentData;
        removeEventStorage(id);
    };

    return (
        <Scheduler
            dataSource={appointmentsData}
            timeZone="America/Sao_Paulo"
            defaultCurrentView={scheduleView}
            showAllDayPanel={false}
            adaptivityEnabled={true}
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
                dataSource={priorityData}
                fieldExpr="priority"
                label="Tipo"
                useColorAsDefault={true}
            />

            <Resource
                fieldExpr="ownerId"
                allowMultiple={true}
                dataSource={resourcesData}
                label="Agendado Por"
                useColorAsDefault={true}
            />

            <Resource
                fieldExpr="groupId"
                allowMultiple={true}
                dataSource={groupData}
                label="Grupos"
                useColorAsDefault={true}
            />

            <View type="month" name="Mês" />
            <View type="day" name="Dia" />
            <View type="agenda" name="Próximos Eventos" />
        </Scheduler>
    );
};

