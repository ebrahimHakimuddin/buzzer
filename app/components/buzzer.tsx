"use client";
import { useEffect, useState } from "react";
import socket from "../../socket";

const Buzzer = (team: any) => {
  const [buzz, setBuzz] = useState("buzz.svg");

  useEffect(() => {
    socket?.on("connect", () => {
      console.log("connected to server");
    });
    socket?.on("buzzer-update", () => {
      setBuzz("buzzed.svg");
    });
    socket?.on("buzzer-reset", () => {
      setBuzz("buzz.svg");
    });
  });

  return (
    <>
      <div className="grid justify-center items-center w-screen p-0 h-screen m-0 flex-col">
        <button
          onClick={() => {
            socket?.emit("buzzer-pressed", team);
          }}
        >
          <div className="flex-1 justify-center">
            <img src={`${buzz}`} className="justify-center size-[300px]" />
          </div>
        </button>
      </div>
    </>
  );
};

export default Buzzer;
