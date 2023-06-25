const db = require('../util/database');

module.exports = class User {

    constructor(email, password){
        this.email = email;
        this.password =password;
    }

    static find(email){
        return db.execute('SELECT * FROM users WHERE email = ?', [email]);  
    }

    static save(user) {
        return db.execute(
            'INSERT INTO users (email, password) VALUES (?, ?)', 
            [user.email, user.password]
        );
    }
};
