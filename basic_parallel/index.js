const worker = generateWorker();

worker.onmessage = ({ data }) => {
  console.log(`顧客 ${data.id} 的 ${data.drink} 做好了`); // id, drink
};

function handleButtonClick() {
  for (let i = 0; i < 3; i++) {
    const id = crypto.randomUUID();
    worker.postMessage({ id, drink: '咪咕嚕嚕' });
  }
}
