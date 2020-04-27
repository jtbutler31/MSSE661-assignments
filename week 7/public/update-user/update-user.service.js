class UpdateUser {
    updateUserService;

    constructor(updateUserService) {
        this.updateUserService = updateUserService;
    }

    changePassword = async (password) => {
        try {
            await this.updateUserService.changePassword({password});
            Swal.fire({
                icon: 'success',
                title: 'Successfully updated password',
            });

        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Failed to update password, try again later',
              });
        } finally {
            window.location.href = '../todo/todo.html';
        }
    }

    _changePasswordEventHandler = () => {
        const password_input = document.getElementById('password-n');
        const password = password_input.value;
        
        if(password.length < 1) {
            Swal.fire({
                icon: 'error',
                title: 'You must provide a password greater than 1 character',
              });
            return;
        } else {
            this.changePassword(password);
        }
        password_input.value = '';
    }

    changeUsername = async (username) => {
        try {
            await this.updateUserService.changeUsername({username});
            Swal.fire({
                icon: 'success',
                title: 'Successfully updated username',
            });
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Failed to update username, try again later',
            });
        } finally {
            window.location.href = '../todo/todo.html';
        }
        
    }

    _changeUsernameEventHandler = () => {
        const username_input = document.getElementById('username-n');
        const username = username_input.value;
        
        if(username.length < 1) {
            Swal.fire({
                icon: 'error',
                title: 'You must provide a username greater than 1 character',
            });
            return;
        } else {
            this.changeUsername(username);
        }
        username_input.value = '';
    }
}