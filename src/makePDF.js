module.exports = (PDFDocument, blobStream, project, container, iframe, fileSaver, PdfTable) => {
  // create a document and pipe to a blob
  var doc = new PDFDocument();
  var table = new PdfTable(doc, {
    bottomMargin: 10
  });
  var stream = doc.pipe(blobStream());

  doc.registerFont('Roboto', 'fonts/Roboto-Regular.ttf')
  doc.registerFont('Kanit-Black', 'fonts/Kanit-Black.ttf')
  console.log("project", project);


  // Header
  doc.image('images/bscp-logo.png', 56, 40, { height: 86 })
  doc.fontSize(26)
  doc.text('TALLY', 190, 74)

  let line_t_pos = 34
  let line_b_pos = 131
  let y_h_pos1 = 45

  doc.lineCap('butt')
    .moveTo(y_h_pos1, line_t_pos)
    .lineTo(300, line_t_pos)
    .stroke();
  doc.lineCap('butt')
    .moveTo(y_h_pos1, line_b_pos)
    .lineTo(300, line_b_pos)
    .stroke();

  doc.lineCap('butt')
    .moveTo(y_h_pos1, line_t_pos)
    .lineTo(y_h_pos1, line_b_pos)
    .stroke();
  let y_h_pos2 = 150
  doc.lineCap('butt')
    .moveTo(y_h_pos2, line_t_pos)
    .lineTo(y_h_pos2, line_b_pos)
    .stroke();
  let y_h_pos3 = 300
  doc.lineCap('butt')
    .moveTo(y_h_pos3, line_t_pos)
    .lineTo(y_h_pos3, line_b_pos)
    .stroke();
  let y_h_pos4 = 430
  doc.lineCap('butt')
    .moveTo(y_h_pos4, line_t_pos)
    .lineTo(y_h_pos4, line_b_pos)
    .stroke();
  let y_h_pos5 = 565
  doc.lineCap('butt')
    .moveTo(y_h_pos5, line_t_pos)
    .lineTo(y_h_pos5, line_b_pos)
    .stroke();
  const tableHeader = {
    headers: ['', ''],
    rows: [
      ['INVOICE NO. : ', project.invoice_no],
      ['BOOKING NO. : ', project.booking_no],
      ['REPORTED  DATE : ', '-'],
      ['REPORTED  BY : ', '-'],
      ['BSCP JOB NO. : ', project.project_id],
    ]
  }
  doc.fontSize(8)
  doc.moveDown().table(tableHeader, 300, 32, { width: 265 });



  // Table
  doc.text('GENERAL INFOMATION', 45, 165)
  let position1 = 45
  doc.lineCap('butt')
    .moveTo(position1, 182)
    .lineTo(position1, 327)
    .stroke();
  let position2 = 170
  doc.lineCap('butt')
    .moveTo(position2, 182)
    .lineTo(position2, 327)
    .stroke();
  let position3 = 300
  doc.lineCap('butt')
    .moveTo(position3, 182)
    .lineTo(position3, 327)
    .stroke();
  let position4 = 430
  doc.lineCap('butt')
    .moveTo(position4, 182)
    .lineTo(position4, 327)
    .stroke();
  let position5 = 565
  doc.lineCap('butt')
    .moveTo(position5, 182)
    .lineTo(position5, 327)
    .stroke();
  doc.fontSize(8)
  doc.fillAndStroke('black', '#000')
  const tableGeneralInfomation = {
    headers: ['', '', '', ''],
    rows: [
      ['SHIPPER : ', '-', 'DATE OF LOADING : ', '-'],
      ['COMMODITY : ', project.commodity, 'TIME : ', '-'],
      ['NOMINATED QUANTITY : ', project.nominate_quantity, 'HEAD INSPECTOR : ', '-'],
      ['PORT OF LOADING : ', project.port_of_loading, 'BANGKOK SUPPLY CHAIN PARTNERS CONTACT : ', '-'],
      ['PORT OF DISCHARGE : ', project.port_of_discharge, 'PLACE OF LOADING : ', project.place_of_loading],
      ['VESSEL NAME : ', project.vessel_name, 'MOBILE : ', '-'],
      ['SHIPPING MARK : ', project.shipping_mark, 'E-MAIL : ', project.email],
    ]
  };
  doc.moveDown().table(tableGeneralInfomation, 45, 180, { width: 520 });

  // doc.table(tableGeneralInfomation, {
  //   prepareHeader: () => doc.font('Helvetica-Bold'),
  //   prepareRow: (row, i) => doc.font('Helvetica').fontSize(10)
  // });

  doc.end();
  doc.save()
  stream.on('finish', async function () {
    const blob = stream.toBlob('application/pdf')
    console.log('blob', blob);
    // let res = await fileSaver.saveAs(blob, `Comments-x.pdf`)
    // console.log("RES", res);
    iframe.src = stream.toBlobURL('application/pdf');
  });
}