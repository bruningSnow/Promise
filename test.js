// // delete require.cache[require.resolve("./myPromise")];
// const myPromise = require("./myPromiseAnswer");

// const t = new myPromise((resolve) => {
//   setTimeout(() => {
//     resolve(4);
//   }, 3000);
// });

// console.log("777");

// t.then(5).then((res) => console.log("res =>", res));

const tt = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 5000);
});

tt.then((res) => console.log("res1 =>", res)).then((res) =>
  console.log("res =>", res)
);
