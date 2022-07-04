const { getOrganizers } = require("./metadataExtractor");

function replacePlaceholders(survey, formBody) {
    const placeholders =
    [{
            hackathon_name: {
                placeholder: "\\[HACKATHON_NAME\\]",
                replaceWith: "'" + formBody.nameHackathon + "'"
            }
        },
        {
            hackathon_theme: {
                placeholder: "\\[HACKATHON_THEME\\]",
                replaceWith: "'" + formBody.hackathonTheme + "'",
            }
        },
        {
            organizer : {
                placeholder: "\\[HACKATHON_ORGANIZERS\\]",
                replaceWith: getOrganizers(formBody).join(', ')
            }
        },
        {
            organizer_name: {
                placeholder: "\\[HACKATHON_ORGANIZER_NAME\\]",
                replaceWith: formBody.contactPerson
            }
        },
        {
            organizer_mail: {
                placeholder: "\\[HACKATHON_ORGANIZER_EMAIL\\]",
                replaceWith: formBody.emailOrganizer
            }
        },
        {
            purpose: {
                placeholder: "\\[SURVEY_PURPOSE\\]",
                replaceWith: "'" + formBody.surveyPurpose + "'"
            }
        }
    ];

    let jsonString = JSON.stringify(survey);

    placeholders.forEach(ph => {
        let regex = new RegExp(ph[Object.keys(ph)[0]].placeholder, "g");
        jsonString = jsonString.replace(regex, ph[Object.keys(ph)[0]].replaceWith);
    });
    
    return JSON.parse(jsonString);
}

module.exports = { replacePlaceholders };