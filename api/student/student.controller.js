const { create, getStudents, getStaffByAdmissionNo, getStaffsByClass } = require("./staff.service");

module.exports = {
    create: (req, res) => {
        const body = req.body;
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getStudents: (req, res) => {
        getStudents((err, results) => {
            if (err) {
                console.log(err)
                return
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getStaffByAdmissionNo: (req, res) => {
        const id = req.params.id;
        getStaffByAdmissionNo(id, (err, results) => {
            if (err) {
                console.log(err)
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not Found"
                })
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },
    getStaffsByClass: (req, res) => {
        const id = req.params.id;
        getStaffsByClass(id, (err, results) => {
            if (err) {
                console.log(err)
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not Found"
                })
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },
}