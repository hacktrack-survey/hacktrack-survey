const structure              = require('../models/data/surveyFormStructure.json');
const elements               = require('../models/forms/surveyUpdateForm.json');
const placeholderReplacement = require('./placeholderReplacement');

function build(formBody) {
    let survey = {
        "includeFormInResponse": true,
        "requests": [
          {
            "updateFormInfo": {
              "info": {
                "description": "As an attendee of the [HACKATHON_NAME] hackathon you are invited to complete the following survey. This hackathon is organized by [HACKATHON_ORGANIZERS]. The main purpose of this survey is [SURVEY_PURPOSE]. The questions are mostly multiple choice / agree-disagree and will take approximately 10 minutes to answer. The risks that are associated with this survey are no greater than those ordinarily encountered in daily life. Your decision regarding whether or not to participate in this study will not result in any loss of benefits to which you are otherwise entitled. Your participation in this survey is voluntary and you may discontinue participation at any time. Your responses will be de-identified and will remain confidential to the study team. Anonymized responses to this survey might also be shared with a group of researchers at the University of Tartu.  If you have any further questions about the survey, please contact [HACKATHON_ORGANIZER_NAME] ([HACKATHON_ORGANIZER_EMAIL])."
              },
              "updateMask": "description"
            }
          },
          {
            "updateSettings": {
              "settings": {
                "quizSettings": {
                  "isQuiz": false
                }
              },
              "updateMask": "quizSettings.isQuiz"
            }
          }
        ]
    }

    // adding age consent
    addElements(survey, [0]);

    survey = addSections(survey, formBody);
    survey = editIndeces(survey);
    survey = placeholderReplacement.replacePlaceholders(survey, formBody);

    return survey;
}

function addSections(survey, formBody) {
    for (let [key, value] of Object.entries(structure)) {
        if (value.static) {
            survey = addElements(survey, [value.index]);
            survey = addQuestions(survey, formBody, value.elements);
        }
        else {
            if (hasQuestionThatShouldBeIncluded(formBody, value.elements)) {
                survey = addElements(survey, [value.index]);
                survey = addQuestions(survey, formBody, value.elements);
            }
        }
    }

    return survey;
}

function addQuestions(survey, formBody, section_elements) {
    for (let [q_key, q_value] of Object.entries(section_elements)) {
        if (q_value[Object.keys(q_value)[0]].static) {
            survey = addElements(survey, q_value[Object.keys(q_value)[0]].index);
        }
        else {
            if (checkIfQuestionShouldBeIncluded(formBody, q_value))  {
                survey = addElements(survey, q_value[Object.keys(q_value)[0]].index);
            }
        }
    }

    return survey;
}

function addElements(survey, indeces) {
    const found = getItemsAtIndex(indeces);
    found.forEach(el => {
        survey.requests.push(el);
    });

    return survey;
}

function getItemsAtIndex(indeces) {
    let questions = [];

    for (let i in indeces) {
        for (let [key, value] of Object.entries(elements.requests)) {
            try {
                if (indeces[i] === value.createItem.location.index) {
                    questions.push(value);
                }
            } catch (err) {
                // element has no location attribute (element either is a header or a meta-data element)
            }
        }
    }
    
    return questions;
}

function checkIfQuestionShouldBeIncluded(formBody, q_value) {
    return Object.keys(formBody).includes(Object.keys(q_value)[0]);
}

function hasQuestionThatShouldBeIncluded(formBody, section_elements) {
    for (let [q_key, q_value] of Object.entries(section_elements)) {
        if (checkIfQuestionShouldBeIncluded(formBody, q_value))  {
            return true;
        }
    }

    return false;
}

function editIndeces(survey) {

    let index_counter = 0;

    survey.requests.forEach(item => {
        if (Object.keys(item)[0] === 'createItem') {
            item[Object.keys(item)[0]].location.index = index_counter;
            index_counter += 1;
        }
    });

    return survey;
}

module.exports = {build};