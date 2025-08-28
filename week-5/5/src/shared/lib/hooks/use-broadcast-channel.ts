import { useEffect } from "react";

interface UseBroadcastChannelProps<T> {
    channelName: string;
    onMessage: (data: T) => void;
}

export const useBroadcastChannel = <T,>({ channelName, onMessage }: UseBroadcastChannelProps<T>) => {
    useEffect(() => {
        const channel = new BroadcastChannel(channelName);

        channel.onmessage = (event: MessageEvent<T>) => {
            onMessage(event.data);
        };

        return () => channel.close();
    }, [channelName, onMessage]);

    const sendMessage = (msg: T) => {
        const channel = new BroadcastChannel(channelName);
        channel.postMessage(msg);
        channel.close();
    };

    return { sendMessage };
};
