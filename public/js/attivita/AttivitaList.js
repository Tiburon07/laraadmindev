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
   * Costruttore della classe AttivitaList
   * @constructor
   */
  ns.AttivitaList = function() {
    _this = this;

    // -- valori attuali --
    this._utility = Utility;
    this._users = [];
    this._modalAttivita = new ns.ModalNewAttivita();
    this._modal = this._modalAttivita.getModale();

    // -- elementi HTML --
    this._attivitaTable = $('#attivita_table')
    this._btnNewAttivita = $('#attivita_btn_new_attivita');
    this._btnNewTask = $('#attivita_btn_new_task');
    this._btnNewBookmark = $('#attivita_btn_new_bookmark');
    this._ulTask = $('#attivita_task_ul');

    // -- Eventi
    this._btnNewAttivita.on('click', this._onclickBtnNewAttivita.bind(this));
    this._btnNewTask.on('click', this._onclickBtnNewTask.bind(this));
    this._btnNewBookmark.on('click', this._onclickBtnNewBookmark.bind(this));

    // -- Table Users Config
    this._tableConfigAttivita = this._utility.getTableConfig();
    this._tableConfigAttivita.buttons = ['excel', 'pdf'];
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
            // let btnForceDel = '<button class="btn btn-sm mr-1 btn-danger">Force <i class="far fa-trash-alt"></button>';
            return btnEdit + btnDel ;
        }
    }];

    // -- Configurazione tabella
    this._tableConfigAttivita.columnDefs = [
        { title:'Titolo', "targets": 0, "width": "15%", orderable: true },
        { title:'FSN', "targets": 1, "width": "5%", orderable: true },
        { title:'Descrizione', "targets": 2, "width": "30%", orderable: true },
        { title:'Data Inserimento', "targets": 3, "width": "15%", orderable: true },
        { title:'Stato', "targets": 4, "width": "10%", orderable: true },
        { title:'Azioni', "targets": 5, "width": "25%", orderable: false}];

    this._attivitaTable.DataTable(this._tableConfigAttivita)
    // .columns().every( function () {
    //     var that = this;
    //     $('#search_fsn_datatable', this.footer()).off('keyup change').on('keyup change', function () {
    //         if(that.search('fsn') !== this.value ) {
    //             that.search(this.value).draw();
    //         }
    //     });
    // });

      // jQuery UI sortable for the todo list
      $('.todo-list').sortable({
          placeholder: 'sort-highlight',
          handle: '.handle',
          forcePlaceholderSize: true,
          zIndex: 999999,
          drop: function( ) {
              debugger;
              var order = $("#sortable").sortable("serialize", {key:'order[]'});
              console.log(order);
          }
      })
  };

  ns.AttivitaList.getInstance = function() {
    if (_this === null) _this = new ns.AttivitaList();
    return _this;
  };

  // -- Handler Event
  ns.AttivitaList.prototype._onclickBtnNewAttivita = function(e) {
      this._modalAttivita.show();
  };

  ns.AttivitaList.prototype._onclickBtnNewTask = function(e) {
      this._ulTask.append(this._utility.getTask(''));
  };

  ns.AttivitaList.prototype._onclickBtnNewBookmark = function(e) {

  };

    ns.AttivitaList.prototype._onSuccessAssegna = function(e) {
        alert('assegnato');
    };

  // -- Handler Event
  ns.AttivitaList.prototype._getElencoAttivita = function (data, callbackDataTable){
      let search = (data.search.value) ? data.search.value : '*';
      let url = G_baseUrl + '/attivita/getAttivita/' + data.start + '/' + data.length + '/' + (data.order[0].column + 1) + '/' + data.order[0].dir + '/' + search;
      this._utility.request(url, this._utility.onSuccessDataTable.bind(this,data.draw,callbackDataTable), 'elenco_attivita', 'GET');
  };
})();
