/**
 * @author TIB
 * @namespace admindev
 * ---------------------------------------------------------------
 * Oggetto gestione dell'interfaccia
 */
(function() {

    let ns = admindev.attivita;
    let _this = null;
    /**
     * Costruttore della classe per la
     * @constructor
     */
    ns.ModalNewAttivita = function() {
        // -- valori attuali --
        this._utility = Utility;
        _this = this;
        //MODALE
        this._modal = $('#attivita_modal');
        this._inpTitle = $('#modal_attivita_title');
        this._selUser = $('#modal_attivita_utente');
        this._selFsn = $('#modal_attivita_fsn');
        this._txtDesc = $('#modal_attivita_descr');
        this._btnSalva = $('#modal_attivita_btn_salva');
        this._token = $('#_token');

        // -- Eventi
        this._modal.on('shown.bs.modal', this._onShowModalAssegna.bind(this));
        this._modal.on('hidden.bs.modal', this._onHiddenModalAssegna.bind(this));
        this._btnSalva.on('click', this._onclickBtnAssegna.bind(this));
        this._inpTitle.on('keyup', this._onKeyUpInputTitle.bind(this));
    };

    ns.ModalNewAttivita.getInstance = function() {
        if (_this === null) _this = new ns.ModalNewAttivita();
        return _this;
    };


    // -- Handler Event
    ns.ModalNewAttivita.prototype._onclickBtnAssegna = function(e) {
        console.log('asesegna')
        let invalid = false;
        if(this._inpTitle.val() === "") {
            invalid = true;
            this._inpTitle.addClass('is-invalid');
        }
        if(this._selFsn.val() === ""){
            invalid = true;
            this._selFsn.addClass('is-invalid');
        }
        if(this._selUser.val() === ""){
            invalid = true;
            this._selUser.addClass('is-invalid');
        }
        if(!invalid)
            this._assegna();
    };

    ns.ModalNewAttivita.prototype._onKeyUpInputTitle = function(e) {
        this._inpTitle.removeClass('is-invalid');
        this._selFsn.removeClass('is-invalid');
        this._selUser.removeClass('is-invalid');
    };

    ns.ModalNewAttivita.prototype._onShowModalAssegna = function(e) {
        //Evento
    };

    ns.ModalNewAttivita.prototype._onHiddenModalAssegna = function(e) {
        this._inpTitle.val('').removeClass('is-invalid');
        this._selFsn.removeClass('is-invalid').empty();
        this._selUser.removeClass('is-invalid').empty();
    };

    ns.ModalNewAttivita.prototype._getUsers = function() {
        this._utility.request(G_baseUrl + '/attivita/getUsersAttivita', this._onSuccessGetUsers.bind(this), 'get_users_attivita', 'GET');
    };

    ns.ModalNewAttivita.prototype._onSuccessGetUsers = function(ret) {
        this._users = (!Array.isArray(ret.data)) ? [ret.data] : ret.data ;
        this._selUser.empty();
        this._selUser.append(new Option('-',''));
        for (let i in this._users) this._selUser.append(new Option(this._users[i].name,this._users[i].id));
    };

    ns.ModalNewAttivita.prototype._getFederazioni = function() {
        this._utility.request(G_baseUrl + '/attivita/getFederazioni', this._onSuccessGetFederazioni.bind(this), 'get_federazioni', 'GET');
    };

    ns.ModalNewAttivita.prototype._onSuccessGetFederazioni = function(ret) {
        let fsn = ret.data;
        this._selFsn.empty();
        this._selFsn.append(new Option('-',''));
        for (let i in fsn) this._selFsn.append(new Option(fsn[i].sigla,fsn[i].sigla));
    };

    ns.ModalNewAttivita.prototype._assegna = function(e){
        const options = {
            method: 'post',
            url: G_baseUrl + '/attivita/assegna',
            data: {
                title: this._inpTitle.val(),
                descr: this._txtDesc.val(),
                fsn: this._selFsn.val(),
                user_id: this._selUser.val(),
            }
        }
        this._utility.showStackSpinner('assegna_attivita');
        axios(options).then( res => {
                Utility.hideStackSpinner('assegna_attivita');
                admindev.attivita.AttivitaList.getInstance().refresh();
                admindev.attivita.ModalNewAttivita.getInstance().hide();
            }
        ).catch(err => {
                Utility.hideStackSpinner('assegna_attivita');
                Utility.showModal({ 'type': Utility.ERROR, 'sMsg': err.response.data.message, 'modalSize': 'large' });
            }
        )
    }

    ns.ModalNewAttivita.prototype.hide = function(ret) {
        this._modal.modal('hide');
    };

    ns.ModalNewAttivita.prototype.getModale = function(ret) {
        return this._modal;
    };

    ns.ModalNewAttivita.prototype.show = function(ret) {
        this._getFederazioni();
        this._getUsers();
        this._modal.modal('show');
    };


})();
