import { useEffect } from "react"

interface UseCrossTabFavoritesSyncProps<T> {
    channelName: string;
    onMessage: (data: T) => void;
}


export const useCrossTabFavoritesSync = <T,>({ channelName, onMessage }: UseCrossTabFavoritesSyncProps<T>) => {
    useEffect(() => {
        const channel = new BroadcastChannel(channelName);

        channel.onmessage = (event: MessageEvent<T>) => {
            onMessage(event.data);
        };

        return () => { channel.close()}

    }, [channelName, onMessage])
}


// export const useBroadcastChannel = <T,>({ channelName, onMessage }: UseBroadcastChannelProps<T>) => {