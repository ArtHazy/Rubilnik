export function downloadObj(obj){
    let blob = new Blob([JSON.stringify(obj)], {type: 'octet/stream'});
    let loadURL = window.URL.createObjectURL(blob);
    window.location = loadURL;  
}