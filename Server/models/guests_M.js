class Guests{
    constructor(DB){
        this.DB = DB;
    }

    async readAllGuests(id){
        let [cars, _] = await this.DB.execute('SELECT * FROM cars;');
        const carsArray = [];

        for(let item of cars){
            carsArray[item.car_id] = item.car_number
        }

        let [Guests,_a] = await this.DB.execute(`SELECT * FROM guests WHERE resident_id = ${id}`);
        for(let item of Guests){
            item.car_id = carsArray[item.car_id];
        }

        return Guests;
    }

    async createGuest(lastName, name, phone, resident, carNum){
        let [carNumber, _] = await this.DB.execute(`SELECT * FROM cars WHERE car_number = ${carNum}`);
        if(typeof carNumber[0] === 'undefined'){
            let [carId, _1] = await this.DB.execute('INSERT INTO cars (car_number) VALUES (?)', [carNum]);
            carId = carId.insertId;
        
            return this.DB.execute('INSERT INTO guests (guest_last_name, guest_name, phone_number, resident_id, car_id) VALUES (?,?,?,?,?)', [lastName, name, phone, resident, carId]);
        }

        let sql = `INSERT INTO guests (guest_last_name, guest_name, phone_number, resident_id, car_id) VALUES ('${lastName}','${name}','${phone}',${resident}, ${carNumber[0].car_id})`
        return this.DB.execute(sql);
    }

    async editGuest(guestId, carNum,lastName, name, phone){
        let [carId, _] = await this.DB.execute(`SELECT car_id FROM guests WHERE guest_id = ${guestId}`);
        carId = carId[0].car_id;

        await this.DB.execute(`UPDATE cars SET car_number = '${carNum}' WHERE car_id = ${carId};`);
        let sql = `UPDATE guests SET guest_last_name = '${lastName}', guest_name = '${name}', phone_number= '${phone}' WHERE guest_id = ${guestId};`;
        return this.DB.execute(sql);
    }

    async deleteGuest(id){
        let [carId, _] = await this.DB.execute(`SELECT car_id FROM guests WHERE guest_id = ${id}`);
        carId = carId[0].car_id;

        await this.DB.execute(`DELETE FROM guests WHERE guest_id = '${id}';`);
        
        return await this.DB.execute(`DELETE FROM cars WHERE car_id = '${carId}';`);
    }
}

module.exports = Guests;