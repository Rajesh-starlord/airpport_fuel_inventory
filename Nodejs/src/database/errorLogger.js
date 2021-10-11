
module.exports = ErrorLogger = (err) => {
    let mysqlError = {};
    if (err.sqlMessage !== undefined) {
        mysqlError.message = err.sqlMessage;
    }
    if (err.code !== undefined) {
        mysqlError.code = err.code;
    }
    if (err.errno !== undefined) {
        mysqlError.errno = err.errno;
    }
    if (err.sqlState !== undefined) {
        mysqlError.sqlState = err.sqlState;
    }
    if (err.sql !== undefined) {
        mysqlError.sql = err.sql;
    }
    console.log(mysqlError);
    return mysqlError;
}