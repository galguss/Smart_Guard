const Encryption = require("./Encryption_M");
const jwt = require('jsonwebtoken');

class users {
  constructor(DB) {
    this.DB = DB;
    this.attempts = 0;
  }

  async register(YishuvCode, lastName, phoneNumber, email, password) {
    let [YishuvName, _] = await this.DB.execute(
      `SELECT Yishuv_id FROM yishuvs WHERE Yishuv_code = '${YishuvCode}'`
    );
    YishuvName = YishuvName[0].Yishuv_id;

    let pwd = new Encryption(password).password;

    let sql = `INSERT INTO residents (Yishuv_name, last_name, phone_number, email, password) VALUE (
            '${YishuvName}',
            '${lastName}',
            '${phoneNumber}',
            '${email}',
            '${pwd}'
        )`;

    return await this.DB.execute(sql);
  }

  async login(email, password){
        let [userPwd, _] = await this.DB.execute(`SELECT * FROM residents WHERE email = '${email}';`);
        userPwd = userPwd[0];

        if(typeof userPwd == 'undefined'){
          return {
            message: "The email you entered does not exist in the system, you must register",
            token: ""
          }
        }
        
        let [YishuvName, _a] = await this.DB.execute(
            `SELECT Yishuv_name FROM yishuvs WHERE Yishuv_id = '${userPwd.Yishuv_name}'`
        );
        YishuvName = YishuvName[0].Yishuv_name;
        let user = new Encryption(password);
        const userIsLogin = user.IsCompatible(userPwd.password);
        
        if(userIsLogin && this.attempts < 20){
           let token = jwt.sign({
              id: userPwd.resident_id,
              lastName: userPwd.last_name,
              YishuvName: YishuvName,
              email: userPwd.email
          }, "to live in peace and comfort");
          return { 
              message: "Auth successful",
              token: token,
              id:userPwd.resident_id
          };
      }else{
        this.attempts++;
        return { 
          message: "Please try again",
          token: "",
          attempts: this.attempts
      };
      };
  }
}

module.exports = users;
