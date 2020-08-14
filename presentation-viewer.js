(function() {

  "use strict";
  const caption_url = "https://www.w3.org/2020/06/machine-learning-workshop/talks/captions/" + shortname + ".vtt";

  let captions;        // For each language one array of subtitles
  let cuelang = "en";
  let cue_elt = document.getElementById("cue");
  let slidenr_elt = document.getElementById("slidenr");
  let firstslide_elt = document.getElementById("firstslide");
  let prevslide_elt = document.getElementById("prevslide");
  let nextslide_elt = document.getElementById("nextslide");
  // "syncelts" includes both slides and incremental display items.
  let syncelts = document.querySelectorAll(".slide, .next");
  let current = 0;          // Active element (index in syncelts)
  let curslide = 0;         // Currently visible slide (index in syncelts)
  let curcue = -1;          // Current caption (index in captions)
  let video = document.getElementById("video"); // Only one of video and
  let nexttalk_elt = document.getElementById("nexttalk");


  // Load the English captions
  let parser = new WebVTTParser();
  let timecodes = [];
  fetch(caption_url).then(r => r.text())
    .then(text => {
      let tree = parser.parse(text, "captions");
      if (tree.errors.length)
        cue_elt.textContent = "Error: line " + tree.errors[0].line +
        " of " + caption_url + ": " + tree.errors[0].message;
      for (let cue of tree.cues) {
        if (cue.id && cue.id.startsWith("slide-")) {
          timecodes.push(cue.startTime);
        }
        cue.text = cue.text.replace(/<\/?v[^>]*>/g,"");
      }
      captions = tree.cues;
    });


  // Round the timecodes to whole seconds, because the StreamFizz
  // player can only seek to whole seconds.
  // Also work around a bug in the player: seeking to 0 does not
  // work, but seeking to 0.01 does.
  if (video) {
    for (let i = 0; i < timecodes.length; i++)
      timecodes[i] = Math.round(timecodes[i]);
    if (timecodes[0] == 0) timecodes[0] = 0.01;
  }

  // Activate and announce the first slide. (Assumes there is at least one.)
  syncelts[0].classList.add("active");
  announce(0);


  // announce -- show the slide label in the output element
  function announce(n)
  {
    if (!slidenr_elt) return;             // No output element

    let label = syncelts[n].getAttribute("aria-label");
    let target = syncelts[n].id;
    
    if (!target) {
      slidenr_elt.textContent = label;
    } else {
      while (slidenr_elt.firstChild)
        slidenr_elt.removeChild(slidenr_elt.firstChild);
      let e = document.createElement("A");
      e.textContent = label;
      e.href = "#" + target;
      slidenr_elt.appendChild(e);
    }
  }


  // activate -- deactivate the current element and activate the new one
  function activate(new_index)
  {
    if (new_index < current) {

      // Deactivate the old current element and activate the new.
      syncelts[current].classList.remove("active");
      current = new_index;
      syncelts[current].classList.add("active");

      // Find containing slide i.
      let i = current;
      while (i > 0 && !syncelts[i].classList.contains("slide")) i--;

      // If it is a new slide, deactivate the old one and activate the new.
      if (i != curslide) {

        // Deactivate the old slide and elements inside it.
        do syncelts[curslide++].classList.remove("active");
        while (curslide < syncelts.length &&
               ! syncelts[curslide].classList.contains("slide"));

        // Activate the new slide.
        syncelts[i].classList.add("active");

        // Announce the new slide number.
        announce(i);
        curslide = i;
      }

    } else if (new_index > current) {

      current = new_index;

      // If this is a slide, deactivate the previous slide.
      if (syncelts[current] && syncelts[current].classList.contains("slide")) {

        syncelts[curslide].classList.remove("active");
        syncelts[curslide].classList.add("visited");
        curslide = current;

        // Announce the new slide number.
        announce(current);
      }

      // Activate the new current element (slide or other element).
      syncelts[current].classList.add("active");
    }
  }


  // seek_video -- set the video to the start time of the current slide
  function seek_video()
  {
    if (current in timecodes) {
      if (video)
        video.contentWindow.postMessage(["seek" ,timecodes[current]], "*");
    }
  }

  // Event handler for the "first slide" button.
  if (firstslide_elt) firstslide_elt.addEventListener("click",
                                                      function(ev) {
                                                        ev.preventDefault();
                                                        activate(0);          // Move the "active" class
                                                        seek_video();
                                                      });


  // Event handler for the "previous slide" button.
  if (prevslide_elt) prevslide_elt.addEventListener("click",
                                                    function(ev) {
                                                      ev.preventDefault();
                                                      if (current == 0) return; // Already at first element
                                                      activate(current - 1); // Move the "active" class
                                                      seek_video();
                                                    });


  // Event handler for the "next slide" button.
  if (nextslide_elt) nextslide_elt.addEventListener("click",
                                                    function(ev) {
                                                      ev.preventDefault();
                                                      if (current == syncelts.length - 1) return; // No next element
                                                      activate(current + 1); // Move the "active" class
                                                      seek_video();
                                                    });


  // search -- return index of x in array a, or -1 if not found
  function search(x, a, cmp)
  {
    let lo = 0, hi = a.length - 1;
    while (lo <= hi) {
      let m = Math.floor((lo + hi)/2), r = cmp(x, a[m]);
      if (r < 0) hi = m - 1;
      else if (r > 0) lo = m + 1;
      else return m;
    }
    return -1;
  }


  // As the video plays, announce the relevant slide and make it active.
  window.addEventListener("message",
                          function(ev) {
                            const type = ev.data[0];
                            const t = ev.data[1];
                            if (type !== "position") return;
                            // console.log("message: t = " + t);

                            // Find the caption corresponding to time t.
                            if (captions) {
                              let i = search(t, captions,
                                             function(a,b) {return a<b.startTime ? -1 : a>b.endTime ? 1 : 0});
                              if (i == curcue) ;  // Output already has the right cue
                              else if (i < 0) cue_elt.innerHTML = "";
                              else cue_elt.innerHTML = captions[i].text;
                              curcue = i;
                            }

                            // Find index i corresponding to time t. Search forward then backward.
                            let i = Math.min(current, timecodes.length - 1);
                            while (i < timecodes.length - 1 && t > timecodes[i]) i++;
                            while (i > 0 && t < timecodes[i]) i--;

                            // If i is not the current element, move the "active" class.
                            activate(i);
                          });

})();
