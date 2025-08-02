import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ROIResults } from './roiCalculator';
import { formatCurrency } from '@/data/countries';

export interface PDFExportOptions {
  results: ROIResults;
  currency: string;
  countryName: string;
  businessType: string;
  scenario: string;
  companyName?: string;
  userEmail?: string;
}

export async function exportToPDF(options: PDFExportOptions): Promise<void> {
  const {
    results,
    currency,
    countryName,
    businessType,
    scenario,
    companyName,
    userEmail,
  } = options;

  // Create a new PDF document
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  // Helper function to add text with automatic line wrapping
  const addText = (text: string, x: number, y: number, options?: { fontSize?: number; fontStyle?: string; maxWidth?: number }) => {
    const fontSize = options?.fontSize || 12;
    const fontStyle = options?.fontStyle || 'normal';
    const maxWidth = options?.maxWidth || pageWidth - 2 * margin;

    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', fontStyle);

    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, x, y);
    return y + lines.length * fontSize * 0.35;
  };

  // Helper function to check if we need a new page
  const checkNewPage = (requiredHeight: number) => {
    if (yPosition + requiredHeight > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }
  };

  // Header
  pdf.setFillColor(59, 130, 246); // Blue color
  pdf.rect(0, 0, pageWidth, 40, 'F');
  
  pdf.setTextColor(255, 255, 255);
  yPosition = addText('ROI CALCULATOR PRO', margin, 25, { fontSize: 24, fontStyle: 'bold' });
  yPosition = addText('Professional Business ROI Analysis Report', margin, yPosition + 5, { fontSize: 14 });

  // Reset text color
  pdf.setTextColor(0, 0, 0);
  yPosition = 60;

  // Report Details
  yPosition = addText('REPORT DETAILS', margin, yPosition, { fontSize: 16, fontStyle: 'bold' });
  yPosition += 10;

  const reportDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  yPosition = addText(`Generated: ${reportDate}`, margin, yPosition);
  yPosition = addText(`Business Type: ${businessType}`, margin, yPosition + 5);
  yPosition = addText(`Scenario: ${scenario}`, margin, yPosition + 5);
  yPosition = addText(`Country: ${countryName}`, margin, yPosition + 5);
  yPosition = addText(`Currency: ${currency}`, margin, yPosition + 5);

  if (companyName) {
    yPosition = addText(`Company: ${companyName}`, margin, yPosition + 5);
  }
  if (userEmail) {
    yPosition = addText(`Generated for: ${userEmail}`, margin, yPosition + 5);
  }

  yPosition += 15;

  // Key Financial Metrics
  checkNewPage(80);
  yPosition = addText('KEY FINANCIAL METRICS', margin, yPosition, { fontSize: 16, fontStyle: 'bold' });
  yPosition += 10;

  // Create a table-like structure for metrics
  const metrics = [
    ['Total Revenue', formatCurrency(results.totalRevenue, currency)],
    ['Gross Profit', formatCurrency(results.grossProfit, currency)],
    ['Net Profit', formatCurrency(results.netProfit, currency)],
    ['Total Costs', formatCurrency(results.totalCosts, currency)],
    ['Taxes', formatCurrency(results.taxAmount, currency)],
    ['ROI Percentage', `${results.roi.toFixed(2)}%`],
  ];

  metrics.forEach(([label, value]) => {
    pdf.setFont('helvetica', 'normal');
    pdf.text(label, margin, yPosition);
    pdf.setFont('helvetica', 'bold');
    pdf.text(value, margin + 80, yPosition);
    yPosition += 7;
  });

  yPosition += 10;

  // Customer Metrics (if available)
  if (results.customerLifetimeValue || results.paybackPeriod || results.customersNeeded) {
    checkNewPage(60);
    yPosition = addText('CUSTOMER METRICS', margin, yPosition, { fontSize: 16, fontStyle: 'bold' });
    yPosition += 10;

    const customerMetrics = [];
    if (results.customerLifetimeValue) {
      customerMetrics.push(['Customer Lifetime Value', formatCurrency(results.customerLifetimeValue, currency)]);
    }
    if (results.paybackPeriod) {
      customerMetrics.push(['Payback Period', `${results.paybackPeriod.toFixed(1)} months`]);
    }
    if (results.customersNeeded) {
      customerMetrics.push(['Customers Needed', results.customersNeeded.toString()]);
    }

    customerMetrics.forEach(([label, value]) => {
      pdf.setFont('helvetica', 'normal');
      pdf.text(label, margin, yPosition);
      pdf.setFont('helvetica', 'bold');
      pdf.text(value, margin + 80, yPosition);
      yPosition += 7;
    });

    yPosition += 10;
  }

  // Break-even Analysis
  if (results.breakEvenMonth) {
    checkNewPage(30);
    yPosition = addText('BREAK-EVEN ANALYSIS', margin, yPosition, { fontSize: 16, fontStyle: 'bold' });
    yPosition += 10;
    yPosition = addText(`Break-even Month: ${results.breakEvenMonth}`, margin, yPosition);
    yPosition += 15;
  }

  // Industry Benchmarks
  if (results.industryComparison) {
    checkNewPage(60);
    yPosition = addText('INDUSTRY COMPARISON', margin, yPosition, { fontSize: 16, fontStyle: 'bold' });
    yPosition += 10;

    const benchmarks = [
      ['Revenue vs Benchmark', `${(results.industryComparison.revenueVsBenchmark * 100).toFixed(1)}%`],
      ['Margin vs Benchmark', `${(results.industryComparison.marginVsBenchmark * 100).toFixed(1)}%`],
      ['Growth vs Benchmark', `${(results.industryComparison.growthVsBenchmark * 100).toFixed(1)}%`],
    ];

    benchmarks.forEach(([label, value]) => {
      pdf.setFont('helvetica', 'normal');
      pdf.text(label, margin, yPosition);
      pdf.setFont('helvetica', 'bold');
      pdf.text(value, margin + 80, yPosition);
      yPosition += 7;
    });

    yPosition += 10;
  }

  // Risk Factors
  if (results.riskFactors && results.riskFactors.length > 0) {
    checkNewPage(40 + results.riskFactors.length * 15);
    yPosition = addText('RISK FACTORS', margin, yPosition, { fontSize: 16, fontStyle: 'bold' });
    yPosition += 10;

    results.riskFactors.forEach((risk) => {
      const riskColor = risk.impact === 'high' ? [220, 38, 38] as const : risk.impact === 'medium' ? [245, 158, 11] as const : [34, 197, 94] as const;
      
      pdf.setFillColor(riskColor[0], riskColor[1], riskColor[2]);
      pdf.circle(margin + 3, yPosition - 2, 2, 'F');
      
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${risk.factor} (${risk.impact.toUpperCase()})`, margin + 10, yPosition);
      yPosition += 5;
      
      pdf.setFont('helvetica', 'normal');
      yPosition = addText(risk.description, margin + 10, yPosition, { fontSize: 10, maxWidth: pageWidth - 2 * margin - 10 });
      yPosition += 5;
    });

    yPosition += 10;
  }

  // Recommendations
  if (results.recommendations && results.recommendations.length > 0) {
    checkNewPage(40 + results.recommendations.length * 20);
    yPosition = addText('RECOMMENDATIONS', margin, yPosition, { fontSize: 16, fontStyle: 'bold' });
    yPosition += 10;

    results.recommendations.forEach((rec, index) => {
      pdf.setFont('helvetica', 'bold');
      yPosition = addText(`${index + 1}. ${rec.category}`, margin, yPosition);
      
      pdf.setFont('helvetica', 'normal');
      yPosition = addText(rec.suggestion, margin + 5, yPosition + 3, { fontSize: 10, maxWidth: pageWidth - 2 * margin - 5 });
      
      pdf.setFont('helvetica', 'italic');
      yPosition = addText(`Potential Impact: ${rec.potentialImpact}`, margin + 5, yPosition + 2, { fontSize: 9, maxWidth: pageWidth - 2 * margin - 5 });
      yPosition += 10;
    });
  }

  // Footer
  const footerY = pageHeight - 20;
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'italic');
  pdf.text('Generated by ROI Calculator Pro - Professional Business Analysis Tool', margin, footerY);
  pdf.text('Page 1', pageWidth - margin - 20, footerY);

  // Save the PDF
  const fileName = `ROI-Analysis-${businessType.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
}

export async function exportElementToPDF(elementId: string, fileName: string): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with ID "${elementId}" not found`);
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 0;

    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
}