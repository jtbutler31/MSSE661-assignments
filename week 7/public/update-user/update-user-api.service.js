const UPDATE_API = `${BASE_API_URL}/user/me/`;
const PASSWORD_ROUTE = `${UPDATE_API}update/password`;
const USERNAME_ROUTE = `${UPDATE_API}update/username`;

class UpdateUserService {
    changePassword = (formData) => _put(PASSWORD_ROUTE, formData, DEFAULT_OPTIONS_WITH_AUTH);

    changeUsername = (formData) => _put(USERNAME_ROUTE, formData, DEFAULT_OPTIONS_WITH_AUTH);
}
