export function captureUserMedia(callback: any) {
    //var params = { audio: false, video: true};
    console.log(1)
    navigator.mediaDevices.getDisplayMedia().then(callback, (error) => {
        alert(JSON.stringify(error));
    });
}

export function getFileName() {
    var d = new Date();
    var year = d.getUTCFullYear();
    var month = d.getUTCMonth();
    var date = d.getUTCDate();
    var fileExtension = 'webm';
    return 'RecordRTC-' + year + month + date + '.' + fileExtension;
}
