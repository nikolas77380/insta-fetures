import { useState } from 'react';

const useForm = (initialValues, callback) => {

    const [values, setValues] = useState(initialValues);

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        callback();
        setValues(initialValues)
    };

    const handleChange = (event) => {
        if (!event.target) {
            let newSelectedItem = [...values['tagUsers']];
            if (newSelectedItem.indexOf(event) === -1) {
                newSelectedItem = [...newSelectedItem, event];
            } else {
                newSelectedItem.splice(newSelectedItem.indexOf(event), 1);
            }
            setValues(values => ({ ...values, ['tagUsers']: newSelectedItem }))
        } else {
            event.persist();
            setValues(values => ({ ...values, [event.target.name]: event.target.value }));
        }
    };

    return {
        handleChange,
        handleSubmit,
        values,
    }
};

export default useForm;
