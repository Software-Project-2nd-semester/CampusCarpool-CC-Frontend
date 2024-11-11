import {create} from "zustand";

interface KakaoMapState {
    // 현재 위치
    location: { latitude: number; longitude: number };
    setLocation: (location: { latitude: number; longitude: number }) => void;

    // 출발지, 도착지
    startEndPoint: {
        startPoint: { address_name: any; x: any; y: any; }
        endPoint: { address_name: any; x: any; y: any; };
    };

    setStartEndPoint: (
        startEndPoint: { address_name: any; x: any; y: any; } | null,
        isOrigin: boolean | null,
    ) => void;

    // 현재 맵
    currentMap: any;
    setCurrentMap: (newCurrentMap: any) => void;

    // 출발지, 도착지 마커
    startEndMarker: {
        startMarker: any,
        endMarker: any,
    };

    setStartEndMarker: (
        newMarker: any,
        isOrigin: boolean,
    ) => void;

}

const useKakaoMapStore = create<KakaoMapState>((set) => ({
    location: {
        latitude: 33.450701,
        longitude: 126.570667,
    },
    setLocation: (location) => set({location}),

    startEndPoint: {
        startPoint: {address_name: null, x: null, y: null},
        endPoint: {address_name: null, x: null, y: null},
    },

    setStartEndPoint: (newPoint: any, isOrigin: boolean | null) =>
        set((state) => ({
            startEndPoint: isOrigin !== null
                ? {
                    ...state.startEndPoint,
                    ...(isOrigin ? {startPoint: newPoint} : {endPoint: newPoint}),
                }
                : {
                    startPoint: {address_name: null, x: null, y: null},
                    endPoint: {address_name: null, x: null, y: null},
                },
        })),

    currentMap: null,
    setCurrentMap: (newCurrentMap: any) => set({currentMap: newCurrentMap}),

    startEndMarker: {
        startMarker: null,
        endMarker: null,
    },

    setStartEndMarker: (newMarker: any, isOrigin: boolean) => set((state) => ({
        startEndMarker: {
            ...state.startEndMarker,
            ...(isOrigin ? {startMarker: newMarker} : {endMarker: newMarker}),
        }
    })),

}));

export default useKakaoMapStore;
