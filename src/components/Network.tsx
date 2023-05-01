import { createSignal } from "solid-js";

const Network = () => {
  const socket = new WebSocket("ws://127.0.0.1:9001");
  const [upload, setUpload] = createSignal({ first: 0, second: 0 });
  const [download, setDownload] = createSignal({ first: 0, second: 0 });
  socket.onopen = () => {
    setInterval(() => {
      socket.send("network");
    }, 250);
  };
  socket.onmessage = (ev) => {
    const resp = JSON.parse(ev.data);
    const data = resp.data.split(" ");
    console.log(data);
    if (upload().first === 0) {
      setUpload({ first: data[1], second: data[1] });
      setDownload({ first: data[0], second: data[0] });
    } else {
      setUpload({ first: upload().second, second: data[1] });
      setDownload({ first: download().second, second: data[0] });
    }
  };
  return (
    <div class="ml-4 mt-4 h-fit w-fit rounded bg-gray-600 px-4 py-2 shadow shadow-black">
      <p class="text-2xl">Network</p>
      <p>Upload</p>
      <p class="text-green-500">{upload().second - upload().first} KB/s</p>
      <p>Download</p>
      <p class="text-green-500">{download().second - download().first} KB/s</p>
    </div>
  );
};

export default Network;
