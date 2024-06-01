const client = require('twilio')(process.env.Account_SID, process.env.Auth_Token);

const carInspection = async (req, res, next) => {
    try {
          // מידלוור לבדיקת הרכב בשער
        const { IDY, carNum } = req.body;
        let authorization = 0;
        let residents = await req.sql.getAllResident(IDY);
        for(let resident of residents){
            for(let car of resident.cars){
              if(car === carNum){
                authorization = 1;
              }
            }
        }

        if(authorization === 0){
            for(let resident of residents){
              for(let guest of resident.guests){
                if(guest.car_id === carNum){
                  authorization = {...resident,guests:guest};
                }
            }
          }
        }
        
        if(typeof authorization === 'object'){
          let message = await client.messages.create({
            body: `שלום משפחת ${authorization.last_name}, האורח שלכם ${authorization.guests.guest_name + " " + authorization.guests.guest_last_name} מחכה בשער, הנה פתחו לו את השער, תודה. 
            שומר החכם שלכם.`,
            to: '+972544933268', // Text your number
            from: process.env.PHONE_NUMBER, // From a valid Twilio number
          })

          console.log(message.sid);
        }else{
          let message = await client.messages.create({
            body: `שלום כיתת כוננות, ברצוני להודיע שיש רכב זר שעומד בשער או כבר נכנס ליישוב, נא בצעו את הפעולות הנדרשות.
            תודה, שומר החכם שלכם.`,
            to: '+972544933268', // Text your number
            from: process.env.PHONE_NUMBER, // From a valid Twilio number
          })

          console.log(message.sid);
          authorization = 3;
        }

        req.authorization = authorization;
        next();
    } catch (error) {
      console.log(error);
    }
   
}

module.exports = carInspection;