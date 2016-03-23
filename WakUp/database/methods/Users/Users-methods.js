model.Users.methods.create = function(email, firstname, lastname, password) {
	if (email == "") {
        return {
            error: 409,
            errorMessage: "email is not set"
        }
    }
    var user = directory.user(email);
    if (user != null) {
        return {
            error: 409,
            errorMessage: "email already exists"
        }
    }

    ds.startTransaction();

    try {
    	var newUser = directory.addUser(email, password, email);
    	newUser.putInto("Users");
    	directory.save();
        var user = ds.Users.createEntity();

        user.firstname = firstname;
        user.lastname = lastname;
        user.ID = newUser.ID;
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
    	var user = directory.user(ID);
        //var user = ds.Users.find('ID==:1', ID);
        if (user == null) {
            return {
                error: 409,
                errorMessage: "changing password is prohibited or account doesn't exist"
            }
        }
        else {
        	user.setPassword(newpassword);
        	directory.save();
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