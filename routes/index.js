const roomType = require('./roomType.routes')
const room = require('./room.routes')
const authority = require('./authority.routes')
const customer = require('./customer.routes')

module.exports = {
  roomType,
  room,
  authority,
  customer,
}
