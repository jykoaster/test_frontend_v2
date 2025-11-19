import { UserApi } from '../openapi/api'; 
import type { 
    User, 
    NewUser,
    UserListResponse, 
    UserIdRequest, 
    DeleteUser200Response
} from '../openapi/models'; 

import { api } from '../index'; 

const userApiClient = new UserApi(
    undefined, 
    api.defaults.baseURL,
    api
);

export const userRepository = {
    
    getUsers: async (): Promise<UserListResponse> => {
        const response = await userApiClient.getUsers();
        return response.data;
    },

    addUser: async (user: NewUser): Promise<User> => {
        const response = await userApiClient.addUser(user);
        return response.data;
    },

    updateUser: async (user: User): Promise<User> => {
        const response = await userApiClient.updateUser(user);
        return response.data;
    },

    deleteUser: async (id: number): Promise<DeleteUser200Response> => {
        const requestBody: UserIdRequest = { id };
        const response = await userApiClient.deleteUser(requestBody);
        return response.data;
    },
};