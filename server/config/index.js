require('dotenv').config();

module.exports = {
  db: process.env.DB_URI,
  secret: process.env.SECRET_KEY || 'shh',
}
