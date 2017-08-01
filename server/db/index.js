const mysql = require('mysql');
const createTables = require('./config');
const Promise = require('bluebird');
const database = 'shortly';

const connection = mysql.createConnection({
  user: 'student',
  password: 'student'
}); 

//RAB//what does this mean exactly?
const db = Promise.promisifyAll(connection, { multiArgs: true });

//RAB// what you do
db.connectAsync()
  .then(() => console.log(`Connected to ${database} database as ID ${db.threadId}`))
  .then(() => db.queryAsync(`CREATE DATABASE IF NOT EXISTS ${database}`))
  .then(() => db.queryAsync(`USE ${database}`))
  //RAB// we moved this down - the console log contains information used from db
  //BDK// I have no idea why we were able to move the console.log up to the top again
  .then(() => createTables(db));

module.exports = db;