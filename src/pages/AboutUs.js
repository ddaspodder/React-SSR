import React from "react";

const AboutUs = (props) => {
  return (
    <main>
      <div>
        <h1>About Us</h1>
        <p>{props.data.message}</p>
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
      res({ message: "This is About Us Page" });
    }, 2000);
  });
};

export default AboutUs;
