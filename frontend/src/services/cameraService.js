export async function requestMedia(constraints = { video: true, audio: true }) {
  return navigator.mediaDevices.getUserMedia(constraints);
}
export function stopMedia(stream) {
  stream?.getTracks().forEach((track) => track.stop());
}
