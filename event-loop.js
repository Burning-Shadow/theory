new Promise(resolve => {
  resolve();
})
  .then(() => {
    new Promise(resolve => {
      resolve();
    })
      .then(() => { console.log(111); })
      .then(() => { console.log(222); });
  })
  .then(() => {
    new Promise((resolve => {
      resolve()
    }))
      .then(() => {
        new Promise((resolve) => {
          resolve()
        })
          .then(() => { console.log(333) })
          .then(() => { console.log(444) })
      }).then(() => {
        console.log(555);
      })
  }).then(() => {
    console.log(666);
  });

new Promise(resolve => {
  resolve();
}).then(() => {
  console.log('then1');
  console.log('推1-1入队');
  new Promise(resolve => {
    resolve();
  }).then(() => {
    console.log('then1-1');
    console.log('推1-2入队');
  }).then(() => {
    console.log('then1-2')
  });
  console.log('推2入队');
}).then(() => {
  console.log('then2');
  console.log('推2-1入队');
  new Promise(resolve => {
    resolve();
  }).then(() => {
    console.log('then2-1');
    console.log('推2-1-1入队');
    new Promise((resolve) => {
      resolve();
    }).then(() => {
      console.log('then2-1-1');
      console.log('推2-1-2入队');
    }).then(() => {
      console.log('then2-1-2')
    });
    console.log('推2-2入队');
  }).then(() => {
    console.log('then2-2');
    console.log('推2-3入队');
  }).then(() => {
    console.log('then2-3');
  });
  console.log('推3入队');
}).then(() => {
  console.log('then3');
  console.log('推3-1入队');
  new Promise(res => {
    res();
  }).then(() => {
    console.log('then3-1');
    console.log('推3-2入队');
  }).then(() => {
    console.log('then3-2');
  });
});