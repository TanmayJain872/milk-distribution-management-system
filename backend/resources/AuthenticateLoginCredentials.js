/* jshint esversion: 9 */

const verifyLoginCredentials = (request, response, next) => {
    let {submittedUserID, submittedPassword} = request.body;
    connection.query(`SELECT CustomerID, Password FROM MILK_CUSTOMERS WHERE CustomerID = '${submittedUserID}';`, async (error, result) => {
        try {
            let storedPassword = result[0].Password;
            const passwordMatched = await bcrypt.compare(submittedPassword, storedPassword);
            console.log('passwordMatched = ' + passwordMatched);
            if (passwordMatched) {
                request.loginCredentials = result[0];
                next();
            }
            else {
                return response.status(401).send({code: 401, message: 'Incorrect Customer ID or Password. Please try again.'});
            }
        } catch (error) {
            console.log(error);
            return response.status(401).send({code: 401, message: 'Incorrect Customer ID or Password. Please try again.'});
        }
    });
};


module.exports = { verifyLoginCredentials };
