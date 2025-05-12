import jsPDF from 'jspdf';

export const generateDonationCertificate = (
  name: string,
  certificateNumber: string,
  date: Date,
  items: string[],
  totalWeight: number,
  ngoName: string
) => {
  // Create new PDF document
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  // Set background color
  doc.setFillColor(230, 255, 230);
  doc.rect(0, 0, 297, 210, 'F');

  // Add border
  doc.setDrawColor(0, 100, 0);
  doc.setLineWidth(1);
  doc.rect(10, 10, 277, 190);

  // Set title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(36);
  doc.setTextColor(0, 128, 0);
  doc.text('CERTIFICATE OF APPRECIATION', 297/2, 50, { align: 'center' });

  // Add recipient name
  doc.setFontSize(24);
  doc.text(name, 297/2, 90, { align: 'center' });

  // Add appreciation text
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  const text = `This certificate is awarded to ${name} for their generous food donation. Together, we can make a difference in fighting hunger.`;
  doc.text(text, 297/2, 110, { align: 'center', maxWidth: 200 });

  // Add certificate details
  doc.setFontSize(12);
  doc.text(`Certificate Number: ${certificateNumber}`, 30, 140);
  doc.text(`Date: ${date.toLocaleDateString()}`, 30, 150);
  doc.text(`Items Donated: ${items.join(', ')}`, 30, 160);
  doc.text(`Total Weight: ${totalWeight} kg`, 30, 170);

  // Add NGO name and signature placeholder
  doc.setFont('helvetica', 'bold');
  doc.text(ngoName, 30, 190);
  doc.text('Authorized Signature', 225, 190, { align: 'center' });

  return doc;
};