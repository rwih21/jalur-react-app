import React, { useEffect, useRef } from "react";
import { CameraOff } from "lucide-react";
import { Badge } from "../ui";

export default function CameraPreview({ stream, recording }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && stream) ref.current.srcObject = stream;
  }, [stream]);
  return (
    <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-950">
      <video
        ref={ref}
        autoPlay
        muted
        playsInline
        className="h-full w-full object-cover"
      />
      {!stream && (
        <div className="absolute inset-0 grid place-items-center text-slate-400/80">
          <CameraOff className="size-8" />
        </div>
      )}
      {recording && (
        <Badge
          variant="destructive"
          className="absolute left-4 top-4 gap-1.5 py-1"
        >
          <span className="size-2 animate-pulse rounded-full bg-destructive-foreground" />
          RECORDING
        </Badge>
      )}
    </div>
  );
}