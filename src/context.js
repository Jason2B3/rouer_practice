import { useState, createContext, useContext } from "react"; // import useContext
const AAA = createContext();
export const useCustomHook = () => useContext(AAA); // export custom hook

export default function BBB(props) {
  const DUMMY_QUOTES = [
    { id: "q1", author: "max", text: "Learning React is fun!" },
    { id: "q2", author: "Maximilian", text: "Learning React is great!" },
  ];
  const distribution = { DUMMY_QUOTES };
  return <AAA.Provider value={distribution}>{props.children}</AAA.Provider>;
}
