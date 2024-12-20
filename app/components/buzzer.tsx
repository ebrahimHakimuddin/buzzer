"use client";
import { useEffect, useState } from "react";
import socket from "../../socket";

const Buzzer = (props: any) => {
  useEffect(() => {
    socket?.on("connect", () => {
      console.log("connected to server");
    });
  });

  return (
    <>
      <div className="grid justify-center items-center w-screen p-0 h-screen m-0 flex-col">
        <button
          onClick={() => {
            socket?.emit("buzzer-pressed", props.team);
          }}
        >
          <div className="flex-1 justify-center">
            <img
              src={`${props.buzz}`}
              className="justify-center size-[300px]"
            />
          </div>
        </button>
      </div>
    </>
  );
};

export default Buzzer;
