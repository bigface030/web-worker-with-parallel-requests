const worker = generateWorker();

const viaWorker = (drink) => {
  worker.postMessage(drink);
  return new Promise((resolve) => {
    worker.onmessage = (e) => {
      resolve(e.data); // drink
    };
  });
};

async function handleButtonClick() {
  for (let i = 0; i < 3; i++) {
    const resolvedValue = await viaWorker('阿娘喂翡翠檸檬綠茶');
    console.log(resolvedValue, '做好了'); // drink
  }
}

// function handleButtonClick() {
//   for (let i = 0; i < 3; i++) {
//     const id = crypto.randomUUID();
//     viaWorker({ id, drink: '阿娘喂翡翠檸檬綠茶' }).then((data) => {
//         console.log(`我是 ${id}, 拿到 ${data.id} 的 ${data.drink}`); // id, drink
//     });
//   }
// }
