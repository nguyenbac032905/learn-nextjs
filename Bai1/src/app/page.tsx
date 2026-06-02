"use client"
import { useState } from "react";

const HomePage = () => {
  const [count,setCount] = useState<number>(0);
  return (
    <>
      <h1>hello world</h1>
      <h2>count = {count}</h2>
      <button style={{marginRight:10}} onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(count - 1)}>Decrease</button>
    </>
  );
}
export default HomePage;
