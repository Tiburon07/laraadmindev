/**
 * @author TIB
 * @namespace admindev
 * ---------------------------------------------------------------
 * Oggetto gestione dell'interfaccia
 */
(function() {

    let ns = admindev.admin;
    let _this = null;

    /**
     * Costruttore della classe per la
     * @constructor
     */
    ns.AdminUsers = function(users) {
        _this = this;

        // -- valori attuali --
        this._utility = Utility;
        this._users = users;
        console.log(users);

        // -- elementi HTML --
        this._adminUsersTable = $('#admin_users_table')

        // -- Table Users Config
        this._tableConfig = this._utility.getTableConfig();
        //this._tableConfig.buttons = ['excel', 'pdf'];
        this._tableConfig.serverSide = true;
        this._tableConfig.ajax = this._getElencoUsers.bind(this);
        this._tableConfig.destroy = true;
        this._tableConfig.paging = true;
        this._tableConfig.pageLength = 15;
        this._tableConfig.order = [[1,'asc']];
        this._tableConfig.columns = [{
                data: "id",
                className: "text-center",
                render: function (data, type, row, meta) {return data;}
            },{
                data: "name",
                className: "text-center",
                render: function (data, type, row, meta) {return data;}
            }, {
                data: "email",
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
                data: "role",
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
            }
        ];
        //
        this._tableConfig.columnDefs = [
            { title:'Id', "targets": 0, "width": "5%", orderable: true },
            { title:'Nome', "targets": 1, "width": "25%", orderable: true },
            { title:'Email', "targets": 2, "width": "25%", orderable: true },
            { title:'Data Inserimento', "targets": 3, "width": "15%", orderable: true },
            { title:'Ruolo', "targets": 4, "width": "10%", orderable: true },
            { title:'Azioni', "targets": 5, "width": "25%", orderable: false}];

        this._adminUsersTable.DataTable(this._tableConfig);
            //.buttons().container().appendTo('#admin_users_table_wrapper .col-md-6:eq(0)');
    };

    ns.AdminUsers.getInstance = function() {
        if (_this === null) _this = new ns.AdminUsers();
        return _this;
    };

    // -- Handler Event
    ns.AdminUsers.prototype._getElencoUsers = function (data, callbackDataTable){
        let search = (data.search.value) ? data.search.value : '*';
        let url = G_baseUrl + '/admin/getUsers/' + data.start + '/' + data.length + '/' + (data.order[0].column + 1) + '/' + data.order[0].dir + '/' + search;
        this._utility.request(url, this._utility.onSuccessDataTable.bind(this,data.draw,callbackDataTable), 'elenco_users', 'GET');
    };

})();
