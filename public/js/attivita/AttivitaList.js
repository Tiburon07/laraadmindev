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
    this._token = $('#_token');

    // -- Eventi
    this._btnNewAttivita.on('click', this._onclickBtnNewAttivita.bind(this));
    this._attivitaTable.on('click','button',this._onClickAction.bind(this));

    // -- Table Users Config
    this._tableConfigAttivita = this._utility.getTableConfig();
    this._tableConfigAttivita.buttons = ['excel', 'pdf'];
    this._tableConfigAttivita.serverSide = true;
    this._tableConfigAttivita.language.search = 'Cerca per titolo:';
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
            return _this._utility.getStatusLabel(data);
        }
    },{
        data: "action",
        className: "text-center",
        render: function (data, type, row, meta) {
            let btnTask = '<button data-action="task" class="btn btn-sm mr-1 btn-primary" title="nuovo ask"><i class="fas fa-tasks"></i></button>';
            let btnBook = '<button data-action="bookmark" class="btn btn-sm mr-1 btn-primary" title="nuovo bookmark"><i class="fas fa-bookmark"></i></button>';
            let btnCarica = '<button data-action="carica_task_book" class="btn btn-sm mr-1 btn-primary" title="carica task e bookmark"><i class="fas fa-eye"></i></button>';
            //let btnDel = '<button '+ ((row.deleted_at) ? ' disabled ' : '') + ' class="btn mr-1 btn-sm btn-danger"><i class="far fa-trash-alt"></i></button>';
            // let btnForceDel = '<button class="btn btn-sm mr-1 btn-danger">Force <i class="far fa-trash-alt"></button>';
            return btnTask + btnBook + btnCarica;
        }
    }];

    // -- Configurazione tabella
    this._tableConfigAttivita.columnDefs = [
        { title:'Titolo', "targets": 0, "width": "15%", orderable: true },
        { title:'FSN', "targets": 1, "width": "5%", orderable: true },
        { title:'Descrizione', "targets": 2, "width": "45%", orderable: true },
        { title:'Data Inserimento', "targets": 3, "width": "15%", orderable: true },
        { title:'Stato', "targets": 4, "width": "5%", orderable: true },
        { title:'Azioni', "targets": 5, "width": "15%", orderable: false}];

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

  ns.AttivitaList.prototype._onClickAction = function(e) {
      let rowData = this._attivitaTable.DataTable().row($(e.target).parents('tr')).data();
      console.log(rowData);
      switch (e.currentTarget.dataset.action) {
          case 'task':
                alert('da implementare');
              break;
          case 'bookmark':
              alert('da implementare');
              break;
          case 'carica_task_book':
              this._getActionBookMark(rowData);
              break;
          default:
              break;
      }
  };


    ns.AttivitaList.prototype._onclickBtnNewTask = function(e) {
      this._ulTask.append(this._utility.getTask(''));
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

    ns.AttivitaList.prototype.refresh = function(e) {
        this._attivitaTable.DataTable().ajax.reload();
    };

    ns.AttivitaList.prototype._getActionBookMark = function(data){
        const options = {
            method: 'get',
            url: G_baseUrl + '/attivita/getTaskBookmark/' + data.id,
        }
        this._utility.showStackSpinner('get_task_bookmark');
        axios(options).then( res => {
                Utility.hideStackSpinner('get_task_bookmark');
                let tasks = res.data.tasks;
                let bookmarks = res.data.bookmarks;
                let ulTask = admindev.attivita.AttivitaList.getInstance().getTaskContainer();
                ulTask.empty();
                for(let i in tasks){
                    ulTask.append(Utility.getTask(tasks[i]))
                }
                // admindev.attivita.AttivitaList.getInstance().refresh();
                // admindev.attivita.ModalNewAttivita.getInstance().hide();
            }
        ).catch(err => {
                Utility.hideStackSpinner('get_task_bookmark');
                Utility.showModal({ 'type': Utility.ERROR, 'sMsg': err.response.data.message, 'modalSize': 'large' });
            }
        )
    }

    ns.AttivitaList.prototype.getTaskContainer = function() {
        return this._ulTask;
    };
})();
