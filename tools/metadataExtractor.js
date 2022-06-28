function extractMetadata(body) {
  return {
    name           : body.nameHackathon,
    organizer      : getOrganizers(body),
    contact        : body.contactPerson,
    email          : body.emailOrganizer,
    surveyPurpose  : body.surveyPurpose,
    theme          : body.hackathonTheme,
    date           : body.date,
    event_url      : body.urlEvent,
    competitive    : evalCompetitive(body.competitive),
    mode           : body.mode,
    size           : body.size,
    type           : body.type,
    disclaimerCheck: body.disclaimerCheck,
  };
}

function getOrganizers(body) {
  let i = 0;
  const organizers = [];

  for (let [key, value] of Object.entries(body)) {
    if (key.includes("organizer")) {
      if (value.replace(new RegExp("\\s"), '').length !== 0) {
        organizers.push(value);
      }
    }
  }

  return organizers;
}

function evalCompetitive(value) {
  if (value === "competitive_true") {
    return true;
  } else if (value === "competitive_false") {
    return false;
  } else {
    return -1;
  }
}

module.exports = { extractMetadata, getOrganizers };
