
"use client";

import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Type Guard untuk membedakan Call dari CallRecording
const isCall = (meeting: Call | CallRecording): meeting is Call => {
  return "id" in meeting;
};

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();

  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const { toast } = useToast();

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "recordings":
        return recordings;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "recordings":
        return "No Recordings";
      case "upcoming":
        return "No Upcoming Calls";
      default:
        return [];
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings.map((meeting) => meeting.queryRecordings())
        );

        const recordings = callData
          .filter((call) => call.recordings && call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
      } catch (error) {
        toast({ title: "Try again later" });
        console.error("Error fetching recordings:", error);
        setRecordings([]); // Atur nilai default jika terjadi error
      }
    };

    if (type === "recordings") fetchRecordings();
  }, [type, callRecordings, toast]);

  const calls = getCalls();
  const start_time = new Date();
  if (isLoading) return <Loader />;

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={isCall(meeting) ? meeting.id : meeting.filename} // Gunakan `filename` jika `id` tidak tersedia
            icon={
              type === "ended"
                ? "/icons/previous.svg"
                : type === "upcoming"
                ? "icons/upcoming.svg"
                : "icons/recordings.svg"
            }
            title={
              "state" in meeting
                ? meeting.state?.custom?.description?.substring(0, 25) ||
                  "Personal Meeting"
                : "filename" in meeting
                ? meeting?.filename?.substring(0, 20) || "Personal Meeting"
                : "Personal Meeting"
            }
            date={
              "state" in meeting
                ? meeting.state?.startsAt?.toLocaleString() ?? "Invalid Date"
                : start_time.toLocaleString()
            }
            isPreviousMeeting={type === "ended"}
            buttonIcon1={type === "recordings" ? "icons/play.svg" : undefined}
            buttonText={type === "recordings" ? "Play" : "Start"}
            handleClick={
              type === "recordings"
                ? () =>
                    "url" in meeting
                      ? router.push(`${meeting.url}`)
                      : console.error("URL not available")
                : () =>
                    isCall(meeting)
                      ? router.push(`/meeting/${meeting.id}`)
                      : console.error("ID not available")
            }
            link={
              type === "recordings"
                ? "url" in meeting
                  ? meeting.url
                  : "#"
                : isCall(meeting)
                ? `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`
                : "#"
            }
          />
        ))
      ) : (
        <h1>{getNoCallsMessage()}</h1>
      )}
    </div>
  );
};

export default CallList;
