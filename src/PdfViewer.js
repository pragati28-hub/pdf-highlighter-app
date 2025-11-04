import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;



const PdfViewer = forwardRef(({ pdfUrl }, ref) => {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [highlightRect, setHighlightRect] = useState(null);
  const containerRef = useRef(null);
  const pageRefs = useRef({});

  const onLoadSuccess = (loaded) => setPdfDoc(loaded);


  useImperativeHandle(ref, () => ({
    findAndHighlight: async (searchString) => {
      if (!pdfDoc) return null;

      for (let p = 1; p <= pdfDoc.numPages; p++) {
        const pageEl = pageRefs.current[p];
        if (!pageEl) continue;

        const spans = pageEl.querySelectorAll("span");
        for (const span of spans) {
          if (span.textContent.toLowerCase().includes(searchString.toLowerCase())) {
            const rect = span.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();

            setHighlightRect({
              top: rect.top - containerRect.top + containerRef.current.scrollTop,
              left: rect.left - containerRect.left,
              width: rect.width,
              height: rect.height,
            });

            pageEl.scrollIntoView({ behavior: "smooth", block: "center" });
            return { page: p };
          }
        }
      }
      return null;
    },
  }));

  return (
    <div
      ref={containerRef}
      className="pdf-container"
      style={{ height: "80vh", overflowY: "auto", position: "relative" }}
    >
      <Document file={pdfUrl} onLoadSuccess={onLoadSuccess}>
        {Array.from(new Array(pdfDoc ? pdfDoc.numPages : 0), (_, index) => (
          <div
            key={index + 1}
            ref={(el) => (pageRefs.current[index + 1] = el)}
            style={{ position: "relative" }}
          >
            <Page pageNumber={index + 1} width={600} renderTextLayer />
          </div>
        ))}
      </Document>

      {highlightRect && (
        <div
          style={{
            position: "absolute",
            top: highlightRect.top,
            left: highlightRect.left,
            width: highlightRect.width,
            height: highlightRect.height,
            background: "rgba(255, 255, 0, 0.3)",
            border: "1px solid gold",
            pointerEvents: "none",
            borderRadius: 3,
          }}
        />
      )}
    </div>
  );
});

export default PdfViewer;
