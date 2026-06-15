joinRoom();

async function joinRoom() {
  try {

    const response = await fetch("/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "viewer-" + Date.now(),
        role: "viewer",
      }),
    });

    const data = await response.json();

    const room = new LivekitClient.Room();

    await room.connect(
      "wss://livestream-gdprnnb0.livekit.cloud",
      data.token
    );

    console.log("Viewer connected");

    room.participants.forEach((participant) => {

      participant.tracks.forEach((publication) => {

        if (publication.track) {

          const element =
            publication.track.attach();

          element.style.width = "100%";
          element.style.height = "100%";
          element.style.objectFit = "contain";

          // Double tap fullscreen
          element.addEventListener(
            "dblclick",
            () => {

              if (
                !document.fullscreenElement
              ) {
                element.requestFullscreen();
              } else {
                document.exitFullscreen();
              }

            }
          );

          document
            .getElementById("videoContainer")
            .appendChild(element);
        }
      });
    });

    room.on(
      LivekitClient.RoomEvent.TrackSubscribed,
      (track) => {

        const element = track.attach();

        element.style.width = "100%";
        element.style.height = "100%";
        element.style.objectFit = "contain";

        // Double tap fullscreen
        element.addEventListener(
          "dblclick",
          () => {

            if (
              !document.fullscreenElement
            ) {
              element.requestFullscreen();
            } else {
              document.exitFullscreen();
            }

          }
        );

        document
          .getElementById("videoContainer")
          .appendChild(element);
      }
    );

  } catch (err) {
    console.error("Viewer Error:", err);
  }
}