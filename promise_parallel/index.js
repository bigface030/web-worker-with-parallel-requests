const worker = generateWorker();
const resolvers = {};

worker.onmessage = ({ data }) => {
  resolvers[data.id](data);
  delete resolvers[data.id];
};

const viaWorker = (drink) => {
  const id = crypto.randomUUID();
  worker.postMessage({ id, drink });
  return new Promise((resolve) => {
    resolvers[id] = resolve;
  });
};

function handleButtonClick() {
  for (let i = 0; i < 3; i++) {
    viaWorker('咪咕嚕嚕').then(({ id, drink }) => {
      console.log(`顧客 ${id} 的 ${drink} 做好了`); // id, drink
    });
  }
}
