document.querySelector('#pdf-download').addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF(); // Default: A4, portrait, millimeters

  doc.save("Suphakit_Pinyoworapot.pdf");
})