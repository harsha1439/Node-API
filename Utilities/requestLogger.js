const fs = require('fs')
const {promisify} = require('util')

const appendFile = promisify(fs.appendFile)
myLogger = async (req,res,next) => {
    try {
        const logMessage = `${new Date()} - ${req.method} - ${req.url} \n`;
        await appendFile('IncomingLogs',logMessage)
        next()
    }
    catch (err) {
        next(err)
    }
}

module.exports = myLogger