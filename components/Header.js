import React from "react";

const Header = () => {
  return (
    <>
      <div className="header bg-emerald-600 h-12 flex items-center">
        <h1 className=" text-white ml-4 font-bold text-lg">App logo</h1>
      </div>

      <div className="text-white flex flex-col items-center py-12 bg-emerald-500">
        <h1 className=" font-bold text-3xl">Quickly Create</h1>
        <h1 className=" font-bold text-3xl">and send invoices</h1>

        <h6 className="my-2 text-xl text-center">
          Fill your invoice details below, choose templete and then
          download/send/share it
        </h6>
      </div>
    </>
  );
};

export default Header;
