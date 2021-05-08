/**
 * @author TIB
 * @namespace admindev
 * ---------------------------------------------------------------
 * Oggetto gestione dell'interfaccia
 */
(function() {

  let ns = admindev.coni;
  let _this = null;

  /**
   * Costruttore della classe per la
   * @constructor
   */
  ns.Attivita = function() {
    _this = this;

    // -- valori attuali --
    this._utility = Utility;
    this._users = [];

    // -- elementi HTML --
    this._attivitaTable = $('#coni_attivita_table')
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
    
    this._tableConfig = this._utility.getTableConfig();
    this._tableConfig.buttons = ['excel', 'pdf'];
    this._tableConfig.destroy = true;
    this._tableConfig.autoWidth= true;
    this._tableConfig.responsive = true;
    this._tableConfig.pageLength = 10;
    this._tableConfig.order = [[3,'desc']];
    this._tableConfig.columns = [
      {data: "title"},
      {data: "fsn"},
      {data: "descr"},
      {data: "date_created"},
      {data: "stato"},
      {data: "action"}
    ];

    this._tableConfig.columnDefs = [
      { "targets": 0, "width": "20%", orderable: true },
      { "targets": 1, "width": "8%", orderable: true },
      { "targets": 2, "width": "37%", orderable: true },
      { "targets": 3, "width": "15%", orderable: true },
      { "targets": 4, "width": "10%", orderable: true},
      { "targets": 5, "width": "10%", orderable: true}];

    this._attivitaTable.DataTable(this._tableConfig)
    .buttons().container().appendTo('#coni_attivita_table_wrapper .col-md-6:eq(0)');



    this.getUsers();
    this.getFederazioni();
    this.getAttivita();
  };

  ns.Attivita.getInstance = function() {
    if (_this === null) _this = new ns.Attivita();
    return _this;
  };

  // -- Handler Event
  ns.Attivita.prototype._onclickBtnAssegna = function(e) {
    this._modalAssegna.modal('show');
  };

  ns.Attivita.prototype._onclickBtnAssegna = function(e) {
    this._modalAssegna.modal('show');
  };

  ns.Attivita.prototype._onclickBtnConfermaModal = function(e) {
    if(this._inpModalAssegnaTitle.val() == ""){
      return this._inpModalAssegnaTitle.addClass('is-invalid');
    }
    this._assegnaAttivita();
  };

  ns.Attivita.prototype._onKeyUpInputTitle = function(e) {
    this._inpModalAssegnaTitle.removeClass('is-invalid');
  };

  ns.Attivita.prototype._onShowModalAssegna = function(e) {
    //Da implementare
  };

  ns.Attivita.prototype._onHiddenModalAssegna = function(e) {
    this._inpModalAssegnaTitle.val('').removeClass('is-invalid');
  };

  ns.Attivita.prototype.getUsers = function() {
    this._utility.request(G_baseUrl + 'api/getUsers', this._onSuccessGetUsers.bind(this), 'get_users', 'GET');
  };

  ns.Attivita.prototype._onSuccessGetUsers = function(ret) {
    this._users = (!Array.isArray(ret.data)) ? [ret.data] : ret.data ;
    this._selUsers.append(new Option('',''));
    for (let i in this._users){
      this._selUsers.append(new Option(this._users[i].username,this._users[i].id));
      this._selModalAssegnaUser.append(new Option(this._users[i].username,this._users[i].id));
    }
  };

  ns.Attivita.prototype.getFederazioni = function() {
    this._utility.request(G_baseUrl + 'api/getFsn', this._onSuccessGetFederazioni.bind(this), 'get_federazioni', 'GET');
  };

  ns.Attivita.prototype._onSuccessGetFederazioni = function(ret) {
    let fsn = ret.data;
    for (let i in fsn) this._selModalAssegnaFsn.append(new Option(fsn[i].sigla,fsn[i].sigla));
  };

  ns.Attivita.prototype.getAttivita = function() {
    this._utility.request(G_baseUrl + 'api/getAttivita', this._onSuccessGetAttivita.bind(this), 'get_federazioni', 'GET');
  };

  ns.Attivita.prototype._onSuccessGetAttivita = function(ret) {
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

    this._tableConfig.aaData = dataSetTab;
    this._attivitaTable.DataTable().clear().draw();
    this._attivitaTable.DataTable(this._tableConfig);
  };

  ns.Attivita.prototype._assegnaAttivita = function() {
    let dataToSend = {
      title: this._inpModalAssegnaTitle.val(),
      descr: this._txtModalAssegnaDesc.val(),
      fsn: this._selModalAssegnaFsn.val(),
      user_id: this._selModalAssegnaUser.val()
    }
    this._utility.request(G_baseUrl + 'api/createAttivita', this._onSuccessInsertAttivita.bind(this), 'insert_attivita', 'POST', dataToSend);
  };

  ns.Attivita.prototype._onSuccessInsertAttivita = function(ret) {
    this._modalAssegna.modal('hide');
  };
})();