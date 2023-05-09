export const getValuesForm = (form) => {
    const data = new FormData(form);
    const values = {};
    data.forEach((value, key) => {
        values[key] = value;
    });
    return values;
}