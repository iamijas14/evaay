export const FILE_PATH = 'FILE_PATH';

export const setPath = (path) => dispatch => {
    dispatch({
        type: FILE_PATH,
        payload: path
    });
};
