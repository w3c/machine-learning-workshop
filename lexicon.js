fetch("../lexicon.json").then(r => r.json())
  .then(lexicon => {
    const alreadyDone = {};
    [...document.querySelectorAll("a.dfn")].forEach(a => {
      if (lexicon[a.textContent] && !alreadyDone[a.textContent]) {
        let target = lexicon[a.textContent];
        if (target.alias) {
          target = lexicon[target.alias];
        }
        if (target.href) {
          a.href = target.href;
          return;
        }
        const dfnId = target.toLowerCase().replace(/[^a-z0-9]/g, '');

        const dfn = document.createElement("p");
        dfn.id = dfnId;
        dfn.className = "hidden";
        dfn.innerHTML = target;
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
