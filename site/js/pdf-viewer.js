// Initialize PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/build/pdf.worker.min.js';

// PDF viewer variables
let pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    scale = 1.0;

const canvas = document.getElementById('pdf-render'),
      ctx = canvas.getContext('2d');

/**
 * Get the PDF file path from the parameters or use a default
 * IMPORTANT: Replace the URL below with the actual path to your PDF file
 */
function getPdfPath() {
    // REPLACE THIS PATH with the actual path to your PDF file
    // For example: './reports/student_report.pdf' or any other path where you store your PDF
    // =========================================================
    const pdfPath = './report.pdf';
    // =========================================================
    // NOTE TO USER: This is where you need to add your PDF file path!
    
    return pdfPath;
}

/**
 * Render the page
 */
function renderPage(num) {
    pageRendering = true;
    
    // Update page counters
    document.getElementById('page-num').textContent = num;
    
    // Get page
    pdfDoc.getPage(num).then(function(page) {
        // Prepare canvas using PDF page dimensions
        const viewport = page.getViewport({ scale: scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        // Render PDF page into canvas context
        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };
        
        const renderTask = page.render(renderContext);
        
        // Wait for rendering to finish
        renderTask.promise.then(function() {
            pageRendering = false;
            
            if (pageNumPending !== null) {
                // New page rendering is pending
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });
    });
}

/**
 * If another page rendering in progress, wait until the rendering is
 * finished. Otherwise, execute rendering immediately.
 */
function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}

/**
 * Show previous page
 */
function prevPage() {
    if (pageNum <= 1) {
        return;
    }
    pageNum--;
    queueRenderPage(pageNum);
}

/**
 * Show next page
 */
function nextPage() {
    if (pageNum >= pdfDoc.numPages) {
        return;
    }
    pageNum++;
    queueRenderPage(pageNum);
}

/**
 * Zoom in the PDF
 */
function zoomIn() {
    scale += 0.25;
    queueRenderPage(pageNum);
}

/**
 * Zoom out the PDF
 */
function zoomOut() {
    if (scale <= 0.5) return;
    scale -= 0.25;
    queueRenderPage(pageNum);
}

/**
 * Initialize the PDF viewer
 */
function initPdfViewer() {
    // Show loading animation by hiding the viewer and showing placeholder
    document.querySelector('.pdf-viewer').style.display = 'none';
    document.querySelector('.pdf-placeholder').style.display = 'flex';
    
    const pdfPath = getPdfPath();
    
    // Load the PDF
    pdfjsLib.getDocument(pdfPath).promise.then(function(pdfDoc_) {
        pdfDoc = pdfDoc_;
        document.getElementById('page-count').textContent = pdfDoc.numPages;
        
        // Initial/first page rendering
        renderPage(pageNum);
        
        // Hide placeholder and show PDF viewer
        document.querySelector('.pdf-placeholder').style.display = 'none';
        document.querySelector('.pdf-viewer').style.display = 'flex';
    }).catch(function(error) {
        console.error('Error loading PDF:', error);
        
        // Show error in placeholder
        const placeholder = document.querySelector('.pdf-placeholder');
        placeholder.innerHTML = `
            <i class="fa-solid fa-circle-exclamation" style="color: #ff3333;"></i>
            <p>Error loading PDF report</p>
            <p class="small">Please make sure the PDF path is set correctly in js/pdf-viewer.js</p>
        `;
        placeholder.style.display = 'flex';
    });
}

// Event listeners for button actions
document.getElementById('prev').addEventListener('click', prevPage);
document.getElementById('next').addEventListener('click', nextPage);
document.getElementById('zoom-in').addEventListener('click', zoomIn);
document.getElementById('zoom-out').addEventListener('click', zoomOut);

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // We have a slight delay to make the loading animation visible
    setTimeout(initPdfViewer, 2000);
});
