import { createContext, useContext } from "react";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import { ERROR_MESSAGES } from "../../config/ErrorMessage";

const EventsContext = createContext();
export const useEventsContext = () => useContext(EventsContext)

export const EventsProvider = ({ children }) => {

  const handleRequest = async (requestPromise) => {
    try {

      const response = await requestPromise;
      return response.data;
    } catch (error) {
      const message =
        ERROR_MESSAGES[error.response?.data.eror] || 'Erro desconhecido';
      toast.error(message, {
        autoClose: 2000,
        hideProgressBar: true,
      });
      throw error;
    }
  };

  const saveEvent = async (data) => {
    return handleRequest(api.post(`/create/appointment`, data)).then((response) => {
      toast.success(`Evento criado!`, { autoClose: 900, pauseOnHover: false })
      return response
    }).catch((error) => {
      console.log(error)
      toast.error(`Erro ao criar o evento!`, { autoClose: 900, pauseOnHover: false })
      return error
    });
  }

  const updateEvent = async (data) => {
    return handleRequest(api.put(`/update/appointment/${data.id}?d_user=${data.ownerId}`, data)).then((response) => {
      toast.info(`Evento atualizado!`, { autoClose: 900, pauseOnHover: false })
      return response
    }).catch((error) => {
      console.log(error)
      toast.error(`Erro ao atualizar o evento!`)
      return error
    });
  }

  const removeEvent = async (id, id_user) => {
    return handleRequest(
      api.delete(`/delete/appointment/${id}?d_user=${id_user}`)).then((response) => {
        toast.warning(`Evento deletado!`, { autoClose: 900, pauseOnHover: false })
        return response
      })
  }

  const getEvents = async (id) => {
    return handleRequest(api.get(`/list/appointments/${id}`));

  }

  const getPriority = async () => {
    return handleRequest(api.get(`/list/priorities`));
  }

  return (
    <EventsContext.Provider value={{
      saveEvent,
      updateEvent,
      getEvents,
      removeEvent,
      getPriority
    }}>
      {children}
    </EventsContext.Provider>
  );
}
