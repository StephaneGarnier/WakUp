function loginFunc(email, password) {
	
	var dsDir = solution.getApplicationByName("WakUp").ds;

    var u = dsDir.Users.find("email=:1",email);
    
    if (!u) {
        return false;
    }
    else {    	
        if (u.password == password) {
        	
           	var theGroups = [];
            switch (u.role){
                case 'Admin': 
                    theGroups.push('Admin');
                    break;
                case 'Users': 
                    theGroups.push('Users');
                    break;
            }
            var connectTime = new Date();
            
            return {
                ID: u.ID,
                name: u.email,
                fullName: u.fullname,
				belongsTo: theGroups,
                storage: {
                    time: connectTime
                }
            };
        }
        else
        {
        	return {
	            error: 1024,
	            errorMessage: "invalid login"
	        }
	    }
    }
};
