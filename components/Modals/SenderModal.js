import React from "react";

const SenderModal = (props) => {
  return (
    <>
      <div
        className={`relative z-10 `}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className=" 2xl:flex xl:flex lg:flex md:flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">Sender Contact Details</h3>
                    <i
                      onClick={props.closeModal}
                      className="fa fa-times text-gray-700 cursor-pointer"
                      aria-hidden="true"
                    ></i>
                  </div>

                  <div className="">
                    <div className="flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col items-center justify-between mt-10">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Comapny/Client Name
                        </label>
                        <input
                          value={props.sender.name}
                          onChange={props.onChangeSender}
                          type="text"
                          name="name"
                          id="name"
                          className={`border focus:outline-none border-gray-300 rounded p-2 ${props.border.senderCompanyName && 'border-red-600'}`}
                          placeholder="Company/Client Name"
                          onFocus={props.manageBorders}
                        />
                      </div>
                      <div >
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Country
                        </label>
                        <select
                          value={props.sender.country}

                          onChange={props.onChangeSender}
                          id="country"
                          name="country"
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
                          htmlFor="fname"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Last Name
                        </label>
                        <input
                          value={props.sender.fname}
                          onChange={props.onChangeSender}
                          type="text"
                          name="fname"
                          id="fname"
                          className="border focus:outline-none border-gray-300 rounded p-2"
                          placeholder="First Name"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="lname"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Last Name
                        </label>
                        <input
                          value={props.sender.lname}
                          onChange={props.onChangeSender}
                          type="text"
                          name="lname"
                          id="lname"
                          className="border focus:outline-none border-gray-300 rounded p-2"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>

                    <div className="flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col sm:items-start justify-between mt-5">
                      <div className="flex flex-col">
                        <label
                          htmlFor="tax"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tax Registration No.
                        </label>
                        <input
                          value={props.sender.tax}
                          onChange={props.onChangeSender}
                          type="text"
                          name="tax"
                          id="tax"
                          className="border focus:outline-none border-gray-300 rounded p-2"
                          placeholder="Tax Registration No."
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="Email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          value={props.sender.Email}
                          onChange={props.onChangeSender}
                          type="text"
                          name="Email"
                          id="Email"
                          className="border focus:outline-none border-gray-300 rounded p-2"
                          placeholder="Email"
                        />
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="flex flex-col">
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Address 1
                        </label>
                        <textarea
                          value={props.sender.address}
                          onChange={props.onChangeSender}
                          className="border focus:outline-none border-gray-300 rounded py-1 px-3"
                          name="address"
                          id="address"
                          rows="1"
                        ></textarea>
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="flex flex-col">
                        <label
                          htmlFor="address2"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Address 2
                        </label>
                        <textarea
                          value={props.sender.address2}
                          onChange={props.onChangeSender}
                          className="border border-gray-300 rounded focus:outline-none py-1 px-3 "
                          name="address2"
                          id="address2"
                          rows="1"
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col sm:items-start justify-between mt-5">
                      <div className="flex flex-col">
                        <label
                          htmlFor="Phone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone
                        </label>
                        <input
                          value={props.sender.Phone}
                          onChange={props.onChangeSender}
                          type="text"
                          name="Phone"
                          id="Phone"
                          className="border focus:outline-none border-gray-300 rounded p-2"
                          placeholder="Phone"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="Website"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Website
                        </label>
                        <input
                          value={props.sender.Website}
                          onChange={props.onChangeSender}
                          type="text"
                          name="Website"
                          id="Website"
                          className="border focus:outline-none border-gray-300 rounded p-2"
                          placeholder="Website"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={props.updateSender}
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
    </>
  );
};

export default SenderModal;
