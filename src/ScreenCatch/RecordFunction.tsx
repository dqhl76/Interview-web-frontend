export function captureUserMedia(callback: any) {
    var params = { audio: true, video: true};
    var mic = { audio: true, video: false};
    console.log(1);
    navigator.mediaDevices.getDisplayMedia(params).then(
        (videoStream)=>{
            navigator.mediaDevices.getUserMedia(mic).then(
                (micStream)=>{
                    var context = new AudioContext();
                    var baseSource = context.createMediaStreamSource(videoStream);
                    var extraSource = context.createMediaStreamSource(micStream);
                    var dest = context.createMediaStreamDestination();
                    var baseGain = context.createGain();
                    var extraGain = context.createGain();
                    baseGain.gain.value = 0.8;
                    extraGain.gain.value = 0.8;
                    baseSource.connect(baseGain).connect(dest);
                    extraSource.connect(extraGain).connect(dest);
                    var result = new MediaStream([videoStream.getVideoTracks()[0], dest.stream.getAudioTracks()[0]]);
                    callback(result);
                }
                , (error) => {
                alert(JSON.stringify(error));
            });
        }
        , (error) => {
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
