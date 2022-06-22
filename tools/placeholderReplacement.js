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
                replaceWith: "'" + formBody.theme + "'",
            }
        },
        {
            organizer : {
                placeholder: "\\[HACKATHON_ORGANIZERS\\]",
                replaceWith: formBody.organizer
            }
        },
        {
            organizer_name: {
                placeholder: "\\[HACKATHON_ORGANIZER_NAME\\]",
                replaceWith: formBody.contact
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
        let regex = new RegExp(ph[Object.keys(ph)[0]].placeholder);
        jsonString = jsonString.replace(regex, ph[Object.keys(ph)[0]].replaceWith);
    });
    
    return JSON.parse(jsonString);
}

module.exports = { replacePlaceholders };