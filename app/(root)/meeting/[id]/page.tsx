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

const Meeting = ({ params }: PageProps) => {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { isLoaded } = useUser();
  
  // Verifikasi bahwa resolvedParams tidak null dan id ada
  const id = resolvedParams?.id;

  const { call, isCallLoading } = useGetCallById(id || ""); // Gunakan string kosong sebagai default jika id undefined

  // Resolve params asynchronously
  useEffect(() => {
    const resolveParams = async () => {
      const result = await params;
      setResolvedParams(result); // Set params when resolved
    };

    resolveParams();
  }, [params]);

  // Loader jika user atau call sedang loading
  if (!isLoaded || isCallLoading || !resolvedParams) return <Loader />;

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
