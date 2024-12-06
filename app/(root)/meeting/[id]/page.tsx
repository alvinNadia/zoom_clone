"use client";

import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState, useEffect } from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Meeting = async ({ params }: PageProps) => {
  const resolvedParams = await params; // Tunggu nilai params
  const { id } = resolvedParams; // Ambil id dari resolvedParams

  const { isLoaded } = useUser(); // Untuk user authentication
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(id); // Panggil hook berdasarkan id

  // Loader jika data user atau call masih loading
  if (!isLoaded || isCallLoading) return <Loader />;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
