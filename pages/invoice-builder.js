/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import Header from "../components/Header";
import Item from "../components/InvoiceItem";
import InvoiceTable from "../components/InvoiceTable";
import AlertModal from "../components/Modals/AlertModal";
import RecipientModal from "../components/Modals/RecipientModal";
import SenderModal from "../components/Modals/SenderModal";

import PDFGenerator from "../components/PDFGenerator";

const Home = () => {
  const [notes, setNotes] = useState({ notes: "" });
  const onNotesChange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };
  const [border, setBorder] = useState({ recipientCompanyName: false, senderCompanyName: false, itemName: false, itemQuantity: false, itemRate: false })
  const manageBorders = () => {
    setBorder({ recipientCompanyName: false, senderCompanyName: false, itemName: false, itemQuantity: false, itemRate: false })
  }
  const [error, setError] = useState(false);
  const setErrorState = () => {
    setError(false);
  };
  //Invoice Related
  const [totalTax, setTotalTax] = useState(0);
  const [invoice, setInvoice] = useState({
    invoiceNo: "",
    date: "",
    dueDate: "",
    currency: "USD",
  });

  const invoiceOnChange = (e) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [addMore, setAddMore] = useState(true);
  const [item, setItem] = useState({
    id: Math.random().toString(),
    item_name: "",
    item_qty: "",
    item_rate: "",
    item_tax: "",
    item_desc: "",
  });
  const [items, setItems] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

  //Image Related
  const inpRef = useRef();

  const loadImage = () => {
    inpRef.current.click();
  };

  const handleImage = (e) => {
    const images = e.target.files[0];

    const urlImage = URL.createObjectURL(images);

    setImageURL(urlImage);
    setImageLoaded(true);
  };

  const formatter = (value) => {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: invoice.currency,

    });

    return formatter.format(value)
  }

  //Adding Items
  const setItemBorder = () => {
    if (item.item_name === '') {
      setBorder({ itemName: true })
    } else if (item.item_qty === '') {
      setBorder({ itemQuantity: true })
    } else if (item.item_rate === '') {
      setBorder({ itemQuantity: true })
    }
  }
  const addItems = () => {
    if (item.item_name === '' || item.item_qty === '' || item.item_rate === '') {
      if (item.item_name === "") {
        setBorder({ itemName: true })
        setError(true);
      }
      if (item.item_qty === "") {
        setBorder({ itemQuantity: true })
        setError(true)
      }
      if (item.item_rate === "") {
        setBorder({ itemRate: true })
        setError(true)
      }

    }
    else {
      setItems(items.concat(item));
      setSubTotal(subTotal + item.item_qty * item.item_rate);
      if (item.item_tax !== '') {
        var sub = subTotal + item.item_qty * item.item_rate;
        var tax = parseInt(item.item_tax);
        var item_total = item.item_qty * item.item_rate;
        tax = tax / 100;
        tax = tax * item_total;
        tax = Math.round((tax + Number.EPSILON) * 100) / 100;

        setTotalTax(totalTax + tax);
        var T_tax = totalTax + tax;

        setTotal(sub + T_tax);
      } else {
        setTotalTax(0)
        setTotal(subTotal + item.item_qty * item.item_rate)
      }

      setItem({
        id: Math.random().toString(),
        item_name: "",
        item_qty: "",
        item_rate: "",
        item_tax: "",
        item_total: "0.00",
        item_desc: "",
      });
      setAddMore(false);
    }
  };
  const itemOnChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  //Deleting an Item
  const deleteItem = (id) => {
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      if (element.id === id) {
        if (items.item_tax !== '') {
          var tax = element.item_tax / 100;
          tax = tax * element.item_qty * element.item_rate;
          const totalamm = element.item_qty * element.item_rate;
          setTotal(total - tax - totalamm);

          setSubTotal(subTotal - totalamm);
          setTotalTax(totalTax - tax);
        } else {
          setTotalTax(total - element.item_qty * element.item_rate)
          setSubTotal(subTotal - totalamm);
        }
        setAddMore(true)
      }
    }

    const newList = items.filter((item) => {
      return item.id !== id;
    });
    setItems(newList);
  };

  //Modal Related
  const [showModal, setShowModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);

  //Sender Data
  const [sender, setSender] = useState({
    name: "",
    country: "",
    fname: "",
    lname: "",
    tax: "",
    Email: "",
    address: "",
    address2: "",
    Phone: "",
    Website: "",
  });
  const [showSender, setShowSender] = useState(false);
  const onChangeSender = (event) => {
    setSender({ ...sender, [event.target.name]: event.target.value });
  };

  const updateSender = () => {
    if (
      sender.name !== ""

    ) {
      setShowModal(false);
      setShowSender(true);
    } else {
      setError(true);
      setBorder({ senderCompanyName: true })
    }
  };

  //Recipient Data
  const [recipient, setRecipient] = useState({
    Cname: "",
    Ccountry: "",
    Cfname: "",
    Clname: "",
    CEmail: "",
    Caddress: "",
    Caddress2: "",
    CPhone: "",
    extra: "",
  });
  const [showRecipient, setShowRecipient] = useState(false);

  const onClientChange = (event) => {
    setRecipient({ ...recipient, [event.target.name]: event.target.value });
  };

  const updateRecipient = () => {
    if (
      recipient.Cname !== ""

    ) {
      setShowClientModal(false);
      setShowRecipient(true);
    } else {
      setError(true);
      setBorder({ recipientCompanyName: true })
    }
  };

  const closeModal = () => {
    setShowModal(false);
    
  };

  const closeRecipientModel = () => {
    setShowClientModal(false);
  };

  //RESET DATA
  const resetData = () => {
    setImageURL(''); setImageLoaded(false);
    setSender({
      name: "",
      country: "",
      fname: "",
      lname: "",
      tax: "",
      Email: "",
      address: "",
      address2: "",
      Phone: "",
      Website: "",
    })

    setRecipient({
      Cname: "",
      Ccountry: "",
      Cfname: "",
      Clname: "",
      CEmail: "",
      Caddress: "",
      Caddress2: "",
      CPhone: "",
      extra: "",
    })
    setInvoice({
      invoiceNo: "",
      date: "",
      dueDate: "",
      currency: "USD",
    })
    setItem({
      id: Math.random().toString(),
      item_name: "",
      item_qty: "",
      item_rate: "",
      item_tax: "",
      item_total: "0.00",
      item_desc: "",
    })
    setItems([])
    setAddMore(true);
    setSubTotal(0)
    setTotalTax(0)
    setTotal(0)
    setShowSender(false);
    setShowRecipient(false);
  }

  return (
    <>
      <Header />

      <div className="form py-4 max-w-[900px] m-auto relative -top-12  ">
        <div className="flex flex-col border p-6  shadow-lg shadow-gray-500/50 bg-white rounded-md">
          <div className="flex flex-col xl:flex-row md:flex-row 2xl:flex-row sm:flex-row justify-between">
            {imageLoaded === false ? (
              <div
                onClick={loadImage}
                className="mt-1 bg-slate-50 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
              >
                <div className="left flex flex-col items-center">
                  <img
                    src={"/uploader.png"}
                    alt="upload here"
                    className="w-10"
                  />
                  <span className="text-center">
                    Drag your logo here, or{" "}
                    <input
                      ref={inpRef}
                      onChange={handleImage}
                      className="hidden"
                      type="file"
                      name=""
                      id=""
                    />{" "}
                    <p className="text-emerald-500 font-bold">browse</p>{" "}
                  </span>
                  <p className="text-zinc-500 ">Max. File size: 25 MB</p>
                </div>
              </div>
            ) : (
              <div>
                {" "}
                <img className="w-52" src={imageURL} alt="" />{" "}
              </div>
            )}

            <div className="right flex flex-col gap-1 s:my-4 ">
              <div className="flex items-center justify-end gap-2">
                <label htmlFor="invoiceNo">Invoice #:</label>
                <input
                  onChange={invoiceOnChange}
                  type="text"
                  name="invoiceNo"
                  id="invoiceNo"
                  placeholder="0001"
                  className="mt-1 placeholder:text-gray-500 placeholder:font-semibold border border-gray-300 rounded p-1 w-20"
                />
              </div>

              <div className="flex flex-row items-center justify-end gap-2">
                <div className="flex justify-end">
                  <label htmlFor="date">Date: </label>
                </div>
                <input
                  onChange={invoiceOnChange}
                  type="date"
                  name="date"
                  id="date"
                  placeholder="0001"
                  className="mt-1 border border-gray-300 rounded p-1 w-fit"
                />
              </div>

              <div className="flex flex-row items-center justify-end gap-2">
                <label htmlFor="dueDate">Due Date: </label>
                <input
                  onChange={invoiceOnChange}
                  type="date"
                  name="dueDate"
                  id="dueDate"
                  placeholder="0001"
                  className="mt-1 border border-gray-300 rounded p-1 w-fit"
                />
              </div>

              <div className="flex flex-row items-center justify-end gap-2">
                <label htmlFor="currency">Currency: </label>
                <select
                defaultValue={'USD'}
                  onChange={invoiceOnChange}
                  id="currency"
                  name="currency"
                  className="border-gray-300 p-1 border h-full pl-2 pr-7 bg-transparent text-gray-800 text-sm font-bold rounded"
                >
                  <option >USD</option>
                  <option>CAD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>PKR</option>
                  <option>CHN</option>
                  <option>CHF</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col 2xl:flex-row xl:flex-row lg:flex-row md:flex-row sm:flex-row justify-between py-10">
            <div>
              <h5 className="font-semibold text-gray-700">From</h5>
              {showSender === false ? (
                <div
                  onClick={() => {
                    setShowModal(true);
                  }}
                  className="mt-1 cursor-pointer gap-1 bg-slate-50 flex flex-col justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md xl-w-96 lg:w-80 md:w-64"
                >
                  <span className="font-semibold text-gray-600">
                    Sender Name
                  </span>
                  <span className="text-zinc-400">Sender Contact Details</span>
                </div>
              ) : (
                <div  onClick={() => { setShowModal(true) }} className="my-2 border-2 bg-slate-50 border-gray-300 border-dashed rounded-md xl-w-96 lg:w-80 md:w-64 p-3">
                  <p className="font-bold"> {sender.name}</p>
                  <p>
                    {sender.fname} {sender.lname}
                  </p>
                  <p>{sender.address}</p>
                  <p>{sender.address2}</p>
                  <p>{sender.country}</p>
                  <div className="my-3"></div>
                  <p>{sender.Email}</p>
                  <p>{sender.Phone}</p>
                  <p>{sender.Website}</p>
                  <div className="my-3"></div>
                  {sender.tax && <p>Tax Registration Number</p>}
                  <p>{sender.tax}</p>
                </div>
              )}
            </div>

            <div>
              <h5 className="font-semibold text-gray-700">To</h5>
              {showRecipient === false ? (
                <div
                  onClick={() => {
                    setShowClientModal(true);
                  }}
                  className="mt-1 cursor-pointer gap-1 bg-slate-50 flex flex-col justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md xl-w-96 lg:w-80 md:w-64"
                >
                  <span className="font-semibold text-gray-600">
                    Recipient Name
                  </span>
                  <span className="text-zinc-400">
                    Recipient Contact Details
                  </span>
                </div>
              ) : (
                <div className="my-2 border-2 bg-slate-50 border-gray-300 border-dashed rounded-md xl-w-96 lg:w-80 md:w-64 p-3" onClick={() => { setShowClientModal(true) }}>
                  <p className="font-bold"> {recipient.Cname}</p>
                  <p>
                    {recipient.Cfname} {recipient.Clname}
                  </p>
                  <p>{recipient.Caddress}</p>
                  <p>{recipient.Caddress2}</p>
                  <p>{recipient.Ccountry}</p>
                  <p>{recipient.extra}</p>
                  <div className="my-3"></div>
                  <p>{recipient.CEmail}</p>
                  <p>{recipient.CPhone}</p>
                </div>
              )}
            </div>
          </div>

          <div className="md:flex s:hidden  2xl:flex-col xl:flex-col lg:flex-col md:flex-col sm:flex-row justify-between items-normal">
            <div className="flex justify-between 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col s:gap-12">
              <div className="2xl:flex-1 xl:flex-1 lg:flex-1 md:flex-1 flex-0">
                <span className="text-gray-700 font-semibold">ITEM</span>
              </div>
              <div className="text-gray-700 font-semibold flex-1 flex justify-evenly w-full  2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col s:gap-16 pr-6">
                <span>HRS/QTY</span>
                <span>RATE</span>
                <span>TAX(%)</span>
                <span>SUBTOTAL</span>
              </div>
            </div>

            <hr className="my-4" />
            {items.map((item) => {
              return <Item deleteItem={deleteItem} key={item.id} item={item} formatter={formatter} />;
            })}

            {addMore && (
              <>
                <div className="flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col justify-between 2xl:gap-24 xl:gap-24 lg:gap-24 md:gap-24 sm:gap-0">
                  <div className="flex-1">
                    <input
                      value={item.item_name}
                      onChange={itemOnChange}
                      type="text"
                      name="item_name"
                      id="item_name"
                      placeholder="Item Name"
                      className={`mt-1 border border-gray-300 rounded py-1 px-3 placeholder:font-normal placeholder:text-sm xl:w-full s:w-56 ${border.itemName && 'border-red-600'}`}
                      onFocus={manageBorders}
                    />
                  </div>
                  <div className="text-gray-700 font-semibold flex-1 flex justify-evenly items-end w-full pr-6 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col gap-9 ">
                    <input
                      value={item.item_qty}
                      onChange={itemOnChange}
                      type="number"
                      name="item_qty"
                      id="item_qty"
                      className={`mt-1  border border-gray-300 rounded py-1 px-3 placeholder:font-normal placeholder:text-sm  w-20 ${border.itemQuantity && 'border-red-600'}  `}
                      onFocus={manageBorders}
                    />
                    <input
                      value={item.item_rate}
                      onChange={itemOnChange}
                      type="number"
                      name="item_rate"
                      id="item_rate"
                      className={`mt-1  border border-gray-300 rounded py-1 px-3 placeholder:font-normal placeholder:text-sm  w-20 ${border.itemQuantity && 'border-red-600'}  `}
                      onFocus={manageBorders}
                    />
                    <input
                      value={item.item_tax}
                      onChange={itemOnChange}
                      type="number"
                      name="item_tax"
                      id="item_tax"
                      className="mt-1  border border-gray-300 rounded py-1 px-3 placeholder:font-normal placeholder:text-sm w-20  "
                    />
                    <div className="text-right flex items-center">
                      <span className="w-20">{formatter(item.item_qty * item.item_rate)}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {addMore && (
            <div className=" justify-between items-center pr-7 md:flex s:hidden" >
              <input
                onChange={itemOnChange}
                type="text"
                name="item_desc"
                id="item_desc"
                placeholder="Description"
                className="mt-2  border border-gray-300 rounded py-1 px-3 placeholder:font-normal placeholder:text-sm lg:w-96"
              />

            </div>
          )}

          <hr className={`mt-6 md:${addMore ? 'block' : 'hidden'} s:hidden`
          } />

          <div className="md:hidden">
            <InvoiceTable items={items} itemOnChange={itemOnChange} addItems={addItems} item={item} formatter={formatter} deleteItem={deleteItem} />
          </div>

          <span
            onClick={() => {
              setAddMore(true);
              addItems();
            }}
            className="text-emerald-500 font-bold mt-1 cursor-pointer  w-fit"
          >
            Add Invoice Item
          </span>

          <div className="flex justify-between flex-col xl:flex-row md:flex-row 2xl:flex-row sm:flex-row">
            <div className="left p-5 flex flex-col ">
              <span className="font-semibold text-gray-700 my-2">Notes</span>
              <textarea
                onChange={onNotesChange}
                className="border border-gray-300 rounded resize-none py-1 px-3 lg:w-80 md:w-80 sm:w-64 w-56"
                name="notes"
                id="notes"
                cols="60"
                rows="2"
              ></textarea>
            </div>

            <div className="right text-base p-5 w-fill">
              <div className="flex justify-between my-3">
                <span>Subtotal</span>
                <span>{formatter(subTotal)}</span>
              </div>
              <div className="flex justify-between my-3">
                <span>Tax</span>
                <span>{formatter(totalTax)}</span>
              </div>

              <hr />
              <div className="flex 2xl:gap-54 xl:gap-36 lg:gap-24 md:gap-16 sm:gap-12 my-3 font-bold text-gray-800 2xl:text-lg lg:text-lg md:text-lg text-sm">
                <span>Total({invoice.currency})</span>
                <span>{formatter(total)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-7 my-5">
          <PDFGenerator
            item={item}
            items={items}
            sender={sender}
            recipient={recipient}
            invoice={invoice}
            imageURL={imageURL}
            subTotal={subTotal}
            totalTax={totalTax}
            total={total}
            notes={notes}
            resetData={resetData}
            border={border}
            setItemBorder={setItemBorder}
            addItems={addItems}

          />
        </div>
      </div>

      {/* //Sender Modal */}

      {showModal && (
        <SenderModal
          updateSender={updateSender}
          closeModal={closeModal}
          sender={sender}
          onChangeSender={onChangeSender}
          border={border}
          manageBorders={manageBorders}
        />
      )}

      {/* //CLient Modal */}

      {showClientModal && (
        <RecipientModal
          updateRecipient={updateRecipient}
          closeRecipientModel={closeRecipientModel}
          recipient={recipient}
          onClientChange={onClientChange}
          border={border}
          manageBorders={manageBorders}
        />
      )}

      {/* //ALERT MODEL */}

      {error && <AlertModal setErrorState={setErrorState} message={'Please Enter all the fields required.'} />}
    </>
  );
};

export default Home;