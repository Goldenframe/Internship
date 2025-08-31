import { useCallback } from "react";

export const useBroadcastChannel = <T>(channelName: string) => {
    const sendMessage = useCallback((msg: T) => {
        const channel = new BroadcastChannel(channelName);
        channel.postMessage(msg);
        channel.close();
    }, [channelName]);

    return { sendMessage };
};