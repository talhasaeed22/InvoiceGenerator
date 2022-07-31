import React from "react";

const Item = (props) => {
  return (
    <>
      <div className="flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col justify-between s:gap-11 text-gray-700 font-semibold sm:pt-5 ">
        <div className="flex-[0.8]">
          <span className="">{props.item.item_name}</span>
        </div>

        <div className=" text-gray-700 font-semibold flex-1 flex justify-between  2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col ">
          <span className="">{props.item.item_qty}</span>
          <span className="">{props.item.item_rate}</span>
          <span className="">{props.item.item_tax}</span>
          <div className="flex justify-end items-center">
          <span className=" ">
            {props.formatter(props.item.item_qty * props.item.item_rate)}
        
          </span>
          <i
          onClick={() => {
            props.deleteItem(props.item.id);
          }}
          className="fa fa-trash-o cursor-pointer ml-2 mb-1"
          aria-hidden="true"
        ></i>
          </div>
        </div>
      </div>

      <div className="md:flex s:hidden justify-between py-2 items-center ">
        <span className="mt-1 py-1 px-3 pb-5 text-gray-500 ">
          {props.item.item_desc}
        </span>
      </div>

      <hr className="pb-4"/>
    </>
  );
};

export default Item;