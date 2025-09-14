import React, { useEffect, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { ImSpinner } from "react-icons/im";
import Card from "./Components/Card";

const App = () => {
  const [cardData, SetcardData] = useState([]);
  const [Time, SetTime] = useState("");
  const [spinner, SetSpinner] = useState(false);
  const [inputValues, SetinputValues] = useState({
    Name: "",
    Text: "",
  });

  const Baseurl = "http://localhost:5000/messages";

  const Fetch_api = async () => {
    try {
      SetSpinner(true);
      const res = await fetch(Baseurl, { method: "GET" });
      const data = await res.json();
      SetcardData(data);
      SetSpinner(false);
    } catch (error) {
      console.log(`The error is ${error}`);
    }
  };

  console.log(Time);

  // For Getting current time
  const GetTime = () => {
    const now = new Date();
    const time = now.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      // second: "2-digit",
      hour12: false,
    });

    // SetTime(time);
    time > "12:00" ? SetTime(`${time} PM`) : SetTime(`${time} AM`);
    // console.log(time > "12:00" ? "pm" : "Am");
  };

  useEffect(() => {
    Fetch_api();
    GetTime();
  }, []);

  const mapped = cardData.map((ele, idx) => {
    return (
      <Card Data={ele} Card_Time={Time} key={ele.id} Card_Refresh={Fetch_api} />
    );
  }, []);

  return (
    <div
      className={` ${
        spinner ? "h-screen justify-center" : "h-fit"
      } flex flex-col  items-center`}
    >
      {/* App Child */}

      {spinner ? (
        <div>
          <ImSpinner className="text-6xl text-teal-700 animate-spin" />
        </div>
      ) : (
        <div className="">
          {/* Content */}
          <div>{mapped}</div>

          {/* Refresh button */}
          <button
            className="fixed top-3 right-3 bg-gradient-to-tr from-teal-500 to-teal-900 text-white font-bold px-5 py-1 rounded-md flex items-center gap-1"
            onClick={() => Fetch_api()}
          >
            Refresh <IoMdRefresh className="font-bold text-[1.3rem]" />
          </button>

          <form
            action="
      submit"
            className="my-8 flex gap-4  items-center flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              fetch(Baseurl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  username: inputValues.Name,
                  message: inputValues.Text,
                  time: Time,
                }),
              });

              SetinputValues({
                Name: "",
                Text: "",
              });
              Fetch_api();
            }}
          >
            <input
              type="text"
              placeholder="Mary smith"
              className="border px-2 py-3 text-xl text-gray-900 w-[30rem] border-teal-700 outline-none rounded-md"
              value={inputValues.Name}
              onChange={(e) =>
                SetinputValues({ ...inputValues, Name: e.target.value })
              }
            />
            <textarea
              type="text"
              placeholder="Message"
              className="px-2 py-1 border border-teal-700 outline-none w-[30rem] h-[10rem] rounded-md"
              value={inputValues.Text}
              onChange={(e) =>
                SetinputValues({ ...inputValues, Text: e.target.value })
              }
            />

            <button className="bg-gradient-to-t from-teal-700 to-teal-900 text-white font-semibold px-8 py-2 rounded-lg text-xl w-[30rem] ">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
