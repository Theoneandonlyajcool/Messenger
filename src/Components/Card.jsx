import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";
import { Delete_Api } from "../Services/Fetch_Calls";
import { data } from "react-router-dom";

const Card = ({ Data, Refresh }) => {
  const [Delete, SetDelete] = useState(false);
  return (
    // Card _cont
    <div
      onMouseEnter={() => SetDelete(true)}
      onMouseLeave={() => SetDelete(false)}
      className={`border border-teal-600 h-[8rem] w-[35rem] my-4 rounded-lg flex justify-center items-center shadow-teal-500 shadow-sm`}
    >
      <div className="w-full max-w-[95%]  h-full max-h-[95%] relative flex justify-around flex-col">
        <h1 className="font-bold text-2xl text-gray-900">{Data.username}</h1>
        <p className="text-gray-800 text-xl">{Data.message}</p>
        <p className="absolute top-0 right-0 text-gray-600">{Data.time}</p>

        {Delete && (
          <button
            className="absolute bg-gradient-to-tr from-red-600 text-white font-bold px-4 rounded-lg py-1 to-red-900 right-0 bottom-4 flex items-center gap-1"
            onClick={async () => {
              Delete_Api(Data.id);
              Refresh();
            }}
          >
            Delete <AiFillDelete className="text-2xl text-red-100 font-bold " />
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
