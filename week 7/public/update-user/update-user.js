const doChangePassword = async function(e) {
    e.preventDefault();
    
    updateUser._changePasswordEventHandler();
};

const doChangeUsername = async function(e) {
    e.preventDefault();

    updateUser._changeUsernameEventHandler();
};