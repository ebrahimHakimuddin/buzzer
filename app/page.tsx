"use client";
import { useRef, useState } from "react";

const Page = () => {
  const [background1, setBackground1] = useState("bg-red-600");
  const [background2, setBackground2] = useState("bg-blue-600");
  const musicPlayers = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio("buzz.mp3") : undefined
  );
  return (
    <>
      <div className="flex w-screen p-0 h-screen m-0 flex-col">
        <button
          onClick={() => {
            setBackground2("bg-gray-700");
            const modal1 = document.getElementById(
              "modal1"
            ) as HTMLDialogElement;
            musicPlayers.current?.play();
            modal1.showModal();
          }}
          className={`flex-1 ${background1} border-2 text-4xl font-bold border-black`}
        >
          Team Groom
        </button>
        <button
          onClick={() => {
            setBackground1("bg-gray-700");
            const modal2 = document.getElementById(
              "modal2"
            ) as HTMLDialogElement;
            musicPlayers.current?.play();

            modal2.showModal();
          }}
          className={`flex-1 ${background2} border-2 font-bold text-4xl border-black`}
        >
          Team Bride
        </button>
      </div>
      <dialog id="modal1" className="modal">
        <div className="modal-box">
          <h1 className="text-center text-2xl font-bold">
            Team Groom Got The Buzzer!!
          </h1>
          <div className="modal-action flex justify-center">
            <form method="dialog" className="">
              <button
                className="btn"
                onClick={() => {
                  setBackground2("bg-blue-700");
                }}
              >
                Reset Buzzer
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="modal2" className="modal">
        <div className="modal-box">
          <h1 className="text-center text-2xl font-bold">
            Team Bride Got The Buzzer!!
          </h1>
          <div className="modal-action flex justify-center">
            <form method="dialog" className="">
              <button
                className="btn"
                onClick={() => {
                  setBackground1("bg-red-700");
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
};

export default Page;
