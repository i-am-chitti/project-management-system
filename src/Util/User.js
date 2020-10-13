export const User = {
    isLoggedIn: false,
    currentUser: null,
    uname: "",
    getUserFromCookie() {
        let uid = this.getCookieData('uid');
        let email = this.getCookieData('email');
        let uname = this.getCookieData('uname');
        if(uid && email && uname) {
            this.isLoggedIn = true;
            this.currentUser = {
                uid: uid,
                email: email,
                uname: uname
            }
            return this.isLoggedIn;
        }
        return null;
    },
    getCookieData(name) {
        var ca = document.cookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
            return c.substring(name.length+1, c.length);
          }
        }
    },
    changeUser(user) {
        if(user) {
            let d = new Date();
            d.setTime(d.getTime() + 19800000 );
            let expires = 'expires='+d.toUTCString();
            document.cookie = 'uid=' + user.uid + ';' + expires + ';path=/';
            document.cookie = 'email=' + user.email + ';' + expires + ';path=/';
            document.cookie = 'uname=' + user.uname + ';' + expires + ';path=/';
            this.currentUser = user;
        }
    },
    logOut() {
        document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "uname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
}