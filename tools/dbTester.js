/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */

const dbController = require('../controllers/dbController');

function testAddDBEntry() {
  dbController.saveSurvey({
    'formId': '1iONbiQDZSGtw6ZvrP2PLNYWDyfmCk7YIgwwcWRznsS8',
    'name': 'Other test',
    'date': '2022-01-01',
  });
}

module.exports = {testAddDBEntry};
