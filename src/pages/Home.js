import React from "react";

const Home = (props) => {
  return (
    <main>
      <div>
        <h1>Home</h1>
        {/* <p>{props.data.message}</p> */}
      </div>
    </main>
  );
};

export const LoadInitialData = (params, searchParams) => {
  console.log(
    "LoadInitialData params",
    params,
    searchParams
  );
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({ message: "This is Home Page" });
    }, 2000);
  });
};

export default Home;
