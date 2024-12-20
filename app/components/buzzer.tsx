"use client";
import { useEffect, useState } from "react";
import socket from "../../socket";

const Buzzer = (props: any) => {
  const [buzzVisibility, setBuzzVisibility] = useState("");
  const [buzzedVisibility, setBuzzedVisibility] = useState("hidden");
  const [buzzStatus, setBuzzStatus] = useState(false);

  useEffect(() => {
    socket?.on("connect", () => {
      console.log("connected to server");
    });
    socket?.on("buzzer-update", () => {
      setBuzzVisibility("hidden");
      setBuzzStatus(true);
      setBuzzedVisibility("");
    });
    socket?.on("buzzer-reset", () => {
      setBuzzVisibility("");
      setBuzzStatus(false);
      setBuzzedVisibility("hidden");
    });
  });

  return (
    <>
      <div className="grid justify-center items-center w-screen p-0 h-screen m-0 flex-col">
        <button
          onClick={() => {
            socket?.emit("buzzer-pressed", props.team);
          }}
          disabled={buzzStatus}
        >
          <div className="flex-1 justify-center">
            <img
              src={`buzz.svg`}
              className={`justify-center size-[300px] ${buzzVisibility}`}
            />
            <img
              src={`buzzed.svg`}
              className={`justify-center size-[300px] ${buzzedVisibility}`}
            />
          </div>
        </button>
      </div>
    </>
  );
};

export default Buzzer;
