import apiClient from "./index";


export const getFiles = () => {
    return apiClient.get('data/file/');
}