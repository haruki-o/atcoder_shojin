import nodeCron from "node-cron";
import axios from "axios";
import XMLHttpRequest from "xmlhttprequest"


const getRunContest = async () => {
  try {
    const contest_data = await axios.get("http://localhost:8080/contests")
  }
  catch (err) {
    console.log(err);
  }
}

const getUserSubmission = async () => {
  try {
    const now = Math.floor(Date.now() / 1000);
    console.log(now);
    // const res = await axios.get("https://google.com")
    const res = await axios.get("https://kenkoooo.com/atcoder/atcoder-api/v3/from/1651394464")
    if(res.status === 200){
      console.log(res.data);
    }
    else console.log("era-");
  }
  catch (err) {
    console.log(err);
  }
}
// const test  = () => {
//   var oReq = new XMLHttpRequest.XMLHttpRequest();
//   var res = oReq.open("GET", "google.com");
//   oReq.send();
//   oReq.onload = () => {
//     if (oReq.status != 200) { 
//       console.log(oReq);
//     } else { 
//       console.log(oReq);
//     }
//   }
// }
// nodeCron.schedule('*/10 * * * * * ', () => {
//   // getRunContest();
//   getUserSubmission();
//   // console.log('3s');
// })

getUserSubmission();
// test();