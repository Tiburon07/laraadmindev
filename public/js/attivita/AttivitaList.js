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
  ns.AttivitaList = function() {
    _this = this;

    // -- valori attuali --
    this._utility = Utility;
    this._users = [];

    // -- elementi HTML --
    this._attivitaTable = $('#attivita_table')
    this._selUsers = $('#attivita_select_user');
    this._btnAssegna = $('#attivita_btn_assegna');
    this._modalAssegna = $('#attivita_modal_assegna');
    this._inpModalAssegnaTitle = $('#attivita_modale_assegna_input_titolo');
    this._selModalAssegnaUser = $('#attivita_modale_assegna_select_user');
    this._selModalAssegnaFsn = $('#attivita_modale_assegna_select_fsn');
    this._txtModalAssegnaDesc = $('#attivita_modale_assegna_descrizione');
    this._btnConfemaModalAssegna = $('#attivita_modale_btn_assegna');
    // -- Eventi
    this._btnAssegna.on('click', this._onclickBtnAssegna.bind(this));

    this._btnConfemaModalAssegna.on('click', this._onclickBtnConfermaModal.bind(this));
    this._modalAssegna.on('shown.bs.modal', this._onShowModalAssegna.bind(this));
    this._modalAssegna.on('hidden.bs.modal', this._onHiddenModalAssegna.bind(this));
    this._inpModalAssegnaTitle.on('keyup', this._onKeyUpInputTitle.bind(this));

      // -- Table Users Config
      this._tableConfigAttivita = this._utility.getTableConfig();
      //this._tableConfigAttivita.buttons = ['excel', 'pdf'];
      this._tableConfigAttivita.serverSide = true;
      this._tableConfigAttivita.ajax = this._getElencoAttivita.bind(this);
      this._tableConfigAttivita.destroy = true;
      this._tableConfigAttivita.paging = true;
      this._tableConfigAttivita.pageLength = 15;
      this._tableConfigAttivita.order = [[1,'asc']];
      this._tableConfigAttivita.columns = [{
          data: "title",
          className: "text-center",
          render: function (data, type, row, meta) {return data;}
      },{
          data: "fsn",
          className: "text-center",
          render: function (data, type, row, meta) {return data;}
      }, {
          data: "description",
          className: "text-center",
          render: function (data, type, row, meta) {
              return data;
          }
      }, {
          data: "created_at",
          className: "text-center",
          render: function (data, type, row, meta) {
              return data;
          }
      },{
          data: "status_id",
          className: "text-center",
          render: function (data, type, row, meta) {
              return data;
          }
      },{
          data: "action",
          className: "text-center",
          render: function (data, type, row, meta) {
              let btnEdit = '<button class="btn btn-sm mr-1 btn-primary"><i class="far fa-edit"></i></button>';
              let btnDel = '<button '+ ((row.deleted_at) ? ' disabled ' : '') + ' class="btn mr-1 btn-sm btn-danger"><i class="far fa-trash-alt"></i></button>';
              let btnForceDel = '<button class="btn btn-sm mr-1 btn-danger">Force <i class="far fa-trash-alt"></button>';
              return btnEdit + btnDel + btnForceDel;
          }
      }];
      //
      this._tableConfigAttivita.columnDefs = [
          { title:'Titolo', "targets": 0, "width": "15%", orderable: true },
          { title:'FSN', "targets": 1, "width": "5%", orderable: true },
          { title:'Descrizione', "targets": 2, "width": "30%", orderable: true },
          { title:'Data Inserimento', "targets": 3, "width": "15%", orderable: true },
          { title:'Stato', "targets": 4, "width": "10%", orderable: true },
          { title:'Azioni', "targets": 5, "width": "25%", orderable: false}];

      this._attivitaTable.DataTable(this._tableConfigAttivita);

    // this.getUsers();
    // this.getFederazioni();
    // this.getAttivitaList();
  };

  ns.AttivitaList.getInstance = function() {
    if (_this === null) _this = new ns.AttivitaList();
    return _this;
  };

  // -- Handler Event
  ns.AttivitaList.prototype._onclickBtnAssegna = function(e) {
    this._modalAssegna.modal('show');
  };

  ns.AttivitaList.prototype._onclickBtnAssegna = function(e) {
    this._modalAssegna.modal('show');
  };

  ns.AttivitaList.prototype._onclickBtnConfermaModal = function(e) {
    if(this._inpModalAssegnaTitle.val() == ""){
      return this._inpModalAssegnaTitle.addClass('is-invalid');
    }
    this._assegnaAttivitaList();
  };

  ns.AttivitaList.prototype._onKeyUpInputTitle = function(e) {
    this._inpModalAssegnaTitle.removeClass('is-invalid');
  };

  ns.AttivitaList.prototype._onShowModalAssegna = function(e) {
    //Da implementare
  };

  ns.AttivitaList.prototype._onHiddenModalAssegna = function(e) {
    this._inpModalAssegnaTitle.val('').removeClass('is-invalid');
  };

  ns.AttivitaList.prototype.getUsers = function() {
    this._utility.request(G_baseUrl + 'api/getUsers', this._onSuccessGetUsers.bind(this), 'get_users', 'GET');
  };

  ns.AttivitaList.prototype._onSuccessGetUsers = function(ret) {
    this._users = (!Array.isArray(ret.data)) ? [ret.data] : ret.data ;
    this._selUsers.append(new Option('',''));
    for (let i in this._users){
      this._selUsers.append(new Option(this._users[i].username,this._users[i].id));
      this._selModalAssegnaUser.append(new Option(this._users[i].username,this._users[i].id));
    }
  };

  ns.AttivitaList.prototype.getFederazioni = function() {
    this._utility.request(G_baseUrl + 'api/getFsn', this._onSuccessGetFederazioni.bind(this), 'get_federazioni', 'GET');
  };

  ns.AttivitaList.prototype._onSuccessGetFederazioni = function(ret) {
    let fsn = ret.data;
    for (let i in fsn) this._selModalAssegnaFsn.append(new Option(fsn[i].sigla,fsn[i].sigla));
  };

  ns.AttivitaList.prototype.getAttivitaList = function() {
    this._utility.request(G_baseUrl + 'api/getAttivitaList', this._onSuccessGetAttivitaList.bind(this), 'get_federazioni', 'GET');
  };

  ns.AttivitaList.prototype._onSuccessGetAttivitaList = function(ret) {
    let attivita = ret.data;
    let dataSetTab = [];
    for (let i in attivita) {
      let action = ' <button type="button" class="btn btn-primary btn-xs" title="Mostra dettaglio" data-action="info"><i class="fas fa-info-circle"></i></button>';
      dataSetTab.push({
        id_attivita : attivita[i].id,
        title : attivita[i].title,
        fsn : attivita[i].fsn,
        descr : attivita[i].descr,
        date_created : attivita[i].date_created,
        user_id : attivita[i].user_id,
        stato: 'todo',
        action : action
      });
    }

    this._tableConfigAttivita.aaData = dataSetTab;
    this._attivitaTable.DataTable().clear().draw();
    this._attivitaTable.DataTable(this._tableConfigAttivita);
  };

  ns.AttivitaList.prototype._assegnaAttivitaList = function() {
    let dataToSend = {
      title: this._inpModalAssegnaTitle.val(),
      descr: this._txtModalAssegnaDesc.val(),
      fsn: this._selModalAssegnaFsn.val(),
      user_id: this._selModalAssegnaUser.val()
    }
    this._utility.request(G_baseUrl + 'api/createAttivitaList', this._onSuccessInsertAttivitaList.bind(this), 'insert_attivita', 'POST', dataToSend);
  };

  ns.AttivitaList.prototype._onSuccessInsertAttivitaList = function(ret) {
    this._modalAssegna.modal('hide');
  };

    // -- Handler Event
    ns.AttivitaList.prototype._getElencoAttivita = function (data, callbackDataTable){
        let search = (data.search.value) ? data.search.value : '*';
        let url = G_baseUrl + '/attivita/getAttivita/' + data.start + '/' + data.length + '/' + (data.order[0].column + 1) + '/' + data.order[0].dir + '/' + search;
        this._utility.request(url, this._utility.onSuccessDataTable.bind(this,data.draw,callbackDataTable), 'elenco_attivita', 'GET');
    };
})();
