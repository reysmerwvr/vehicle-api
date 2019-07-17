module.exports = {
    responseJsonSuccess: (data, message = 'OK', status = 'success', title = '') => {
        return { data, message, status, title }; 
    },
    responseJsonError: (data, message = 'ERROR', status = 'error', title = '') => {
        return { data, message, status, title }; 
    }
};