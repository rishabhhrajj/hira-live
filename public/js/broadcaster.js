if (
  sessionStorage.getItem("admin")
  !== "true"
) {
  window.location.href =
    "/admin.html";
}

const roomName = "hira";

document.getElementById("roomInfo").innerText =
  `Room: ${roomName}`;

document
  .getElementById("startBtn")
  .addEventListener("click", startBroadcast);

async function startBroadcast() {
  try {

    const response = await fetch("/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        room: roomName,
        username: "broadcaster",
        role: "broadcaster",
      }),
    });

    const data = await response.json();

    const room = new LivekitClient.Room();

    await room.connect(
      "wss://livestream-gdprnnb0.livekit.cloud",
      data.token
    );

    console.log("Connected to LiveKit");

    const tracks = await LivekitClient.createLocalTracks({
      audio: true,
      video: true,
    });

    for (const track of tracks) {
      await room.localParticipant.publishTrack(track);
    }

    const videoTrack = tracks.find(
      (track) => track.kind === "video"
    );

    if (!videoTrack) {
      throw new Error("Video track not found");
    }

    const videoElement = videoTrack.attach();

    videoElement.id = "localVideo";
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.playsInline = true;
    videoElement.style.width = "700px";

    const oldVideo = document.getElementById("localVideo");

    if (oldVideo) {
      oldVideo.replaceWith(videoElement);
    }

    alert("You are live!");

  } catch (err) {
    console.error("Broadcast Error:", err);
    alert(`Failed to start stream: ${err.message}`);
  }
}