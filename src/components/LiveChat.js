import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomName, makeRandomMessage } from "../utils/helper";
import ChatMessage from "./ChatMessage";

const LiveChat = () => {
  const [liveMessage, setLiveMessage] = useState("");
  const dispatch = useDispatch();
  const chatMessages = useSelector((store) => store.chat.messages);
  useEffect(() => {
    const id = setInterval(() => {
      // api polling
      console.log("api polling");
      dispatch(
        addMessage({
          name: generateRandomName(),
          message: makeRandomMessage(20),
        })
      );
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [dispatch]);
  return (
    <>
      <div className="w-full h-[600px] ml-2 p-2  border border-black  bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
        <div>
          {/* don't use index as keys */}
          {chatMessages?.map((c, index) => (
            <ChatMessage key={index} name={c.name} message={c.message} />
          ))}
        </div>
      </div>
      <form
        className="w-full p-2 ml-2 border border-black flex "
        onSubmit={(e) => {
          e.preventDefault();
          setLiveMessage("");

          dispatch(
            addMessage({
              name: "suresh",
              message: liveMessage,
            })
          );
        }}
      >
        <input
          className="w-96 px-2"
          type="text"
          placeholder="add message"
          value={liveMessage}
          onChange={(e) => {
            setLiveMessage(e.target.value);
          }}
        />
        <button className="px-2 mx-2 bg-green-100">Send</button>
      </form>
    </>
  );
};

export default LiveChat;
