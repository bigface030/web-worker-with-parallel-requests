const workerCtx = `
    onmessage = (e) => {
        console.log('received by main script');
        setTimeout(() => {
            postMessage(e.data);
            console.log('post back to main script');
        }, Math.random() * 1000);
    };
`;
// const workerCtx = `
//     onmessage = (e) => {
//         console.log('received by main script, id:', e.data.id);
//         setTimeout(() => {
//             postMessage(e.data);
//             console.log('post back to main script');
//         }, Math.random() * 1000);
//     };
// `;

const generateWorker = () => {
  console.log("start new worker");

  const blobWorker = new Blob([workerCtx], { type: "application/javascript" });
  const blobWorker_url = URL.createObjectURL(blobWorker);
  const worker = new Worker(blobWorker_url);
  URL.revokeObjectURL(blobWorker_url);
  return worker;
};
