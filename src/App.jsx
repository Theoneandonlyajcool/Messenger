import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./Components/Card";

const App = () => {
  const [cardData, SetcardData] = useState([]);

  const Baseurl = "http://localhost:5000/messages";

  const Fetch_api = async () => {
    try {
      const res = await fetch(Baseurl, { method: "GET" });
      const data = await res.json();
      SetcardData(data);
    } catch (error) {
      console.log(`The error is ${error}`);
    }
  };

  // console.log(new Date().getTime());

  useEffect(() => {
    Fetch_api();
  }, []);

  const mapped = cardData.map((ele, idx) => {
    return <Card Data={ele} key={ele.id} />;
  }, []);

  return (
    <div className="border-2 border-blue-700 h-fit flex flex-col  items-center">
      <div>{mapped}</div>

      <form
        action="
      submit"
        className="my-8 flex gap-4 flex-col"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Mary smith"
          className="border px-2 py-3 text-xl text-gray-900  border-teal-700 outline-none rounded-md"
        />
        <textarea
          type="text"
          placeholder="Message"
          className="px-2 py-1 border border-teal-700 outline-none w-[30rem] h-[10rem] rounded-md"
        />

        <button className="bg-gradient-to-t from-teal-700 to-teal-900 text-white font-semibold px-8 py-2 rounded-lg text-xl ">
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
