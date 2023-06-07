import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        console.log(error);
        if (!error.request.responseURL.includes("token")  && error.response && error.response.status === 401) {
            const access = localStorage.getItem('accessToken');
            const refresh = localStorage.getItem('refreshToken');
            // Token expirado, intentar refrescar el token
            return axios.post('http://127.0.0.1:8000/api/token/refresh/', {access, refresh})
                .then(response => {
                    const newToken = response.data.access;
                    // Actualizar el token en localStorage
                    localStorage.setItem('accessToken', newToken);
                    // Actualizar el token en los headers de las próximas solicitudes
                    error.config.headers.Authorization = `Bearer ${newToken}`;
                    // Reintentar la solicitud original con el nuevo token
                    return axios.request(error.config);
                })
                .catch(refreshError => {
                    // Error al refrescar el token, redirigir a página de inicio de sesión o mostrar un mensaje de error
                    console.error('Error al refrescar el token', refreshError);
                    // ...
                    return Promise.reject(refreshError);
                });
        }
        return Promise.reject(error);
    }
);

export default apiClient;
