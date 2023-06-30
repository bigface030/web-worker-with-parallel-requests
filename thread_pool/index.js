const resolvers = {};

const threadPool = [];
const workerMaximum = 1;
const workerMinimum = 1;

function removeThread(thread) {
  thread.worker.terminate();
  threadPool.splice(threadPool.indexOf(thread), 1);
}

function removeTask(thread, id) {
  thread.tasks = thread.tasks.filter((task) => task !== id);
  if (thread.tasks.length === 0 && threadPool.length > workerMinimum) {
    removeThread(thread);
  }
}

const initThread = () => {
  const worker = generateWorker();
  const thread = {
    worker: worker,
    tasks: [],
  };
  threadPool.push(thread);

  worker.onmessage = ({ data }) => {
    resolvers[data.id](data);
    delete resolvers[data.id];
    removeTask(thread, data.id);
  };

  return thread;
};

const allocateThread = () => {
  const hasIdleWorker =
    threadPool.length > 0 &&
    threadPool.some((thread) => thread.tasks.length === 0);

  if (!hasIdleWorker && threadPool.length < workerMaximum) {
    return initThread();
  } else {
    const index = threadPool.reduce((minIndex, thread, currentIndex) => {
      if (thread.tasks.length < threadPool[minIndex].tasks.length) {
        minIndex = currentIndex;
      }
      return minIndex;
    }, 0);
    return threadPool[index];
  }
};

const viaWorker = (drink) => {
  const id = crypto.randomUUID();
  const thread = allocateThread();
  thread.tasks.push(id);
  thread.worker.postMessage({ id, drink });
  return new Promise((resolve) => {
    resolvers[id] = resolve;
  });
};

function handleButtonClick() {
  for (let i = 0; i < 3; i++) {
    viaWorker('QQㄋㄟㄋㄟ好喝到咩噗茶').then(({ id, drink }) => {
      console.log(`顧客 ${id} 的 ${drink} 做好了`); // id, drink
    });
  }
}
