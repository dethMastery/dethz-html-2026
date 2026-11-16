// Build a resume PDF from the data globals in src/js/data/*.js
document.querySelector('#pdf-download').addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF(); // Default: A4, portrait, millimeters
  // Sarabun from google/fonts, base64 in libs/sarabun.js
  doc.addFileToVFS('Sarabun-Regular.ttf', SARABUN_REGULAR);
  doc.addFont('Sarabun-Regular.ttf', 'Sarabun', 'normal');
  doc.addFileToVFS('Sarabun-Bold.ttf', SARABUN_BOLD);
  doc.addFont('Sarabun-Bold.ttf', 'Sarabun', 'bold');
  const W = 210;
  const M = 15;
  const CW = W - M * 2; // content width
  const BOTTOM = 285; // page bottom margin
  const PT = 0.3528; // pt -> mm

  // shared 2-column layout for Skills and Works
  const colGap = 6;
  const colW = (CW - colGap) / 2;
  const colX = [M, M + colW + colGap];

  let y = M;

  const ensure = (need) => {
    if (y + need > BOTTOM) {
      doc.addPage();
      y = M;
    }
  };

  const text = (str, size, style, indent = 0) => {
    doc.setFont('Sarabun', style);
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(String(str), CW - indent);
    for (const l of lines) {
      ensure(size * PT * 1.35);
      doc.text(l, M + indent, y);
      y += size * PT * 1.35;
    }
    return y;
  };

  const section = (title) => {
    ensure(18);
    y += 4;
    doc.setFont('Sarabun', 'bold');
    doc.setFontSize(12);
    doc.text(title, M, y);
    y += 2.5;
    doc.setFillColor(180, 180, 180);
    doc.rect(M, y - 0.2, CW, 0.4, 'F');
    y += 5.5;
  };

  // Header
  doc.setFont('Sarabun', 'bold');
  doc.setFontSize(20);
  doc.text(userData.name, M, y);
  y += 7;

  doc.setFont('Sarabun', 'normal');
  doc.setFontSize(10.5);

  text(userData.subText.join(' '), 10.5, 'normal');
  y += 1;

  text(
    contacts.map((c) => {
      if (c.floor !== 'X (Formerly Twitter)') {
        return `${c.floor}: ${c.value.split('|')[1]}`
      } else {
        return `X: ${c.value.split('|')[1]}`
      }
    }).join(' · '),
    9,
    'normal'
  );

  // Profile
  section('Profile');
  text(userData.desp, 10, 'normal');

  // Details
  section('Details');
  for (const d of userData.details) {
    if (d.floor === 'Interview Availability') continue;
    if (d.floor === 'Current Location') continue;

    let value = d.value;
    if (d.floor === 'Birth Date') {
      const date = new Date(Number(d.value));
      const age = new Date().getFullYear() - date.getFullYear();
      value = `${date.getDate()} ${mS[date.getMonth()]}. ${date.getFullYear()} (${age} years old)`;
    }
    text(`${d.floor}:`, 10, 'bold');
    text(`  ${value}`, 12, 'normal')
  }

  // Education (Education.reverse() in data/education.js already made it newest-first)
  section('Education');
  for (const e of Education) {
    doc.setFont('Sarabun', 'bold');
    doc.setFontSize(10.5);
    doc.text(e.school, M, y);
    doc.setFont('Sarabun', 'normal');
    doc.setFontSize(9);
    doc.text(e.year, W - M, y, { align: 'right' });
    y += 4.5;

    const detail = [e.grade, e.class].filter(Boolean).join(' · ');
    text(detail, 9.5, 'normal');
    y += 1;
  }

  // Skills
  section('Skills');
  // measure one major block height at column width
  const majorHeight = (group) => {
    doc.setFont('Sarabun', 'bold');
    doc.setFontSize(10.5);
    let h = 10.5 * PT * 1.35;
    doc.setFont('Sarabun', 'normal');
    doc.setFontSize(10);
    h += doc.splitTextToSize(group.skills.map((s) => s.name).join(', '), colW)
      .length * 10 * PT * 1.35;
    return h + 3;
  };

  for (let i = 0; i < Skill.length; i += 2) {
    const row = [Skill[i], Skill[i + 1]].filter(Boolean);
    const h = Math.max(...row.map(majorHeight));
    ensure(h);

    for (let j = 0; j < row.length; j++) {
      const group = row[j];
      let yy = y;

      doc.setFont('Sarabun', 'bold');
      doc.setFontSize(10.5);
      doc.text(group.major, colX[j], yy);
      yy += 10.5 * PT * 1.35;

      doc.setFont('Sarabun', 'normal');
      doc.setFontSize(10);
      for (const l of doc.splitTextToSize(group.skills.map((s) => s.name).join(', '), colW)) {
        doc.text(l, colX[j], yy);
        yy += 10 * PT * 1.35;
      }
    }
    y += h;
  }

  // Works on its own page
  doc.addPage();
  y = M;
  section('Works');

  // measure one work block height at column width
  const workHeight = (w) => {
    let h = 4.5;
    if (w.lang) h += 4 + 8.5 * PT * 1.35;
    doc.setFont('Sarabun', 'normal');
    doc.setFontSize(9.5);
    h += doc.splitTextToSize(w.desp, colW).length * 9.5 * PT * 1.35;
    doc.setFontSize(8.5);
    h += doc.splitTextToSize(w.link, colW).length * 8.5 * PT * 1.35;
    return h + 3;
  };

  for (let i = 0; i < works.length; i += 2) {
    const row = [works[i], works[i + 1]].filter(Boolean);
    const h = Math.max(...row.map(workHeight));
    ensure(h);

    for (let j = 0; j < row.length; j++) {
      const w = row[j];
      let yy = y;

      doc.setFont('Sarabun', 'bold');
      doc.setFontSize(10.5);
      doc.text(w.name, colX[j], yy);
      yy += 4.5;

      if (w.lang) {
        doc.setFont('Sarabun', 'normal');
        doc.setFontSize(8.5);
        doc.text(w.lang, colX[j], yy);
        yy += 4;
      }

      doc.setFont('Sarabun', 'normal');
      doc.setFontSize(9.5);
      for (const l of doc.splitTextToSize(w.desp, colW)) {
        doc.text(l, colX[j], yy);
        yy += 9.5 * PT * 1.35;
      }

      doc.setFontSize(8.5);
      doc.setTextColor(80, 80, 80);
      for (const l of doc.splitTextToSize(w.link, colW)) {
        doc.text(l, colX[j], yy);
        yy += 8.5 * PT * 1.35;
      }
      doc.setTextColor(0, 0, 0);
    }
    y += h;
  }

  // Footer on every page
  const pages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFont('Sarabun', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(130, 130, 130);
    doc.text(`Suphakit Pinyoworapot · Page ${i} of ${pages}`, W / 2, 292, {
      align: 'center',
    });
  }

  doc.save('Suphakit_Pinyoworapot.pdf');
});