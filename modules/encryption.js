// var bcrypt = require('bcrypt');
//
// var SALT_WORK_FACTOR = 10;
//
// var publicAPI = {
//   encryptPassword: function(password){
//     var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
//     console.log('Produced a salt of:', salt);
//     var encryptedPassword = bcrypt.hashSync(password, salt);
//     console.log('Created password of:', encryptedPassword);
//     return encryptedPassword;
//   },
//   comparePassword: function(candidatePassword, storedPassword){
//     console.log('Comparing', candidatePassword, 'to', storedPassword);
//     var answer = bcrypt.compareSync(candidatePassword, storedPassword);
//     console.log('The answer is', answer);
//     return answer;
//   }
// };
//
// module.exports = publicAPI;
