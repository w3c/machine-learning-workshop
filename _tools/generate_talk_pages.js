const fs = require("fs");
const talks = require("../_data/talks.json");


for (let shortname of Object.keys(talks)) {
  const talk = talks[shortname];
  const format = talk.format || "pdf";
  const slidesurl = talk.url || 'https://www.w3.org/2020/Talks/mlws/' + shortname + '.pdf';
  const slug = talk.title.replace(/([A-Z])/g, s => s.toLowerCase())
        .replace(/[^a-z0-9]/g, '_')
        .replace(/_+/g, '_');
  const content = `
---
title: ${talk.title}
author: ${talk.author} (${talk.affiliation})
layout: talk
format: ${format}
shortname: ${shortname}
thumbnailurl: ${talk.thumbnail}
videourl: ${talk.video}
slidesurl: ${slidesurl}
---
`;

    fs.writeFileSync("talks/" + slug + ".html", content, {encoding: "utf-8"});
}

