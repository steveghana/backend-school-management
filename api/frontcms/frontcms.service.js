// const pool = require("../../config/database");

// module.exports = {
//     getNotice: callBack => {
//         pool.query(
//             `select title, date, description from front_cms_programs where type = ? `,
//             ['notice'],
//         (error, results, fields) => {
//             if (error) {
//                 return callBack(error)
//             }
//             return callBack(null, results)
//         }
//         )
//     },
// }
