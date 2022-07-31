import React from "react";

const RecipientModal = (props) => {
  return (
    <div
      className={`relative z-10 `}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="  2xl:flex xl:flex lg:flex md:flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="">
                <div className="flex justify-between">
                  <h3 className="font-semibold">New Client</h3>
                  <i
                    onClick={props.closeRecipientModel}
                    className="fa fa-times text-gray-700 cursor-pointer"
                    aria-hidden="true"
                  ></i>
                </div>

                <div className="">
                  <div className="flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col items-center justify-between mt-10">
                    <div>
                      <label
                        htmlFor="Cname"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Comapny/Client Name
                      </label>
                      <input
                        value={props.recipient.Cname}
                        onChange={props.onClientChange}
                        type="text"
                        name="Cname"
                        id="Cname"
                        className={`border focus:outline-none border-gray-300 rounded p-2 ${props.border.recipientCompanyName && 'border-red-600'}`}
                        placeholder="Company/Client Name"
                        onFocus={props.manageBorders}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="Ccountry"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country
                      </label>
                      <select
                        value={props.recipient.Ccountry}
                        onChange={props.onClientChange}
                        id="Ccountry"
                        name="Ccountry"
                        className="border-gray-300 focus:outline-none p-1 border h-[42px] bg-transparent text-gray-800 text-sm font-bold rounded w-[219px]"
                      >
                        <option>United State</option>
                        <option>China</option>
                        <option>Pakistan</option>
                        <option>Germany</option>
                        <option>Australia</option>
                        <option>Korea</option>
                        <option>India</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col sm:items-start justify-between mt-5">
                    <div className="flex flex-col">
                      <label
                        htmlFor="Cfname"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First Name
                      </label>
                      <input
                        value={props.recipient.Cfname}
                        onChange={props.onClientChange}
                        type="text"
                        name="Cfname"
                        id="Cfname"
                        className="border focus:outline-none border-gray-300 rounded p-2"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        htmlFor="Clname"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last Name
                      </label>
                      <input
                        value={props.recipient.Clname}
                        onChange={props.onClientChange}
                        type="text"
                        name="Clname"
                        id="Clname"
                        className="border focus:outline-none border-gray-300 rounded p-2"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>

                  <div className="flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col sm:items-start justify-between mt-5">
                    <div className="flex flex-col">
                      <label
                        htmlFor="CEmail"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        value={props.recipient.CEmail}
                        onChange={props.onClientChange}
                        type="text"
                        name="CEmail"
                        id="CEmail"
                        className="border focus:outline-none border-gray-300 rounded p-2"
                        placeholder="Email"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        htmlFor="CPhone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone
                      </label>
                      <input
                        value={props.recipient.CPhone}
                        onChange={props.onClientChange}
                        type="text"
                        name="CPhone"
                        id="CPhone"
                        className="border focus:outline-none border-gray-300 rounded p-2"
                        placeholder="Phone"
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="flex flex-col">
                      <label
                        htmlFor="Caddress"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address 1
                      </label>
                      <textarea
                        value={props.recipient.Caddress}
                        onChange={props.onClientChange}
                        className="border focus:outline-none border-gray-300 rounded py-1 px-3"
                        name="Caddress"
                        id="Caddress"
                        rows="1"
                      ></textarea>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="flex flex-col">
                      <label
                        htmlFor="Caddress2"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address 2
                      </label>
                      <textarea
                        value={props.recipient.Caddress2}
                        onChange={props.onClientChange}
                        className="border border-gray-300 rounded focus:outline-none py-1 px-3"
                        name="Caddress2"
                        id="Caddress2"
                        rows="1"
                      ></textarea>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="flex flex-col">
                      <label
                        htmlFor="extra"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Extra Data
                      </label>
                      <input
                        value={props.recipient.extra}
                        onChange={props.onClientChange}
                        type="text"
                        name="extra"
                        id="extra"
                        className="border focus:outline-none border-gray-300 rounded p-2 w-fill"
                        placeholder="Extra Data"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={props.updateRecipient}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-500 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-emerald-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipientModal;
