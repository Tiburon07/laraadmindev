<div class="modal fade" id="attivita_modal">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Assegna attivita</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="modal_attivita_title">Titolo*:</label>
                            <input type="text" id="modal_attivita_title" class="form-control" placeholder="titolo ...">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="modal_attivita_fsn">Fsn*:</label>
                            <select class="form-control" id="modal_attivita_fsn"></select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="modal_attivita_utente">Utente*:</label>
                            <select id="modal_attivita_utente" class="form-control"></select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="form-group">
                            <label for="modal_attivita_descr">Descrizione:</label>
                            <textarea class="form-control" id="modal_attivita_descr" rows="3" placeholder="descrizione ..."></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-default pull-left" data-dismiss="modal">chiudi</button>
                <button type="button" class="btn btn-primary" id="modal_attivita_btn_salva">Salva</button>
            </div>
        </div>
    </div>
</div>
