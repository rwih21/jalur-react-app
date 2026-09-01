import React, { useEffect, useRef } from "react";
import { CameraOff } from "lucide-react";
export default function CameraPreview({ stream, recording }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && stream) ref.current.srcObject = stream;
  }, [stream]);
  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-950">
      <video
        ref={ref}
        autoPlay
        muted
        playsInline
        className="h-full w-full object-cover"
      />
      {!stream && (
        <div className="absolute inset-0 grid place-items-center text-slate-400">
          <CameraOff />
        </div>
      )}
      {recording && (
        <span className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-2 text-xs font-bold text-white">
          ● RECORDING
        </span>
      )}
    </div>
  );
}
