const fs = require("fs");
const talks = require("../_data/talks.json").reduce((acc, obj) => Object.assign(acc, obj), {});
const fetch = require("node-fetch");

const toSlug = title => title.replace(/([A-Z])/g, s => s.toLowerCase())
        .replace(/[^a-z0-9]/g, '_')
        .replace(/_+/g, '_');

(async function() {
  const ghIssues = await fetch("https://labs.w3.org/github-cache/v3/repos/w3c/machine-learning-workshop/issues?ttl=0&state=open").then(r => r.json());
  const ghComments = await Promise.all(
    ghIssues.map(
      i => fetch(
        i.comments_url.replace("https://api.github.com/", "https://labs.w3.org/github-cache/v3/")
      ).then(r => r.json()))
  ).then(data => data.flat());

  for (let shortname of Object.keys(talks)) {
    const talk = talks[shortname];
    const url = "https://www.w3.org/2020/06/machine-learning-workshop/talks/" + toSlug(talk.title) + ".html";
    let content = "";
    const relevantComments = ghComments.filter(c => c.body.includes(url));
    const relevantIssues = ghIssues.filter(i => i.body.includes(url) || relevantComments.find(c => c.issue_url === i.url));

    let htmlIssueList = relevantIssues.sort((a, b) => a.number - b.number)
        .map(i => `<li><a href='${i.html_url}'>#${i.number} ${i.title}</a></li>`).join('\n');
    if (htmlIssueList !== "") {
      content = "<div class=related><p>Related conversations on <a href='https://github.com/w3c/machine-learning-workshop/issues'>GitHub</a>:</p><ul>";
      content += htmlIssueList;
      content += "</ul></div>";
    }
  fs.writeFileSync("_includes/related-issues/" + shortname + ".html", content, {encoding: "utf-8"});
  }
})().catch(
  err => {
    console.error(err);
    process.exit(2);
  });
