class CarsY{
    constructor(DB){
        this.DB = DB;
    }

    async getAllCarNum(id){
        let [cars, _] =  await this.DB.execute('SELECT * FROM cars;');
        const carsArray = [];
        for(let item of cars){
            carsArray[item.car_id] = item.car_number
        }

        let [localCars, _a] = await this.DB.execute(`SELECT * FROM local_cars WHERE resident_last_name = ${id}`);
        for(let item of localCars){
            item.car_number = carsArray[item.car_number];
        }

        return localCars;
    }

   async AddCar(id, carNum){
        let [YishuvName , _] = await this.DB.execute(`SELECT Yishuv_name FROM residents WHERE resident_id = ${id};`);
        YishuvName = YishuvName[0].Yishuv_name;

        let [carId, _a] = await this.DB.execute('INSERT INTO cars (car_number) VALUES (?)', [carNum]);
        
        let sql = `INSERT INTO local_cars(Yishuv_name, resident_last_name, car_number) VALUE(${YishuvName},${id},${carId.insertId});`;
        return this.DB.execute(sql);
    }

    async EditCar(ApprovalsId, carNum){
        let [carId, _] = await this.DB.execute(`SELECT car_number FROM local_cars WHERE approvals_id = ${ApprovalsId}`);
        carId = carId[0].car_number;

        let sql = `UPDATE cars SET car_number = '${carNum}' WHERE car_id = ${carId};`;
        return this.DB.execute(sql);
    }

    async DeleteCar(id){
        let [carId, _] = await this.DB.execute(`SELECT car_number FROM local_cars WHERE approvals_id = ${id}`);
        carId = carId[0].car_number;

        await this.DB.execute(`DELETE FROM local_cars WHERE approvals_id = '${id}';`);
        
        return await this.DB.execute(`DELETE FROM cars WHERE car_id = '${carId}';`);
    }
}

module.exports = CarsY;