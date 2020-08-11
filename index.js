let socket = io.connect('http://localhost:8081')
        socket.on('nouveau', nouveau)
        function nouveau(photo) {
            $('#photos').append($('<img src="'+photo+'"/>'))
        }
        $(function () {
            $('#fichier').bind('change', function (e) {
                let i = 0
                let nbFichiers = e.originalEvent.target.files.length
                for (i; i < nbFichiers; i++) {
                    var fichier = e.originalEvent.target.files[i]
                    var filereader = new FileReader()
                        filereader.onload = function (evt) {
                        socket.emit('nouveau', evt.target.result)
                    }
                    filereader.readAsDataURL(fichier)
                }
            })
        })