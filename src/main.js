const wasmFile = '../out/main.wasm';
let instance = null;
let s = "";

function syscall(instance, n, args) {
  switch (n){
    default:
      // console.log("Syscall " + n + " NYI.");
      console.log(instance, n, args);
      break;
    //case /* brk */ 45: return 0;
    case /* writev */ 146:
      return instance.exports.writev_c(args[0], args[1], args[2]);
  }
}

((async () => {
  let response = await fetch(wasmFile);
  let wasmBytes = await response.arrayBuffer();
  let createResult = await WebAssembly.instantiate(wasmBytes, {
    env: {
      __syscall0: function __syscall0(n) { return syscall(instance, n, []); },
      __syscall1: function __syscall1(n, a) { return syscall(instance, n, [a]); },
      __syscall2: function __syscall2(n, a, b) { return syscall(instance, n, [a, b]); },
      __syscall3: function __syscall3(n, a, b, c) { return syscall(instance, n, [a, b, c]); },
      __syscall4: function __syscall4(n, a, b, c, d) { return syscall(instance, n, [a, b, c, d]); },
      __syscall5: function __syscall5(n, a, b, c, d, e) { return syscall(instance, n, [a, b, c, d, e]); },
      __syscall6: function __syscall6(n, a, b, c, d, e, f) { return syscall(instance, n, [a, b, c, d, e, f]); },
      putc_js: function (c) {
        c = String.fromCharCode(c);
        if (c === "\n") {
          console.log(s);
          s = "";
        } else {
          s += c;
        }
      }
    }
  });
  instance = createResult.instance;
  console.log(instance.exports.main());
})());

