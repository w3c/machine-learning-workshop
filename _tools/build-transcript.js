const fs = require("fs");
const WebVTTParser = require("webvtt-parser").WebVTTParser;
const parser = new WebVTTParser();
const splitter = require("sentence-splitter");
const talks = require("../_data/talks.json").reduce((acc, obj) => Object.assign(acc, obj), {});
const lexicon = require("../lexicon.json");
const { JSDOM } = require("jsdom");
const linkableTerms = Object.keys(lexicon);

function annotateSentence(sentence) {
  sentence = sentence.replace(/^slide [a-z0-9]*\.?/i, '');
  sentence = sentence.replace(/^next slide\.?/i, '');
  sentence = sentence.replace(/<v [^>]*>/, '').replace(/<\/v>/, '');
  for (let term of linkableTerms) {
    sentence = sentence.replace(new RegExp("(.)?(" + term + ")(.)?", "g"), (match,p1,p2,p3) => {
      if ((!p1 || !p1.match(/[a-zA-Z0-9>]/)) && (!p3 || !p3.match(/[<a-zA-Z0-9]/)))
        return (p1 ? p1 : '') + "<a class=dfn>" + p2 + "</a>" + (p3 ? p3 : '');
      else
        return p1 + p2 + p3;
    });
  }
  return sentence;
}

(async function () {
for (let shortname of Object.keys(talks)) {
  let cues;
  try {
    ({cues} = parser.parse(fs.readFileSync("talks/captions/" + shortname + ".vtt", 'utf-8')));
  } catch (e) {
    continue;
  }
  cues.forEach(c => c.text = c.text.replace(/^slide [0-9]+$/i, '')
               .replace('"',''));
  const sentences = splitter.split(cues.map(c => c.text).join(' '))
        .map(s => s.raw.trim()).filter(s => s);

  const divs = [];
  let div = [];
  let sentencesCursor = 0;
  let slideNum = 2;
  cues.forEach(c => {
    if (c.id.startsWith("slide-" + slideNum)) {
      divs.push(div);
      div = [];
    } else {
      return;
    }
    while (sentencesCursor < sentences.length) {
      const sentence = sentences[sentencesCursor];
      if (sentence.startsWith(c.text.split('.')[0])) {
        break;
      }
      if (!sentence.match(/^slide [a-z0-9]+\.?$/i)) {
        div.push(annotateSentence(sentence));
      }
      sentencesCursor++;
    }
    slideNum++;
  });
  // dealing with last slide
  divs.push(div);
  div = [];
  while (sentencesCursor < sentences.length) {
    let sentence = sentences[sentencesCursor];
    if (!sentence.match(/^slide [a-z0-9]*\.?$/i)) {
      div.push(annotateSentence(sentence));
    }
    sentencesCursor++;
  }
  divs.push(div);
  let content = "";
  let dom;
  const format = talks[shortname].format || 'pdf';
  if (format !== 'pdf' && talks[shortname].url) {
    dom = await JSDOM.fromURL(talks[shortname].url);
  }
  for (i = 1 ; i < divs.length; i++) {
    const slideurl = talks[shortname].noslide ? "" : talks[shortname].url || 'https://www.w3.org/2020/Talks/mlws/' + shortname + '.pdf#page=' + i;
    if (slideurl) {
      if (dom) {
        const slide = dom.window.document.querySelectorAll(".slide")[i - 1];
        if (slide) {
          [...slide.querySelectorAll("img[src]")].forEach(n => {
            n.setAttribute("src", n.src);
            slide.setAttribute("role", "region");
            slide.setAttribute("aria-label", `Slide ${i} of ${divs.length - 1}`);
          });
          content += slide.outerHTML ;
        }
      } else {
        content += `<div class="slide" role='region' aria-label="Slide ${i} of ${divs.length - 1}" id="slide-${i}" data-fmt="${format}" data-src="${slideurl}"><noscript><a href="${talks[shortname].url || 'https://www.w3.org/2020/Talks/mlws/' + shortname + '.pdf#page=' + i}">Slide ${i}</a></noscript>`;
      }
      content += "</div>";
    }
    content += `<div role='region'>`;
    content += "<p>" + divs[i].join("</p>\n<p>") + "</p>";
    content += "</div>";
  }
  fs.writeFileSync("_includes/transcripts/" + shortname + ".html", content, {encoding: "utf-8"});
}
})().catch(
  err => {
    console.error(err);
    process.exit(2);
  });
