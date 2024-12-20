"use client";
import socket from "@/socket";
import Buzzer from "../components/buzzer";
import { useEffect, useState } from "react";

export default function Page() {
  const [buzz, setBuzz] = useState("buzz.svg");
  useEffect(() => {
    socket?.on("buzzer-update", () => {
      setBuzz("buzzed.svg");
    });
    socket?.on("buzzer-reset", () => {
      setBuzz("buzz.svg");
    });
  });
  return <Buzzer team="Bride" buzz={`${buzz}`} />;
}
