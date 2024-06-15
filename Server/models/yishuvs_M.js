class Yishuvs{
    constructor(DB){
        this.DB = DB;
    }

   async createYishuv(name, code){
        let sql = `INSERT INTO yishuvs(Yishuv_name, Yishuv_code) VALUE('${name}','${code}');`;
        let yishuv =await this.DB.execute(sql);
        return yishuv[0].insertId;
    }

    readAllYishuvs(){
        let sql = 'SELECT * FROM yishuvs;';
        return this.DB.execute(sql);
    }

    editYishuv(name, id){
        let sql =`UPDATE yishuvs SET Yishuv_name = '${name}' WHERE Yishuv_id = '${id}';`;
        return this.DB.execute(sql);
    }

    DeleteYishuv(id){
        let sql = `DELETE FROM yishuvs WHERE Yishuv_id = '${id}';`;
        return this.DB.execute(sql);
    }
}

module.exports = Yishuvs;