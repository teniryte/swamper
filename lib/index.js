import Worker from './worker';

export default async function createWorker(Class) {
  const worker = new Worker(Class);
  await worker._loadMethodsNames();
  return worker;
}
