// This function returns a JavaScript object that has two methods: get and set.
// These methods are used to retrieve and store data in the browser's localStorage.
export const LocalStorage = () => {
    const get = (key) => {
        // This line retrieves the value for the given key from the localStorage.
        const getItem = localStorage.getItem(key);

        // If there is a value for the given key, parse it as a JSON object and return it.
        // Otherwise, return null.
        const response = getItem ? JSON.parse(getItem) : [];

        return response;
    }

    // This method stores the given data under the given key in the localStorage.
    const set = (key, data) => {
        localStorage.setItem(key, data);
    }

    // Return an object with the get and set methods.
    return { get, set }
}

// This function returns a JavaScript object that has three methods: add, update, and remove.
// These methods are used to manipulate an array of events.
export const CRUD = () => {
    // This method adds a new event to the events array and returns the new array.
    const add = (events, event) => {
        return [...events, event]
    }

    // This method removes an event with the given eventId from the events array and returns the new array.
    const remove = (events, eventId) => {
        return events.filter(({ id }) => id !== eventId)
    }

    // This method updates an event in the events array with the same id as the given event.
    // It returns a new array with the updated event first, followed by the rest of the events.
    const update = (event, events) => {
        return [event, ...events.filter(({ id }) => id !== event.id)]
    }

    // Return an object with the add, update, and remove methods.
    return { add, update, remove }
}
