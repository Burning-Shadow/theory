const axios = require("axios");
const fs = require("fs");
// let simpleGit = require('simple-git');
async function myFetch() {
  const { data } = await axios.get("http://venus.oa.com/venusapi/pluginrepo/component/management/query?pluginType=system&opStatus=&maintains=&keyword=&currentPage=1&pageSize=20", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "zh-CN,zh;q=0.9",
      "proxy-connection": "keep-alive",
      "x-requested-with": "XMLHttpRequest",
      "cookie": "tapdsession=f62ea72a12e6adf9890c17eb694c623d; t_u=d572f4b6ceb75804|f65a1d8d4a0eefbf; t_uid=fatewang; wsd_ulog=39f5d7520134892b99dcff75685729b9; paas_perm_sessionid=bolwq8nhbik2zpkxbci9mitcjrcypw1y; pgv_pvid=7155902440; x-client-ssid=17f3b33ad53-5cafd4d21bf48325c7395f08db0d15c33815f56c; x-host-key-ngn=17f3b33ad53-f360d8d5b9526c9616e907f0418516fbbddb1b8c; x_host_key_access=a377fea6562b5835f8973d01bd112bba2a334d68_s; x-host-key-front=17f3e1035ec-741a93f25262136be15070f5463b24ef8effbf06; x_host_key=17f43316333-0725bc6edac33dbb3d757d53296fa10343481da2; x-host-key-oaback=17f45742774-3a3985ce399dc1db528f742cc6fac264aac2e5ef; bk_uid=fatewang; km_u=b022a0b3e6ddaf176b6cf70f4012a1d31ef779f94d7241e57df34cfe1767eaf755ca242931931ba2; km_uid=fatewang; bk_ticket=4iXVJQTNt3eusNlgPTWQ8CenT7JeuhK6PB391dMRiLc; _t_uid=1001363383; bcs_sessionid=jli0goruf1chvnswq5vx139jv76fv6us; TCOA_TICKET=TOF4TeyJ2IjoiNCIsInRpZCI6IlBGMlJUZlYxblRuWEhlanZmeTRwS29WSVJxSmNBU3BYIiwiaXNzIjoiMTAuOTkuMjA4LjYxIiwiaWF0IjoiMjAyMi0wMy0xNVQxMDoxMDoyNS4zMzgyODg5NDErMDg6MDAiLCJhdWQiOiIwLjAuMC4wIiwiaGFzaCI6IkM2REM5RjM5MDMyNTBFRjNENDc3RDdCNDAxQjYxOUU3OEU1Q0IzQzFEMzhCNzkwNjgzQTZDRDc2MUZBQjVEODgiLCJuaCI6IjA2N0I5RDA5RjBCNDNCOUM4Q0U2RUUyOEIwNEZENEI5QUVFQkYxNTk3OUQ2MzQ4RjU1RTQwOURFMDBCMDE4M0EifQ; TCOA=PF2RTfV1nTnXHejvfy4pKoVIRqJcASpX; RIO_TCOA_TICKET=tof:TOF4TeyJ2IjoiNCIsInRpZCI6IlBGMlJUZlYxblRuWEhlanZmeTRwS29WSVJxSmNBU3BYIiwiaXNzIjoiMTAuOTkuMjA4LjYxIiwiaWF0IjoiMjAyMi0wMy0xNVQxMDoxMDoyNS4zMzgyODg5NDErMDg6MDAiLCJhdWQiOiIwLjAuMC4wIiwiaGFzaCI6IkM2REM5RjM5MDMyNTBFRjNENDc3RDdCNDAxQjYxOUU3OEU1Q0IzQzFEMzhCNzkwNjgzQTZDRDc2MUZBQjVEODgiLCJuaCI6IjA2N0I5RDA5RjBCNDNCOUM4Q0U2RUUyOEIwNEZENEI5QUVFQkYxNTk3OUQ2MzQ4RjU1RTQwOURFMDBCMDE4M0EifQ; paas_perm_csrftoken=gzImkzv25xIPxVrIaQJ68qgsQVhnabHoXBzpHc69zW5qHnbqB2oqtscIhZZwb3BF; blueking_language=zh-cn; JSESSIONID=C40097A6B57B37AC76D1D5B2348AE2EC",
      "Referer": "http://venus.oa.com/frontend_static/20220310_938124b3/admin.html?sub_page_version=1646895752000",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  })
  const list = data.data.list;
  let vueType = list.filter((item) => {
    return item.uiType === "vue";
  })
  const componentName = vueType.map((item) => item.opCode);
  return componentName;
}

// async function doClone() {
//   const list = await myFetch();
//   console.log(list)
//   list.forEach(item => {
//     simpleGit()
//     .clone(`https://git.woa.com/venus_plugin/${item}.git`)
//     .then((res) => {
//       console.log('finish')
//     });
//   })
// }
// doClone();

async function filter() {
  const originList = await myFetch();
  const list = originList.filter(_ => _.uiType === 'jsp');
  console.log(list);
  fs.writeFile('fs.txt', jspList, (err) => {
    console.log(err);
  });
}


