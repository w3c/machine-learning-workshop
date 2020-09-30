var pdfjsLib = window['pdfjs-dist/build/pdf'];
var pdfjsViewer = window['pdfjs-dist/web/pdf_viewer'];

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.js';

[...document.querySelectorAll('div[data-fmt="pdf"][data-src][id^="slide-"]')].forEach(div => {
  div.setAttribute("aria-busy", true);
});

const firstPdfSlide = document.querySelector('[data-fmt="pdf"][data-src]');
if (firstPdfSlide) {
  const url = firstPdfSlide.dataset.src.split('#')[0];
  var loadingTask = pdfjsLib.getDocument(url);
  var eventBus = new pdfjsViewer.EventBus();
  loadingTask.promise.then(function(pdf) {
    [...document.querySelectorAll('div[data-fmt="pdf"][data-src][id^="slide-"]')].forEach(div => {
      // Fetch the first page
      var pageNumber = parseInt(div.id.slice(6));
      pdf.getPage(pageNumber).then(function(page) {
        // Make slides fit the available space (Note the need to convert from
        // CSS points to CSS pixels for page dimensions)
        const scale = Math.min(
          div.clientHeight / page.view[3],
          div.clientWidth / page.view[2]) * 72 / 96;
        const viewport = page.getViewport({ scale });
        var pdfPageView = new pdfjsViewer.PDFPageView({
          container: div,
          id: pageNumber,
          scale: scale,
          defaultViewport: viewport,
          eventBus: eventBus,
          textLayerFactory: new pdfjsViewer.DefaultTextLayerFactory(),
          annotationLayerFactory: new pdfjsViewer.DefaultAnnotationLayerFactory()
        });
        // Associates the actual page with the view, and drawing it
        pdfPageView.setPdfPage(page);
        div.setAttribute("aria-busy", false);
        return pdfPageView.draw();
      });
    });
  }, function (reason) {
    // PDF loading error
    console.error(reason);
  });
}
