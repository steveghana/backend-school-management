const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into staff(firstname, lastname, employee_id, password) values(?,?,?,?)`,
            [
                data.firstname,
                data.lastname,
                data.employee_id,
                data.password
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getStaffs: callBack => {
        pool.query(
            `select employee_id, firstname, lastname from staff`,
            [],
        (error, results, fields) => {
            if (error) {
                return callBack(error)
            }
            return callBack(null, results)
        }
        )
    },
    getStaffByEmployeeId: (id, callBack) => {
        pool.query(
            `select employee_id, firstname, lastname from staff where employee_id =?`,
            [id],
        (error, results, fields) => {
            if (error) {
                return callBack(error)
            }
            return callBack(null, results[0])
        }
        )
    },
    getStaffByEmployeeEmail: (email, callBack) => {
        pool.query(
            `select * from staff where email  = ?`,
            [email],
        (error, results, fields) => {
            if (error) {
                return callBack(error)
            }
            return callBack(null, results[0])
        }
        )
    }
}