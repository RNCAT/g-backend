const roomType = require('./roomType.routes')
const room = require('./room.routes')
const authority = require('./authority.routes')
const customer = require('./customer.routes')
const booking = require('./booking.routes')
const report = require('./report.routes')

module.exports = {
  roomType,
  room,
  authority,
  customer,
  booking,
  report,
}
