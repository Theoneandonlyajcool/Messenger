const Baseurl = "http://localhost:5000/messages";

export const Fetch_Api_Data = () => {
  fetch(Baseurl, { method: "GET" });
};

export const Delete_Api = async (CardId) => {
  fetch(`http://localhost:5000/messages${CardId}`, { method: "DELETE" });
};
