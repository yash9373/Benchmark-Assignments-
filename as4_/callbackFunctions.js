function gettData(callBack) {
  setTimeout(() => {
    const done = Math.random() > 0.5;
    if (done) {
      const data = ["a", "b", "c"];
      callBack(data);
    } else callBack(new console.error("Error"));
  }, 2000);
}

gettData(function (error, data) {
  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
});
