"use client";
import { useEffect, useRef, useState } from "react";
import socket from "../socket";

export default function Home() {
  const [teamBuzz, setTeamBuzz] = useState("Buzzer Not Pressed");
  const musicPlayers = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio("buzz.mp3") : undefined
  );
  useEffect(() => {
    socket?.on("connect", () => {
      console.log("Desktop Connected");
    });
    socket?.on("buzzer-update", (team) => {
      setTeamBuzz(team.team);
      const modal = document.getElementById("modal") as HTMLDialogElement;
      musicPlayers.current?.play();
      modal.showModal();
    });
  }, []);
  return (
    <>
      <div className="flex justify-center items-center min-h-screen ">
        <div className="p-8 rounded-lg bg-base-200 shadow-lg max-w-md w-full">
          <p className="text-3xl text-center">{`${teamBuzz}`}</p>
        </div>
      </div>
      <dialog id="modal" className="modal">
        <div className="modal-box">
          <h1 className="text-center text-2xl font-bold">
            {`Team ${teamBuzz}`} Got The Buzzer!!
          </h1>
          <div className="modal-action flex justify-center ">
            <form method="dialog" className="">
              <button
                className="btn bg-base-200"
                onClick={() => {
                  socket?.emit("buzzer-reset-pressed");
                  setTeamBuzz("Buzzer Not Pressed");
                }}
              >
                Reset Buzzer
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
