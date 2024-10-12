import { create } from "zustand";

interface KakaoMapState {
    // 현재 위치
    location: { latitude: number; longitude: number };
    setLocation: (location: { latitude: number; longitude: number }) => void;

    // 출발지, 도착지
    startEndPoint: {
        startPoint: { address_name: any; x: any; y: any; }
        endPoint: { address_name: any; x: any; y: any; };
    };

    setStartEndPoint : (
        startEndPoint:{ address_name: any; x: any; y: any; },
        isOrigin:boolean,
    )=>void;

}

const useKakaoMapStore = create<KakaoMapState>((set) => ({
    location: {
        latitude: 33.450701,
        longitude: 126.570667,
    },
    setLocation: (location) => set({ location }), 

    startEndPoint: {
        startPoint: { address_name: "", x: "", y: "" },
        endPoint: { address_name: "", x: "", y: "" },
    },

    setStartEndPoint: (newPoint: any, isOrigin: boolean) => set((state) => ({
        startEndPoint: {
          ...state.startEndPoint,
          ...(isOrigin ? { startPoint: newPoint } : { endPoint: newPoint }),
        }
      })),

}));

export default useKakaoMapStore;
