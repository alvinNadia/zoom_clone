import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGetCalls = () => {
    const [calls, setCalls] = useState<Call[]>([]);
    const [isLoading, setisLoading] = useState(false)
    const client = useStreamVideoClient();
    const { user } = useUser()

    useEffect(() => {
        const loadCalls = async() => {
            if(!client || !user?.id) return;

            setisLoading(true);

            try {
                const response = await client.queryCalls({
                    sort: [{ field: "starts_at", direction: -1 }],
                    filter_conditions: {
                        starts_at: { $exists: true },
                        $or: [
                            { created_by_user_id: user.id },
                            { members: { $in: [user.id] } }
                        ]
                    }
                });
                setCalls(response.calls);
            } catch (error) {
                console.log(error);
            } finally {
                setisLoading(false)
            }
        }
        loadCalls();
    }, [client, user?.id]);

    const now = new Date().toISOString();

    const endedCalls = calls.filter(call => {
        const startTime = call.state?.startsAt ? new Date(call.state.startsAt) : null;
        return startTime && startTime < new Date(now) || call.state?.endedAt;
    });

    const upcomingCalls = calls.filter(call => {
        const startTime = call.state?.startsAt ? new Date(call.state.startsAt) : null;
        return startTime && startTime > new Date(now) && !call.state?.endedAt;
    });

    return {
        endedCalls,
        upcomingCalls,
        callRecordings: calls,
        isLoading,
    }
}