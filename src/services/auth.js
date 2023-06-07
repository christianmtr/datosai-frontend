import apiClient from "./index";


export const get_token = (username, password) => {
    return apiClient.post('token/', {username, password});
};

export const getUserInfo = () => {
    return apiClient.get('');
};

export const updateApiToken = apiToken => {
    return apiClient.patch('core/add_api_key/', {"openai_api_key": apiToken});
};