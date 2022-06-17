function extractMetadata(body) {
  return {
    name: body.nameHackathon,
    date: body.date,
    event_url: body.urlEvent,
    competitive: evalCompetitive(body.competitive),
    mode: body.mode,
    size: body.size,
    type: body.type,
    organizer: body.nameOrganizer,
    email: body.emailOrganizer,
    roleOrganizer: body.roleOrganizer,
    surveyPurpose: body.surveyPurpose,
    disclaimerCheck: body.disclaimerCheck,
  };
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

module.exports = { extractMetadata };
