const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into students(parent_id, admission_no, admission_date, firstname, middlename, lastname, image, mobileno, email, region, city, town, religion, cast, dob, gender, current_address, permanent_address, class, section, school_club, blood_group, medical_condition, guardian_is, father_name, father_phone, father_occupation, mother_name, mother_phone, mother_occupation, guardian_name, guardian_relation, guardian_phone, guardian_occupation, guardian_address, guardian_email, father_pic, mother_pic, guardian_pic, previous_school, height, weight, measurement_date, note, created_by) values(?,?,?,?)`,
            [
                data.parent_id,
                data.admission_no,
                data.admission_date,
                data.firstname,
                data.middlename,
                data.lastname,
                data.image,
                data.mobileno,
                data.email,
                data.region,
                data.city,
                data.town,
                data.religion,
                data.cast,
                data.dob,
                data.gender,
                data.current_address,
                data.permanent_address,
                data.class,
                data.section,
                data.school_club,
                data.blood_group,
                data.medical_condition,
                data.guardian_is,
                data.email,
                data.region,
                data.city,
                data.town,
                data.religion,
                data.cast,
                data.dob,
                data.gender,
                data.father_name, 
                data.father_phone, 
                data.father_occupation, 
                data.mother_name, 
                data.mother_phone, 
                data.mother_occupation, 
                data.guardian_name, 
                data.guardian_relation, 
                data.guardian_phone, 
                data.guardian_occupation, 
                data.guardian_address, 
                data.guardian_email, 
                data.father_pic, 
                data.mother_pic, 
                data.guardian_pic, 
                data.previous_school, 
                data.height, 
                data.weight, 
                data.measurement_date, 
                data.note, 
                data.created_by
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getStudents: callBack => {
        pool.query(
            `select * from students`,
            [],
        (error, results, fields) => {
            if (error) {
                return callBack(error)
            }
            return callBack(null, results)
        }
        )
    },
    getStaffByAdmissionNo: (admission_no, callBack) => {
        pool.query(
            `select * from students where admission_no=?`,
            [admission_no],
        (error, results, fields) => {
            if (error) {
                return callBack(error)
            }
            return callBack(null, results[0])
        }
        )
    },
    getStaffsByClass: (class_name, callBack) => {
        pool.query(
            `select * from students where class = ?`,
            [class_name],
        (error, results, fields) => {
            if (error) {
                return callBack(error)
            }
            return callBack(null, results[0])
        }
        )
    }
}