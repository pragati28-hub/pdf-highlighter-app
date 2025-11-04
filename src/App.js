import React, { useRef } from "react";
import PdfViewer from "./PdfViewer";
import "./App.css";

function App() {
  const viewerRef = useRef(null);

  
  const handleHighlight = async () => {
    if (viewerRef.current) {
      const result = await viewerRef.current.findAndHighlight(
        "Gain on sale of non-current assets"
      );
      if (!result) {
        alert("Text not found in the PDF.");
      }
    }
  };

  return (
    <div className="app" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      
    
      <header
        style={{
          textAlign: "center",
          backgroundColor: "#0066cc",
          color: "white",
          padding: "10px",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Maersk Q2 2025 Report Analysis
      </header>

   
      <div style={{ display: "flex", flex: 1 }}>
        
       
        <div style={{ flex: 2, borderRight: "1px solid #ddd" }}>
          <PdfViewer ref={viewerRef} pdfUrl="/report.pdf" />
        </div>

        <div
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "#f9f9f9",
            overflowY: "auto",
          }}
        >
          <h3 style={{ color: "#0066cc" }}>Analysis</h3>
          <p>
            No extraordinary or one-off items affecting EBITDA were reported in
            Maersk’s Q2 2025 results. The report notes that EBITDA improvements
            came from operational performance — including volume growth, cost
            control, and margin improvement across Ocean, Logistics & Services,
            and Terminals segments [1][2]. Gains or losses from asset sales,
            shown separately under EBIT, are not included in EBITDA. The gain on
            sale of non-current assets was USD 25 m in Q2 2025, much lower than
            USD 208 m in Q2 2024, but these affect EBIT, not EBITDA{" "}
            <span
              onClick={handleHighlight}
              style={{
                backgroundColor: "#0066cc",
                color: "white",
                padding: "2px 5px",
                borderRadius: "3px",
                cursor: "pointer",
              }}
            >
              [3]
            </span>
            . Hence, Q2 2025 EBITDA reflects regular operating activities
            without one-off adjustments.
          </p>

          <p style={{ fontStyle: "italic", color: "gray", fontSize: "13px" }}>
            Click <b>[3]</b> to highlight <em>"Gain on sale of non-current assets"</em> in the PDF.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
