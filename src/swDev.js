export default function swDev(){
    let swUrl = `${process.env.PUBLIC_URL}/sw.js`
    navigator.serviceWorker.register(swUrl)
    .then((res) => {
        console.log("Response from ServerWorker",res);
    }).catch((err) => {
        console.log("Error from ServerWorker",err);
    })
}