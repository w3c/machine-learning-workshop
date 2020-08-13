const fs = require("fs");
const WebVTTParser = require("webvtt-parser").WebVTTParser;
const parser = new WebVTTParser();
const splitter = require("sentence-splitter");
const talks = require("../_data/talks.json");

const linkableTerms = [
"GAN",
"GRU",
"SoC",
"multiply-add",
"matrix",
"tensor",
"convolution",
"correlation",
"SNR",
"DNN",
"FTT",
"IFFT",
"EMScripten",
"WebAssembly",
"WASM",
"WebGL",
"WebGPU",
"SIMD",
"vocoder",
"TTS",
"DSP",
"WebBLE",
"WASI",
"CG",
"OpenVINO",
"PyTorch",
"Keras",
  "TensorFlow.js",
  "TensorFlow",
  "TFJS",
"python",
"model DAG",
"YOLO",
"differential privacy",
"NLP",
  "ASR",
  "NPM",
  "Node.js",
  "WebRTC",
  "WebXR"
];

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

for (let shortname of Object.keys(talks)) {
  const {cues} = parser.parse(fs.readFileSync("talks/captions/" + shortname + ".vtt", 'utf-8'));

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
      if (sentence.startsWith(c.text)) {
        break;
      }
      if (!sentence.match(/^slide [a-z0-9]*\.?$/i)) {
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
  let content = ""
  for (i = 1 ; i < divs.length; i++) {
    content += `<div class="slide" role='region' aria-label="Slide ${i} of ${divs.length - 1}" id="slide-${i}" data-fmt="${talks[shortname].format || 'pdf'}" data-src="${talks[shortname].url || 'https://www.w3.org/2020/Talks/mlws/' + shortname + '.pdf#page=' + i}"><noscript><a href="${talks[shortname].url || 'https://www.w3.org/2020/Talks/mlws/' + shortname + '.pdf#page=' + i}">Slide ${i}</a></noscript></div>`;
    content += `<div role='region'>`;
    content += "<p>" + divs[i].join("</p>\n<p>") + "</p>";
    content += "</div>";
  }
  fs.writeFileSync("_includes/transcripts/" + shortname + ".html", content, {encoding: "utf-8"});
}
