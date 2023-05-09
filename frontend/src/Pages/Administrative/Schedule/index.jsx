import React from 'react'
import PageTitle from '../../../Layout/AppMain/PageTitle'
import Calendar from './Calendar/Calendar'

const Schedule = () => {
  return (
    <>
      <PageTitle
        heading="Agenda"
        subheading="Visualização da agenda mensal / anual com os devidos lembretes, tarefas e eventos"
        icon="lnr lnr-calendar-full icon-gradient bg-amy-crisp"
      />
      <Calendar />
    </>
  )
}

export default Schedule

