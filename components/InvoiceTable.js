import React from 'react'

const InvoiceTable = (props) => {

  return (
    <>
      <div>

        <div className="overflow-x-auto relative">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="py-3 px-6 text-center">
                  ITEM
                </th>
                <th scope="col" className="py-3 px-6 text-center">
                  HRS/QTY
                </th>
                <th scope="col" className="py-3 px-6 text-center">
                  RATE
                </th>
                <th scope="col" className="py-3 px-6 text-center">
                  TAX
                </th>
                <th scope="col" className="py-3 px-6">
                  SUBTOTAL
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {props.items.map((item) =>
                <tr key={item.id} className="bg-white border-b">
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap ">
                    
                    <div className='flex flex-col'>
                    <div>
                    {item.item_name}
                    </div>
                    <p className='text-gray-500'>

                    {item.item_desc}
                    </p>
                      
                    </div>
                  </th>
                  <td className="py-4 px-6 text-center">
                    {item.item_qty}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {item.item_rate}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {item.item_tax}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {props.formatter(item.item_rate * item.item_qty)}
                  </td>
                  <td className="py-4 px-6">
                    <i
                      onClick={() => {
                        props.deleteItem(item.id);
                      }}
                      className="fa fa-trash-o cursor-pointer ml-2 mb-1"
                      aria-hidden="true"
                    ></i>
                  </td>
                </tr>
              )}

              {
                !props.addMore && <> <tr className="bg-white border-b">
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowra">
                    <div className='flex flex-col'>
                      <input
                        value={props.item.item_name}
                        onChange={props.itemOnChange}
                        type="text"
                        name="item_name"
                        id="item_name"
                        placeholder="Item Name"
                        className="mt-1 border border-gray-300 rounded py-1 px-3 placeholder:font-normal placeholder:text-sm xl:w-full s:w-56 "
                      />
                      <input
                        value={props.item.item_desc}
                        onChange={props.itemOnChange}
                        type="text"
                        name="item_desc"
                        id="item_desc"
                        placeholder="Description"
                        className="mt-2  border border-gray-300 rounded py-1 px-3 placeholder:font-normal placeholder:text-sm lg:w-96"
                      />
                    </div>
                  </th>
                  <td className="py-4 px-6 ">
                    <div className='flex flex-col'>
                      <input
                        value={props.item.item_qty}
                        onChange={props.itemOnChange}
                        type="number"
                        name="item_qty"
                        id="item_qty"
                        className="mt-1  border border-gray-300 rounded py-1 px-3 placeholder:font-normal placeholder:text-sm  w-16   "
                      />
                      <div className='py-5'></div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className='flex flex-col'>
                      <input
                        value={props.item.item_rate}
                        onChange={props.itemOnChange}
                        type="number"
                        name="item_rate"
                        id="item_rate"
                        className="mt-1 border border-gray-300 rounded py-1 px-3 placeholder:font-normal placeholder:text-sm  w-16  "
                      />
                      <div className='py-5'></div>
                    </div>
                  </td>
                  <td className="py-4 px-6 ">
                    <div className='flex flex-col'>
                      <input
                        value={props.item.item_tax}
                        onChange={props.itemOnChange}
                        type="number"
                        name="item_tax"
                        id="item_tax"
                        className="mt-1  border border-gray-300 rounded py-1 px-3 placeholder:font-normal placeholder:text-sm  w-16  "
                      />
                      <div className='py-5'></div>
                      
                    </div>
                  </td>
                  <td className="py-4 px-6 ">
                    <div className='flex flex-col'>
                      <span className="w-20">{props.formatter(props.item.item_qty * props.item.item_rate)}</span>
                    </div>
                    <div className='py-5'></div>
                  </td>

                  <td>
                    <div className='flex flex-col'>
                    <i
                        onClick={props.addItems}
                        className="fa fa-check-circle text-emerald-500 cursor-pointer py-5 text-center "
                        aria-hidden="true"
                      ></i>
                      <div className='py-5'></div>
                    </div>
                  </td>
                </tr>
                  <tr>
                    <th>

                    </th>
                  </tr>
                </>
              }

            </tbody>
          </table>
        </div>

      </div>
    </>
  )
}

export default InvoiceTable