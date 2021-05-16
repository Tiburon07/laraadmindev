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
    ns.Chat = function() {
        // -- valori attuali --
        this._utility = Utility;

        this._inpMes = $('#chat_input_msg');
        this._inpUsername = $('#chat_username');
        this._inpUserId = $('#chat_userid');
        this._btnSend = $('#chat_btn_send');
        this._chatContent = $('#chat_content');
        this._token = $('#_token');
        this._form = $('#message-form');

        this._form.on('submit', this._onclickBtnAssegna.bind(this));
        _this = this;

        window.Echo.channel('chat').listen('.message', function(e){
                let today = new Date();
                let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
                _this._chatContent.append('<div class="direct-chat-msg">\n' +
                                        '    <div class="direct-chat-infos clearfix">\n' +
                                        '        <span class="direct-chat-name float-left">'+e.user_name+'</span>\n' +
                                        '        <span class="direct-chat-timestamp float-right">'+date +' '+time+'</span>\n' +
                                        '    </div>\n' +
                                        '    <img class="direct-chat-img" src="'+G_baseUrl+'/dist/img/avatar4.png" alt="message user image">\n' +
                                        '    <div class="direct-chat-text">'+e.message+'</div>\n' +
                                        '</div>')
            });
    };

    ns.Chat.prototype._onclickBtnAssegna = function(e) {

        e.preventDefault();
        const options = {
            method: 'post',
            url: G_baseUrl + '/send-message',
            data: {
                user_name : this._inpUsername.val(),
                user_id : this._inpUserId.val(),
                message : this._inpMes.val(),
                _token: this._token.val()
            }
        }
        axios(options);
        this._inpMes.val('');
    };

})();

//Collegamento un socket.io
//this._socket = io('https://chat-node-server-a7fgw.ondigitalocean.app');
// this._socket.on('connection');
// this._socket.on('sendChatToClient', (message) => {
//     console.log(message);
//     this._chatContent.append('<div class="direct-chat-msg">\n' +
//                             '    <div class="direct-chat-infos clearfix">\n' +
//                             '        <span class="direct-chat-name float-left">Tibur</span>\n' +
//                             '        <span class="direct-chat-timestamp float-right">23 Jan 5:37 pm</span>\n' +
//                             '    </div>\n' +
//                             '    <img class="direct-chat-img" src="'+G_baseUrl+'/dist/img/avatar4.png" alt="message user image">\n' +
//                             '    <div class="direct-chat-text">'+message+'</div>\n' +
//                             '</div>')
// })
// -- Handler Event
// ns.Chat.prototype._onclickBtnAssegna = function(e) {
//     this._socket.emit('sendChatToServer',this._inpMes.val());
//     this._inpMes.val('');
// };
