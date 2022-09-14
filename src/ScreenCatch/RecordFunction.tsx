export function captureUserMedia(callback: any) {
    var params = { audio: false, video: true };

    navigator.mediaDevices.getUserMedia(params).then(callback, (error) => {
        alert(JSON.stringify(error));
    });
}
