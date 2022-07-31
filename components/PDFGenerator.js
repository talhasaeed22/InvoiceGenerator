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

  const print = (add)=>{
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
    }else{

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
      pdf.text(40, 150, "From").setFontSize(13);
  
      pdf.text(40, 170, props.sender.name).setFontSize(10);
      pdf.text(40, 180, props.sender.fname + "" + props.sender.lname);
      pdf.text(40, 190, props.sender.address);
      pdf.text(40, 200, props.sender.address2);
      pdf.text(40, 210, props.sender.country);
  
      pdf.text(40, 220, props.sender.Email);
      pdf.text(40, 230, props.sender.Phone);
      pdf.text(40, 240, props.sender.Website);
  
      if (props.sender.tax !== '') {
        pdf.text(40, 260, props.sender.tax);
      }
  
      pdf.setFontSize(13);
      pdf.text(200, 150, "To");
      pdf.text(200, 170, props.recipient.Cname).setFontSize(10);
      pdf
        .text(200, 180, props.recipient.Cfname + "" + props.recipient.Clname)
        .setFontSize(10);
      pdf.text(200, 190, props.recipient.Caddress);
      pdf.text(200, 200, props.recipient.Caddress2);
      pdf.text(200, 210, props.recipient.Ccountry);
      pdf.text(200, 220, props.recipient.extra);
  
      pdf.text(200, 230, props.recipient.CEmail);
  
  
  
      const newList = props.items.slice();
      if(add){
        newList.push(props.item)
      }
      const newArray = newList.map(({ id, item_total, ...rest }) => {
        return rest;
      });
      
      
        
      
      console.log(newArray)
      
      const newItems = newArray.slice();
      
      for (let index = 0; index < newItems.length; index++) {
        const element = newItems[index];
        newItems[index].item_total =
          parseInt(element.item_qty) * parseInt(element.item_rate);
      }
  
      const values = newItems.map((e) => Object.values(e));
      pdf.autoTable({
        head: [["Item", "HRS/QTY", "Rate", "TAX(%)", "Description", "SUBTOTAL"]],
        body: values,
        startY: 300,
        styles: { fillColor: "#a8a4a3" },
      });
  
      var index = 300;
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