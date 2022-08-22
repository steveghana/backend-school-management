const { create, getStaffs, getStaffByEmployeeId, getStaffByEmployeeEmail } = require("./staff.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createStaff: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
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
    getStaffs: (req, res) => {
        getStaffs((err, results) => {
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
    getStaffByEmployeeId: (req, res) => {
        const id = req.params.id;
        getStaffByEmployeeId(id, (err, results) => {
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
    login: (req, res) => {
        const body = req.body;
        getStaffByEmployeeEmail(body.email, (err, results) => {
            if (err) {
                console.log(err)
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                })
            }
            const result = compareSync(body.password, results.password)
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, process.env.TOKEN_SECRET, { expiresIn: "1hr"})
                return res.json({
                    success: 1,
                    message: "login successfull",
                    token: jsontoken,
                    data: results
                })
            } else {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                })
            }
        })
    }
}