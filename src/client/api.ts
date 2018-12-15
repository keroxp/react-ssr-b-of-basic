import axios from "axios"

export async function postClick() {
  const {data} = await axios.post("/api/click");
  return data;
}

export async function getClickCount() {
  const {data} = await axios.get("/api/click");
  return data;
}