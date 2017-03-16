/*
 * Copyright (c) 2016. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

/**
 * Created by roberto on 4/23/16.
 */

app.factory('downloadFactory', function () {
    function DownloadManager() {
    }
    DownloadManager.prototype = {
        getData: function (data, opcion) {
            var file = new Blob([data], {type: 'application/pdf'});
            var fileURL = URL.createObjectURL(file);

            var link = document.createElement('a');
            link.href = fileURL;
            if (opcion== 'descargar'){
            	link.download = "report.pdf";
                link.click();	
                }else {
                	window.open(fileURL);
                    document.getElementById('visualizador').setAttribute('src',fileURL);
                }
        },

    };
    return DownloadManager;
});
