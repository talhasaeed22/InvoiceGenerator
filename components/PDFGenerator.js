/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import jsPDF from "jspdf";
import Image from "next/image";
// eslint-disable-next-line
import autoTable from "jspdf-autotable";
import AlertModal from "./Modals/AlertModal";

const PDFGenerator = (props) => {
  const formatter = (value) => {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: props.invoice.currency,

    });

    return formatter.format(value)
  }

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const setErrorState = () => {
    setError(false);
  };

  const toPDF = () => {
    var add = false;
    if (props.items.length === 0 && (props.item.item_name === '' || props.item.item_qty === '' || props.item_rate === '')) {
      setMessage("Please fill the required fields");
      props.setItemBorder();
      setError(true);
    } else {

      console.log(props.item.item_name !== '' && props.item.item_qty !== '' && props.item_rate !== '')

      if (props.items.length === 0) {
        props.addItems();
        console.log('Setting List true')
        add = true
        print(add);
      }
      else if (props.items[props.items.length - 1].id !== props.item.id && (props.item.item_name !== '' && props.item.item_qty !== '' && props.item_rate !== '')) {
        props.addItems();
        console.log('Setting List TRUE')
        add = true
        print(add);
      }

      else {
        print();
      }
    }


  };

  const print = (add) => {
    if (
      props.sender.name === ""

    ) {
      setMessage("Please Enter Sender Comapany Name");
      setError(true);
    } else if (
      props.recipient.Cname === ""
    ) {
      setMessage("Please Enter Recipient Comapny Name");
      setError(true);
    } else {

      var pdf = new jsPDF("portrait", "px", "a4", "false");
      pdf.setFontSize(14);
      pdf.text(380, 15, "INVOICE");
      //Header Section
      if (props.imageUrl) {
        pdf.addImage(props.imageURL, "png", 10, 10, 100, 100);
      }
      // pdf.addFont('Times-Roman', 'Arial', 'normal');
      // pdf.setFont('Times-Roman');
      pdf.setFontSize(12);
      if (props.invoice.invoiceNo !== '') {
        pdf.text(340, 150, "INVOICE #");
      }
      // pdf.addFont('Times-Bold', 'bolder')
      // pdf.setFont('Times-Bold')
      pdf.setFontSize(10);
      pdf.text(370, 165, props.invoice.invoiceNo);
      // pdf.setFont('Times-Roman');
      pdf.setFontSize(12);
      if (props.invoice.date !== '') {
        pdf.text(340, 180, "Invoice Date");
      }
      // pdf.setFont('Times-Bold')
      pdf.setFontSize(10);
      pdf.text(350, 195, props.invoice.date);
      // pdf.setFont('Times-Roman');
      pdf.setFontSize(12);
      if (props.invoice.dueDate !== '') {
        pdf.text(350, 210, "Due Date");
      }
      // pdf.setFont('Times-Bold')
      pdf.setFontSize(10);
      pdf.text(350, 225, props.invoice.dueDate);

      //To And From Section
      pdf.setFontSize(13);
      let senderY = 150;
      pdf.text(40, senderY, "From").setFontSize(13);
      senderY += 20

      pdf.text(40, senderY, props.sender.name).setFontSize(10);
      senderY+=10;
      if(props.sender.fname !== '' || props.sender.lname !== ''){
        pdf.text(40, senderY, props.sender.fname + "" + props.sender.lname);
        senderY+=10;
      }
      if(props.sender.address !== ''){
        pdf.text(40, senderY, props.sender.address);
        senderY+=10;
      }
      if(props.sender.address2 !==''){
        pdf.text(40, senderY, props.sender.address2);
        senderY+=10;
      }
      if(props.sender.country !== ''){
        pdf.text(40, senderY, props.sender.country);
        senderY+=10
      }
      if(props.sender.Email !==''){
        pdf.text(40, senderY, props.sender.Email);
        senderY+=10
      }
      if(props.sender.Phone !== ''){
        pdf.text(40, senderY, props.sender.Phone);
        senderY+=10
      }
      if(props.sender.Website !==''){
        pdf.text(40, senderY, props.sender.Website);
        senderY+=10
      }
      if (props.sender.tax !== '') {
        pdf.text(40, senderY+=10, "Tax Registration Number");
        senderY+=10
        pdf.text(40, senderY+=10, props.sender.tax);
        senderY+=10
      }

      pdf.setFontSize(13);
      let recipientY = 150;
      pdf.text(200, recipientY, "To");
      recipientY+=20;
      pdf.text(200, recipientY, props.recipient.Cname).setFontSize(10);
      recipientY+=10;
      if(props.recipient.Cfname !=='' || props.recipient.Clname !==''){
        pdf.text(200, recipientY, props.recipient.Cfname + "" + props.recipient.Clname).setFontSize(10);
        recipientY+=10;
      }
      if(props.recipient.Caddress !==''){
        pdf.text(200, recipientY, props.recipient.Caddress);
        recipientY+=10;
      }
      if(props.recipient.Caddress2 !==''){
        pdf.text(200, recipientY, props.recipient.Caddress2);
        recipientY+=10;
      }
      if(props.recipient.Ccountry !==''){
        pdf.text(200, recipientY, props.recipient.Ccountry);
        recipientY+=10
      }
      if(props.recipient.extra !==''){
        pdf.text(200, recipientY, props.recipient.extra);
        recipientY+=10
      }

      if(props.recipient.CEmail!==''){
        pdf.text(200, recipientY, props.recipient.CEmail);
        recipientY+=10;
      }



      const newList = props.items.slice();
      if (add) {
        newList.push(props.item)
      }
      const newArray = newList.map(({ id, item_total, ...rest }) => {
        return rest;
      });

      const newItems = newArray.slice();

      for (let index = 0; index < newItems.length; index++) {
        const element = newItems[index];
        newItems[index].item_total =
          parseInt(element.item_qty) * parseInt(element.item_rate);
      }
      var index;
      if(recipientY > senderY){
        index = recipientY
        index = index + 50;
      }else{
        index = senderY
        index = index + 50;
      }
      const values = newItems.map((e) => Object.values(e));
      pdf.autoTable({
        head: [["Item", "HRS/QTY", "Rate", "TAX(%)", "Description", "SUBTOTAL"]],
        body: values,
        startY: index,
        styles: { fillColor: "#a8a4a3" },
      });

      for (let i = 0; i < newItems.length; i++) {
        index += 70;
      }



      if (index >= pdf.internal.pageSize.height) {
        pdf.addPage();
        index = 0;
      }
      pdf.setFontSize(13);
      if (props.notes.notes) {
        pdf.text(40, index, "Notes");
      }
      pdf.text(300, index, "Invoice Summary");
      pdf.setFontSize(9);

      index = index + 15;
      if (props.notes.notes) {
        pdf.text(40, index, props.notes.notes);
      }
      pdf.text(300, index, `Subtotal (${props.invoice.currency})`);
      pdf.text(
        360,
        index,
        formatter(props.subTotal).toString()
      );

      index = index + 15;

      pdf.text(300, index, `Tax (${props.invoice.currency})`);
      pdf.text(
        360,
        index,
        formatter(props.totalTax).toString()
      );

      index = index + 15;

      pdf.text(300, index, `Total (${props.invoice.currency})`);
      pdf.text(
        360,
        index,
        formatter(props.total).toString()
      );

      pdf.save("invoice" + Date.now() + ".pdf");
    }
  }
  return (
    <>
      <button onClick={props.resetData} className="border border-emerald-500 text-emerald-500 rounded-lg  py-2 px-7 font-semibold">
        Reset
      </button>
      <button
        onClick={toPDF}
        className="border flex items-center gap-2 bg-emerald-500 rounded-lg text-white py-2 px-10 font-semibold"
      >
        {" "}
        <img src={"/download.png"} alt="download" /> Download
      </button>
      {error && <AlertModal message={message} setErrorState={setErrorState} />}
    </>
  );
};

export default PDFGenerator;