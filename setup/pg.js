const {Pool} = require('pg')

const pool = new Pool({
    user: 'postgres',
    database: 'portfolio',
    host: 'localhost',
    password: 'jubajuba'
})

const fetchall = async (SQL, ...params) => {

    try {
        client = await pool.connect()
        data = await client.query(SQL, params)
        return await data.rows
    }
    
    finally {
        client.release()
    }

}

module.exports = {
    fetchall
}
