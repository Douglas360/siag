import { createContext, useContext, useEffect, useState } from "react";
import { CRUD, LocalStorage } from "../../core/methods";
import { toast } from "react-toastify";

const EventsContext = createContext();
export const useEventsContext = () => useContext(EventsContext)

const key = 'events'
const local = LocalStorage()
const crud = CRUD()

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const saveEventStorage = (event) => {
    try {
      const newEvents = crud.add(events, event)
      local.set(key, JSON.stringify(newEvents))
      setEvents(newEvents)
      toast.success(`Evento "${event.text}" criado!`)
    } catch (error) {
      console.error(error)
      toast.error(`Erro ao salvar o evento "${event.text}"!`)
    }
  }

  const updateEventStorage = (event) => {
    try {
      const newEvents = crud.update(event, events)
      local.set(key, JSON.stringify(newEvents))
      setEvents(newEvents)
      toast.info(`Evento "${event.text}" atualizado!`)
    } catch (error) {
      console.error(error)
      toast.error(`Erro ao atualizar o evento "${event.text}"!`)
    }
  }

  const removeEventStorage = (id) => {
    try {
      const newEvents = crud.remove(events, id)
      local.set(key, JSON.stringify(newEvents))
      setEvents(newEvents)
      toast.success(`Evento removido!`)
    } catch (error) {
      console.error(error)
      toast.error(`Erro ao remover o evento!`)
    }
  }

  useEffect(() => {
    try {
      const eventsStorage = local.get(key)
      if (eventsStorage) {
        setEvents(eventsStorage)
      }
    } catch (error) {
      console.error(error)
      toast.error(`Erro ao carregar os eventos salvos!`)
    }
  }, [])

  return (
    <EventsContext.Provider value={{ events, setEvents, saveEventStorage, updateEventStorage, removeEventStorage }}>
      {children}
    </EventsContext.Provider>
  );
}
