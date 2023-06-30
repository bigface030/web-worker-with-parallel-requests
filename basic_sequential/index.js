const worker = generateWorker();

let count = 0;
worker.onmessage = (e) => {
  console.log(`${e.data} 做好了`); // drink
  if (++count < 3) {
    handleButtonClick();
  }
};

function handleButtonClick() {
  worker.postMessage('阿娘喂翡翠檸檬綠茶');
}
