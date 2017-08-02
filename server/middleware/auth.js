const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  Promise.resolve(req.cookies.shortlyid)
  .then( (hash) => { 
    //check if cookie has a session
    if (!hash) {
      //there is no session throw (catch and make a session)
      throw hash;
    } else {
      //there is a session (return it to get authenticated)
      return models.Sessions.get({ hash });
    }
  })
  //authenticate the session
  .then( (session) => { 
    //if there is no session throw (catch and make a session)
    if (!session) {
      throw session;
    }
    return session;
  })
  //create a session
  .catch( () => {
    return models.Sessions.create()
    .then( (result) => {
      //get the id from the recently created session
      //RAB// Why you ask? Don't ask questions. 
      return models.Sessions.get({id: result.insertId});
    })
    //
    .tap( (session) => {
      console.log('***session**');
      console.log(session);
      res.cookie('shortlyid', session.hash);
    });
  })
  .then( (session) => {  
    req.session = session;
    next();
  });
  
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

