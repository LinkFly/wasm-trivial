import {Service, project} from '@wasm/studio-utils';

const file = project.getFile('src/main.c');

// @ts-ignore
const fn = async () => {
  const data = await Service.compileFile(file, 'c', 'wasm', '-g -O3');
  const outWasm = project.newFile('out/main.wasm', 'wasm', true);
  outWasm.setData(data);
};

// @ts-ignore
let promise = fn();
