model.Users.methods.create = function(email, firstname, lastname, password) {
	if (email == "") {
        return {
            error: 409,
            errorMessage: "email is not set"
        }
    }
    var user = ds.Users.find('email==:1', email);
    if (user != null) {
        return {
            error: 409,
            errorMessage: "email already exists"
        }
    }

    ds.startTransaction();

    try {
        var user = ds.Users.createEntity();

        user.email = email;
        user.firstname = firstname;
        user.lastname = lastname;
        user.password = password;
        user.role = "Users";

        user.save();

    }
    catch (e) {

        ds.rollBack();

        return e;

    };

    ds.commit();

    return true;
};

model.Users.methods.create.scope = 'public';

model.Users.methods.changePassword = function(ID, oldpassword, newpassword) {
    var curSession = currentSession();
    var currUser = curSession.user;
    if (ID == currUser.ID) {
        var user = ds.Users.find('ID==:1', ID);
        if (user == null) {
            return {
                error: 409,
                errorMessage: "changing password is prohibited or account doesn't exist"
            }
        }
        else {
            user.password = newpassword;
            user.save();
            return true;
        }

    }
    else {
            return {
                error: 409,
                errorMessage: "changing password is prohibited or account doesn't exist"
            }
    }
};

model.Users.methods.changePassword.scope = 'public';


model.Users.methods.edit = function(ID, firstname, lastname) {
    var curSession = currentSession();
    var currUser = curSession.user;
    if (ID == currUser.ID) {
        var user = ds.Users.find('ID==:1', ID);
        user.firstname = firstname;
        user.lastname = lastname;
        user.save();
        return true;
    }
    else {
        return {
            error: 409,
            errorMessage: "changing profile is prohibited"
        }
    }
};

model.Users.methods.edit.scope = 'public';