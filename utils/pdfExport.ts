
declare const jspdf: any;

export const exportToPDF = (title: string, content: string) => {
  const { jsPDF } = jspdf;
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const maxLineWidth = pageWidth - margin * 2;

  // Title
  doc.setFont("playfair", "bold");
  doc.setFontSize(22);
  doc.setTextColor(190, 18, 60); // rose-700
  const splitTitle = doc.splitTextToSize(title, maxLineWidth);
  doc.text(splitTitle, margin, 30);

  // Content
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59); // slate-800
  
  const textLines = doc.splitTextToSize(content, maxLineWidth);
  let y = 30 + (splitTitle.length * 10) + 10;

  // Simple paging
  textLines.forEach((line: string) => {
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
    doc.text(line, margin, y);
    y += 7;
  });

  doc.save(`${title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
};
