export function captureUserMedia(callback: any) {
    var params = { audio: false, video: true };
  
    navigator.mediaDevices.getUserMedia().then(callback,(error) => {
      alert(JSON.stringify(error))});
  };