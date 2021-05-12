/**
 * @author TIB
 * @namespace admindev
 * ---------------------------------------------------------------
 * Oggetto gestione dell'interfaccia
 */
(function() {

    let ns = admindev;

    /**
     * Costruttore della classe per la
     * @constructor
     */
    ns.Home = function() {
        // -- valori attuali --
        this._utility = Utility;
        this._inpMes = $('#chat_input_msg');
        this._btnSend = $('#chat_btn_send');
        this._socket = io('http://167.71.43.30:80');
        this._chatContent = $('#chat_content')

        this._btnSend.on('click', this._onclickBtnAssegna.bind(this));
        this._socket.on('connection');
        this._socket.on('sendChatToClient', (message) => {
            this._chatContent.append('<div class="direct-chat-msg">\n' +
                                    '    <div class="direct-chat-infos clearfix">\n' +
                                    '        <span class="direct-chat-name float-left">Tibur</span>\n' +
                                    '        <span class="direct-chat-timestamp float-right">23 Jan 5:37 pm</span>\n' +
                                    '    </div>\n' +
                                    '    <img class="direct-chat-img" src="'+G_baseUrl+'/dist/img/avatar4.png" alt="message user image">\n' +
                                    '    <div class="direct-chat-text">'+message+'</div>\n' +
                                    '</div>')
        })
    };

    // -- Handler Event
    ns.Home.prototype._onclickBtnAssegna = function(e) {
        this._socket.emit('sendChatToServer',this._inpMes.val());
        this._inpMes.val('');
    };

})();
