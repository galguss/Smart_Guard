class Esp{
    constructor(DB){
        this.DB = DB;
    }

    async saveCars(objData, carNum){
        let [carNumber, _] = await this.DB.execute(`SELECT * FROM cars WHERE car_number = ${carNum}`);
        if(typeof carNumber[0] === 'undefined'){
            let [carId, _1] = await this.DB.execute('INSERT INTO cars (car_number) VALUES (?)', [carNum]);
            carId = carId.insertId;
        
            return this.DB.execute('INSERT INTO entry_of_vehicles (car_number,yishuv,pach_image,entry_date,entry_time) VALUES (?,?,?,?,?)', [carId,objData.IDY,objData.image,objData.date,objData.time]);
        }
        
       
        return this.DB.execute('INSERT INTO entry_of_vehicles (car_number,yishuv,pach_image,entry_date,entry_time) VALUES (?,?,?,?,?)', [carNumber[0].car_id, objData.IDY, objData.image, objData.date, objData.time]);
    }

    async getAllResident(IDY){
        let [residents, _] = await this.DB.execute('SELECT * FROM residents WHERE Yishuv_name = ?', [IDY]);
        let [local_cars, _1] =  await this.DB.execute('SELECT * FROM local_cars WHERE Yishuv_name = ?', [IDY]);
        let [guests, _3] =  await this.DB.execute('SELECT * FROM guests;');
        let [cars, _2] =  await this.DB.execute('SELECT * FROM cars;');

        // Construction of the information for performing tests
        const carsArr = [];
        for (let car of cars){
            carsArr[car.car_id] = car.car_number
        }

        for(let resident of residents){
            resident.cars = [];
            resident.guests = [];
            for (let car of local_cars){
                if(car.resident_last_name === resident.resident_id){
                    resident.cars.push(carsArr[car.car_number])
                }
            }
            for (let guest of guests){
                if(guest.resident_id === resident.resident_id){
                    resident.guests.push({...guest, car_id:carsArr[guest.car_id]})
                }
            }
        }

        return residents;
    }

}


module.exports = Esp;