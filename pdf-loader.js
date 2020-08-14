var pdfjsLib = window['pdfjs-dist/build/pdf'];

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.5.207/pdf.worker.js';

const firstPdfSlide = document.querySelector('[data-fmt="pdf"][data-src]');
if (firstPdfSlide) {
  const url = firstPdfSlide.dataset.src.split('#')[0];
  var loadingTask = pdfjsLib.getDocument(url);
  loadingTask.promise.then(function(pdf) {
    [...document.querySelectorAll('div[data-fmt="pdf"][data-src][id^="slide-"]')].forEach(div => {
      // Fetch the first page
      var pageNumber = parseInt(div.id.slice(6));
      pdf.getPage(pageNumber).then(function(page) {
        var canvas = document.createElement("canvas");
        div.appendChild(canvas);
        canvas.height = div.clientHeight;
        let scale = (canvas.height / page.view[3]);
        let viewport = page.getViewport({scale: scale});
        canvas.width = page.view[2] * scale;

        // Prepare canvas using PDF page dimensions
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function () {
        });
      });
    });
  }, function (reason) {
    // PDF loading error
    console.error(reason);
  });
}
