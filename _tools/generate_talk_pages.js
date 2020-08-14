const fs = require("fs");
const talks = require("../_data/talks.json");

const toSlug = title => title.replace(/([A-Z])/g, s => s.toLowerCase())
        .replace(/[^a-z0-9]/g, '_')
        .replace(/_+/g, '_');

const shortnames = Object.keys(talks);
for(let i = 0; i < shortnames.length; i++) {
  const shortname = shortnames[i];
  const talk = talks[shortname];
  const format = talk.format || "pdf";
  const slidesurl = talk.noslide ? "" : talk.url || 'https://www.w3.org/2020/Talks/mlws/' + shortname + '.pdf';
  const slug = toSlug(talk.title)
  console.log(i, shortnames[i], shortnames[i-1]);
  const prevlink = i > 0 ? toSlug(talks[shortnames[i-1]].title) + ".html" : "";
  const prevtitle = i> 0 ? talks[shortnames[i-1]].title : "";
  const nextlink = i < shortnames.length - 1 ? toSlug(talks[shortnames[i + 1]].title) + ".html" : "";
  const nexttitle = i < shortnames.length - 1 ? talks[shortnames[i + 1]].title :  "";
  const content = `---
title: "${talk.title}"
author: ${talk.author} (${talk.affiliation})
layout: talk
format: ${format}
shortname: ${shortname}
thumbnailurl: ${talk.thumbnail}
videourl: ${talk.video}
slidesurl: ${slidesurl}
prevlink: ${prevlink}
prevtitle: "${prevtitle}"
nextlink: ${nextlink}
nexttitle: "${nexttitle}"
---
`;

    fs.writeFileSync("talks/" + slug + ".html", content, {encoding: "utf-8"});
}

