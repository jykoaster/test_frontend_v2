# UserApi

All URIs are relative to */api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**addUser**](#adduser) | **POST** /user | 新增使用者|
|[**deleteUser**](#deleteuser) | **DELETE** /user | 刪除使用者|
|[**getUsers**](#getusers) | **GET** /user | 獲取使用者列表|
|[**updateUser**](#updateuser) | **PUT** /user | 更新使用者|

# **addUser**
> User addUser(newUser)


### Example

```typescript
import {
    UserApi,
    Configuration,
    NewUser
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let newUser: NewUser; //

const { status, data } = await apiInstance.addUser(
    newUser
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **newUser** | **NewUser**|  | |


### Return type

**User**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 成功創建使用者 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteUser**
> DeleteUser200Response deleteUser(userIdRequest)


### Example

```typescript
import {
    UserApi,
    Configuration,
    UserIdRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let userIdRequest: UserIdRequest; //

const { status, data } = await apiInstance.deleteUser(
    userIdRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userIdRequest** | **UserIdRequest**|  | |


### Return type

**DeleteUser200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 刪除成功，返回空或成功訊息 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUsers**
> UserListResponse getUsers()


### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

const { status, data } = await apiInstance.getUsers();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**UserListResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 成功獲取使用者列表 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateUser**
> User updateUser(user)


### Example

```typescript
import {
    UserApi,
    Configuration,
    User
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let user: User; //

const { status, data } = await apiInstance.updateUser(
    user
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **user** | **User**|  | |


### Return type

**User**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 成功更新使用者 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

