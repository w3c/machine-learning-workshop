fetch("../lexicon.json").then(r => r.json())
  .then(lexicon => {
    const alreadyDone = {};
    [...document.querySelectorAll("a.dfn")].forEach(a => {
      if (lexicon[a.textContent] && !alreadyDone[a.textContent]) {
        if (lexicon[a.textContent].href) {
          a.href = lexicon[a.textContent].href;
          return;
        }
        let dfnTarget;
        if (!lexicon[a.textContent].alias) {
          dfnTarget = a.textContent;
        } else {
          dfnTarget = lexicon[a.textContent].alias;
        }
        const dfnId = dfnTarget.toLowerCase().replace(/[^a-z0-9]/g, '');

        const dfn = document.createElement("p");
        dfn.id = dfnId;
        dfn.className = "hidden";
        dfn.innerHTML = lexicon[dfnTarget];
        document.getElementById("lexicon").appendChild(dfn);

        a.className = "js-simple-tooltip";
        a.dataset.simpletooltipContentId = dfnId;
        alreadyDone[a.textContent] = true;
      } else {
        a.replaceWith(a.textContent);
      }
    });
    const my_tooltip = van11yAccessibleSimpleTooltipAria();
    my_tooltip.attach(document.getElementById('slides'));

  });
