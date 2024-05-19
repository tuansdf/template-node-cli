import axios, { AxiosRequestConfig } from "axios";

const wait = (ms: number): Promise<void> => {
  return new Promise((res) => setTimeout(res, ms));
};

export const netGet = async (url: string, req?: AxiosRequestConfig) => {
  await wait(Math.random() * 1000 + 1000);
  console.time("fetch");
  const res = await axios.get(url, {
    ...req,
    headers: {
      ...req?.headers,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.3",
    },
  });
  console.timeEnd("fetch");
  return res.data;
};
