/**
 * @author TIB
 * @namespace admindev
 * ---------------------------------------------------------------
 * Oggetto gestione dell'interfaccia
 */
(function() {

    let ns = admindev.album;
    let _this = null;

    /**
     * Costruttore della classe Album
     * @constructor
     */
    ns.Album = function() {
        _this = this;

        // -- valori attuali --
        this._utility = Utility;

        // -- elementi html
        this._ulAlbum = $('#album_ul');
        this._token = $('#_token');

        // -- event
        this._ulAlbum.on('click', 'a .btn-danger', this._onCLickAlbum.bind(this));
    };

    ns.Album.getInstance = function() {
        if (_this === null) _this = new ns.Album();
        return _this;
    };

    // -- Handler Event
    ns.Album.prototype._onCLickAlbum = function(e) {
        e.preventDefault();
        let url = $(e.target).attr('href');
        let li = e.target.parentNode;
        $.ajax(G_baseUrl + url, {
            method: 'DELETE',
            data: {
              '_token': this._token.val()
            },
            complete: this._onSuccessDeleteAlbum.bind(this, li)
        })
        //this._utility.request(G_baseUrl + url, this._utility.onSuccessDeleteAlbum.bind(this), 'elenco_attivita', 'GET');
    };

    ns.Album.prototype._onSuccessDeleteAlbum = function(li, res) {
        if(res.responseText == 1){
            $(li).remove()
        }else{
            alert('problemi');
        }
    };

})();
