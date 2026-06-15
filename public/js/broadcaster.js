if (
  sessionStorage.getItem("admin")
  !== "true"
) {
  window.location.href =
    "/admin.html";
}

const roomName = "hira";
loadCameras();

async function loadCameras() {

  const devices =
    await navigator.mediaDevices.enumerateDevices();

  const cameras =
    devices.filter(
      device => device.kind === "videoinput"
    );

  const select =
    document.getElementById("cameraSelect");

  select.innerHTML = "";

  cameras.forEach(camera => {

    const option =
      document.createElement("option");

    option.value = camera.deviceId;

    option.text =
      camera.label ||
      `Camera ${select.length + 1}`;

    select.appendChild(option);
  });
}

function updateViewerCount(room) {

  const viewerCount =
    document.getElementById("viewerCount");

  if (!viewerCount) {
    console.warn("viewerCount element not found");
    return;
  }

  viewerCount.innerText =
    room.participants.size;
}

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

    updateViewerCount(room);

    room.on(
      LivekitClient.RoomEvent.ParticipantConnected,
      () => {
        updateViewerCount(room);
      }
    );

    room.on(
      LivekitClient.RoomEvent.ParticipantDisconnected,
      () => {
        updateViewerCount(room);
      }
    );

    const selectedCamera =
  document.getElementById(
    "cameraSelect"
  ).value;

const stream =
  await navigator.mediaDevices
    .getUserMedia({
      video: {
        deviceId: {
          exact: selectedCamera
        },
        width: 1920,
        height: 1080
      },
      audio: true
    });

const videoTrack =
  new LivekitClient.LocalVideoTrack(
    stream.getVideoTracks()[0]
  );

const audioTrack =
  new LivekitClient.LocalAudioTrack(
    stream.getAudioTracks()[0]
  );

await room.localParticipant
  .publishTrack(videoTrack);

await room.localParticipant
  .publishTrack(audioTrack);

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

    const oldVideo =
      document.getElementById("localVideo");

    if (oldVideo) {
      oldVideo.replaceWith(videoElement);
    }

    alert("You are live!");

  } catch (err) {
    console.error("Broadcast Error:", err);
    alert(
      `Failed to start stream: ${err.message}`
    );
  }
}