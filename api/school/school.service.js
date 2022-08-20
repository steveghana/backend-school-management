const pool = require("../../config/database");

module.exports = {
    register: (data, callBack) => {
        pool.query(
            `insert into school_details(name, address, phone_number, email, logo_small, logo_long, created_by, access_code, created_at) values(?,?,?,?,?,?,?,?,?)`,
            [
                data.name,
                data.address,
                data.phone_number,
                data.email,
                data.logo_small,
                data.logo_long,
                data.created_by,
                data.access_code,
                data.created_at
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                if (results) {
                    pool.query(
                        `insert into staff(firstname, lastname, employee_id, email, password, role) values(?,?,?,?,?,?)`,
                        [
                            data.super_admin_firstname,
                            data.super_admin_lastname,
                            data.super_admin_employee_id,
                            data.super_admin_email,
                            data.super_admin_password,
                            data.super_admin_role
                        ],
                        (error, results, fields) => {
                            if (error) {
                                return callBack(error)
                            }
                            return callBack(null, results)
                        }
                    )
                }
            }
        )
    }, 
    getDetails: callBack => {
        pool.query(
            `select name, address, phone_number, email, logo_small, logo_long from school_details`,
            [],
        (error, results, fields) => {
            if (error) {
                return callBack(error)
            }
            return callBack(null, results[0])
        }
        )
    },

    // Section create, update, get
    createSection: (data, callBack) => {
        pool.query(
            `insert into sections(section, created_by) values(?,?)`,
            [
                data.section,
                data.created_by,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    updateSection: (data, callBack) => {
        pool.query(
            `update sections set section=?, updated_by=?, updated_at=? where section=?`,
            [
                data.new_section,
                data.updated_by,
                data.updated_at,
                data.old_section
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        )
    },
    getSections: callBack => {
        pool.query(
            `select section from sections`,
            [],
        (error, results, fields) => {
            if (error) {
                return callBack(error)
            }
            return callBack(null, results)
        }
        )
    },

    // Class create get
    createClass: (data, callBack) => {
        pool.query(
            `insert into classes(class, created_by) values(?,?)`,
            [
                data.class,
                data.created_by,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                if (results) {
                    pool.query(
                        `insert into class_sections(class, section, created_by) values(?,?,?)`,
                        [
                            data.class,
                            data.section,
                            data.created_by
                        ],
                        (error, results, fields) => {
                            if (error) {
                                return callBack(error)
                            }
                            return callBack(null, results)
                        }
                    )
                }
            }
        )
    },

    getClasses: callBack => {
        pool.query(
            `select class, created_by from classes`,
            [],
        (error, results, fields) => {
            if (error) {
                return callBack(error)
            }
            return callBack(null, results)
        }
        )
    },
}