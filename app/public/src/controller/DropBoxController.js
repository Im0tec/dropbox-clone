class DropBoxController {
    
    constructor() {

        this.btnSendFileEl = document.querySelector('#btn-send-file');
        this.inputFilesEl = document.querySelector('#files');
        this.snackBarModalEl = document.querySelector('#react-snackbar-root');
        this.initEvents();
    }

    initEvents() {

        this.btnSendFileEl.addEventListener('click', event =>{

            this.inputFilesEl.click();
        });

        this.inputFilesEl.addEventListener('change', event =>{

            this.uploadTask(event.target.files);
            this.snackBarModalEl.style.display = 'block';
        });
    }

    uploadTask(files) {

        let promises = [];
        let formData = new FormData();

        [...files].forEach(file => {
            
            promises.push(new Promise((resolve, reject) => {

                let ajax = new XMLHttpRequest();

                ajax.open('POST', '/upload');
                ajax.onload = event => {

                    try{
                        resolve(JSON.parse(ajax.responseText));
                    }catch(e){
                        reject(e);
                    }
                };
                ajax.onerror = event => {
                    reject(event);
                };

                formData.append('input-file', file);
                ajax.send(formData);
            }));
        });
        return Promise.all(promises);
    }
}