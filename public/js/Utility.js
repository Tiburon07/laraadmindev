const Utility = {

  aWaitStack: [],
  INFO: 10,
  WARNING: 11,
  ERROR: 12,
  DEBUG: 13,
  QUESTION: 14,

  init: function() {
    Utility.inizializzaDate();
  },

  // ***** DATATABLE *****

  //"dom": 'l<"H"Rs>t<"F"ip>', dom da provare
  getTableConfig: function() {
    return {
      //"dom": '<"top">rt<"bottom"lp>',
      "dom": 'lf<"H"Rs>t<"bottom"p>',
      "searching": true,
      "ordering": true,
      "info": true,
      "lengthChange": false,
      "pagingType": "full_numbers",
      "language": {
        "search": "Cerca nome: ",
        "lengthMenu": " _MENU_ records per pagina",
        "zeroRecords": "Nessun elemento trovato",
        "info": "Mostra pagina _PAGE_ di _PAGES_",
        "infoEmpty": "Nessun record",
        "infoFiltered": "(Filtrato da _MAX_ totali records)",
        "paginate": {
          "first": '<span class="sr-only">Prima pagina</span><i class="fas fa-angle-double-left"></i>',
          "previous": '<span class="sr-only">Pagina precedente</span><i class="fas fa-angle-left"></i>',
          "next": '<span class="sr-only">Pagina successiva</span><i class="fas fa-angle-right"></i>',
          "last": '<span class="sr-only">Ultima pagina</span><i class="fas fa-angle-double-right"></i>'
        }
      }
    };
  },

  getSimpleTableConfig: function() {
    return {
      "ordering": false,
      "searching": false,
      "info": false,
      "paging": false,
      "lengthChange": false,
      "language": {
        "zeroRecords": "Nessun elemento trovato"
      },
      "select": {
        "style": 'single'
      }
    };
  },

  /***************************************************************************************************************
   * DATE
   * ***************************************************************************************************************/

  inizializzaDate: function() {
    $('.input-group.date').datepicker({
      format: 'dd/mm/yyyy',
      maxViewMode: 2,
      language: 'it',
      orientation: 'auto right',
      keyboardNavigation: false,
      forceParse: false,
      autoclose: true,
      todayHighlight: true,
      showOnFocus: false,
      templates: {
        leftArrow: '<i class="fas fa-chevron-left"></i>',
        rightArrow: '<i class="fas fa-chevron-right"></i>'
      }
    });
  },

  format_data: function(data) {
    if (data != '') {
      let data_split = data.split("/");
      let data_ret = data_split[2] + data_split[1] + data_split[0];
    }
    return data_ret;
  },

  unformat_data: function(data) {
    let data_ret = "";
    let str = data.toString();
    let n = str.length;

    if (n == 8) {
      data_ret = str.substring(n - 2) + "/" + str.substring(4, 6) + "/" + str.substring(0, 4);
    }
    return data_ret;
  },

  setDatepickerISO: function(inputId, isoDate) {
    if (isoDate && isoDate.length >= 10) {
      $("#" + inputId).closest(".input-group.date").datepicker("update", new Date(isoDate.substr(0, 10)));
    }
  },

  getDatepickerISO: function(inputId) {
    let isoDate = "";
    let dp = $("#" + inputId).closest(".input-group.date");
    if (dp.length > 0) {
      let dt = dp.datepicker("getDate");
      if (dt != null) {
        // !!! se non imposto l'ora viene lasciata alle 00, e quando
        // trasformo in ISO e vado due ore indietro mi cambia giorno.
        dt.setHours(12);
        isoDate = dt.toISOString().substr(0, 10);
        isoDate = isoDate.replace(/-/gi, "");
      }
    }
    return isoDate;
  },

  getDatepickerDate: function(inputId) {
    let dt;
    let dp = $("#" + inputId).closest(".input-group.date");
    if (dp.length > 0) {
      dt = dp.datepicker("getDate");
    }
    return dt;
  },

  setDatepickerDate: function(inputId, date) {
    let dt;
    let dp = $("#" + inputId).closest(".input-group.date");
    if (dp.length > 0) {
      dt = dp.datepicker("update", date);
    }
    return dt;
  },

  getDatepickerLongDate: function(inputId) {
    let longDate = "";
    let isoDate = Utility.getDatepickerISO(inputId);
    // dd-mon-yy
    if (isoDate.length == 8) { // (isoDate.length == 10) {
      longDate = isoDate.substr(6, 2) + "-"; // isoDate.substr(8, 2) + "-";
      let month = isoDate.substr(4, 2); // isoDate.substr(5, 2);
      if (month == "01") longDate += "gen";
      else if (month == "02") longDate += "feb";
      else if (month == "03") longDate += "mar";
      else if (month == "04") longDate += "apr";
      else if (month == "05") longDate += "mag";
      else if (month == "06") longDate += "giu";
      else if (month == "07") longDate += "lug";
      else if (month == "08") longDate += "ago";
      else if (month == "09") longDate += "set";
      else if (month == "10") longDate += "ott";
      else if (month == "11") longDate += "nov";
      else if (month == "12") longDate += "dic";
      longDate += "-" + isoDate.substr(2, 2);
    }
    return longDate;
  },

  checkDatepickerDate: function(inputId) {
    let check = true;
    let dt, v;
    let dp = $("#" + inputId).closest(".input-group.date");
    if (dp.length > 0) {
      v = this.coalesce($("#" + inputId).val());
      if (v.length > 0) {
        try {
          dt = dp.datepicker("getDate");
          // nel caso di format: 'dd/mm/yyyy',
          check = (
            dt.getDate() == parseInt(v.substr(0, 2)) &&
            (dt.getMonth() + 1) == parseInt(v.substr(3, 2)) &&
            dt.getFullYear() == parseInt(v.substr(6, 4))
          );
        } catch (ex) {
          console.log("Errore nel controllo della data. " + ex.message);
          check = false;
        }
      }
    }
    return check;
  },

  validFormatData: function(data) {
    let extression = /^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}$/g;
    return extression.test(data);
  },

  /**
   * Ritorna la data del giorno corrente nel formato 01/01/2020
   */
  today: function() {
    let d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [day, month, year].join('/');
  },

  verfificaDataAntecedente: function(dataSel){
    let scadenza = new Date(2010,0,1);
    return (!(dataSel < scadenza));
  },

  getParseData: function(str){
    let parts = str.split("/");
    return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
  },

  getParseAdd2YearsDate: function(str){
    let parts = str.split("/");
    return new Date(Number(parts[2])+2, Number(parts[1]) - 1, Number(parts[0]));
  },

  checkRangeDate2Years: function(strDataDa, strDataA){
    let dataDa2Years = this.getParseAdd2YearsDate(strDataDa);
    let dataA = this.getParseData(strDataA);
    return !(dataDa2Years < dataA);
  },

  checkIntervalloDate: function(dataDal, dataAl){
    let today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    let dateDal = this.getParseData(dataDal);
    let dateAl = this.getParseData(dataAl);
    if(dateDal > today){
      alert("La data Dal e' posteriore alla data odierna");
      return false;
    }
    if(dateAl > today){
      alert("La data Al e' posteriore alla data odierna");
      return false;
    }
    if(dateDal > dateAl){
      alert("La data Dal non puo' essere anteriore alla data Al");
      return false;
    }
    if(!this.checkRangeDate2Years(dataDal,dataAl)){
      alert("Il periodo non deve superare i due anni");
      return false;
    }
    return true
  },

  /***************************************************************************************************************
   * END DATE
   * ***************************************************************************************************************/


  /***************************************************************************************************************************
   * FUNCTION INPUT FOGLI
   ***************************************************************************************************************************/

  /**
   * Rchiama le funzioni che verificano la validità del campo fogli sia singoli che range
   */
  controlloInputFogli: function(inputFogli, istanzaObj) {
    //variabili utilizzate per il salvataggio
    istanzaObj._singoliFogli = [];
    istanzaObj._rangeFogli = [];
    inputFogli.removeClass('is-invalid');

    //TODO: accodare i messaggi con un solo alert come i paramteri principali del widget
    //Controllo se è stato inserito almento un input diverso da spazio vuoto
    if($.trim(inputFogli.val()) !== ''){
      let campoFogli = inputFogli.val().split(',');
      for(let i = 0; i < campoFogli.length; i++ ){
        if(campoFogli[i].indexOf('-') !== -1){  //distinguo i fogli singoli dal range di fogli
          if(!this.verificaRangeFogli(campoFogli[i],istanzaObj)){
            inputFogli.addClass('is-invalid');
            return false;
          }
          continue;
        }
        if(!this.verificaSingoloFoglio(campoFogli[i])){
          inputFogli.addClass('is-invalid')
          return false;
        }
        istanzaObj._singoliFogli.push({tipo:'singolo', valore: campoFogli[i]});
      }
    }
    return true;
  },

  /**
   * Verifica la validità di un range di fogli
   */
  verificaRangeFogli: function(rangeFogli,istanzaObj) {
    let aRangeFogli = rangeFogli.split('-');
    let foglioDa = $.trim(aRangeFogli[0]);
    let foglioA = $.trim(aRangeFogli[1]);
    let numRE = /\d+/;

    if(aRangeFogli.length > 2){
      alert('Range di fogli non valido');
      return false;
    }

    if(foglioDa ===''){
      alert('Range di fogli non valido');
      return false;
    } else if (numRE.test(foglioDa) == false) {
      alert('Range di fogli non numerico');
      return false;
    }

    if(foglioA ===''){
      alert('Range di fogli non valido');
      return false;
    } else if (numRE.test(foglioA) == false) {
      alert('Range di fogli non numerico');
      return false;
    }

    if(parseInt(foglioDa) > parseInt(foglioA)){
      alert('Range di fogli non valido');
      return false;
    }

    if(!this.verificaSingoloFoglio(foglioDa))return false;
    if(!this.verificaSingoloFoglio(foglioA))return false;

    istanzaObj._rangeFogli.push({tipo:'range', valore: [foglioDa,foglioA]})
    return true;
  },

  /**
   * Verifica la validità di ogni singolo foglio inserito;
   */
  verificaSingoloFoglio: function(foglio) {
    let foglioTrim = $.trim(foglio);
    let alphanumeriRegEx = /^([a-zA-Z0-9 _-]+)$/;

    if(foglioTrim === ''){
      alert('Inserire il valore del foglio dopo la virgola');
      return false;
    }

    if(!alphanumeriRegEx.test(foglioTrim)){
      alert('Il foglio ' + foglioTrim + ' non è valido');
      return false;
    }

    if(foglio.length > 4){
      alert('Il foglio ' + foglioTrim + ' non deve superare la lunghezza di 4 caratteri');
      return false;
    }

    return true;
  },

  // ***** CONTROLLI *****

  // checkYear: function(dateStart, dateFinish) {
  //     let check = false;
  //     let datasplit = dateStart.split("/");
  //     data = new Date(datasplit[2], (datasplit[1] - 1), datasplit[0]);
  //     data.setDate(data.getDate() + 365);
  //     let datasplit = dateFinish.split("/");
  //     dataToCheck = new Date(datasplit[2], (datasplit[1] - 1), datasplit[0]);
  //     if (dataToCheck <= data)
  //         check = true;

  //     return check;
  // },

  checkFoglioTerreni: function(foglioDa, foglioA) {
    let check = false;

    if (foglioDa != "") {
      //foglioDa deve essere <= a foglioA
      if (foglioDa > foglioA) {
        Utility.showMessage("ERR", "Attenzione! Il valore Foglio da non può essere maggiore del valore Foglio a.");
      } else {
        check = true;
      }
    } else if (foglioDa == "" && foglioA != "") {
      Utility.showMessage("ERR", "Attenzione! Range fogli non valido.");
    } else if (foglioDa == "" && foglioA == "") {
      check = true;
    }

    return check;
  },

  checkFoglioFabbricati: function(foglioDa, foglioA, showMessage) {
    let u = Utility;

    let check = false;
    let show = showMessage || true;
    let messages = [];

    if (foglioDa != "") {
      let reg = /^[0-9]+$/;
      let bool = reg.test(foglioDa);

      //caso alfanumerici : se foglioDa è inserito, foglioA o vuoto o uguale a foglioDa
      if (!bool) {
        if (foglioA != foglioDa && foglioA != "") {
          messages.push("Attenzione! Range foglio da-a errato.");
        } else {
          check = true;
        }
        //caso number : se foglioDa è inserito e foglioA non lo è, foglioA prende il valore di foglioDa
      } else {
        if (foglioA == "") {
          foglioA = foglioDa;
          check = true;
        } else if (foglioDa > foglioA) { //foglioDa deve essere <= a foglioA
          messages.push("Attenzione! Il valore Foglio da non può essere maggiore del valore Foglio a.");
        } else if (foglioDa <= foglioA) {
          check = true;
        }
      }
    } else if (foglioDa == "" && foglioA != "") {
      messages.push("Attenzione! Range fogli non valido.");
    } else if (foglioDa == "" && foglioA == "") { check = true; }

    if (show && messages.length > 0) {
      Utility.showMessage('ERR', messages.join("<br/>"));
      return check;
    } else {
      return messages;
    }
    return messages;
  },

  sprintf: function() {
    a = arguments[0];
    for (k = 1; k < arguments.length; k++) {
      a = a.replace("{" + k + "}", arguments[k]);
    }
    return a;
  },

  checkRendita: function(jElemDa, jElemA, title) {
    let u = this;
    let re = /^[0-9]{1,12}(\,[0-9]{1,2})?$/;
    let textDa, textA, floatDa, floatA, messages = [];

    textDa = u.coalesce(jElemDa.val());
    textA = u.coalesce(jElemA.val());

    // se sono entrambi vuoti esco
    if (textDa == "" && textA == "") return [];

    // prima di tutto controllo che siano numerici
    if (textDa) {
      if (re.test(textDa.replace('.', ','))) {
        floatDa = parseFloat(textDa.replace(',', '.'));
      } else {
        messages.push("Il valore " + title + " - Da non e' del tipo numerico di 12 cifre intere, la virgola e 2 decimali");
      }
    }
    if (textA) {
      if (re.test(textA.replace('.', ','))) {
        floatA = parseFloat(textA.replace(',', '.'));
      } else {
        messages.push("Il valore " + title + " - A non e' del tipo numerico di 12 cifre intere, la virgola e 2 decimali");
      }
    }
    // se sono numerici controllo i valori
    if (messages.length == 0) {
      if (textDa != "" && textA != "") {
        if (floatDa > floatA) {
          messages.push("Il valore " + title + " - Da non puo' essere maggiore del valore A");
        }
      }
      if (textDa != "" && textA == "") {
        messages.push("Il valore " + title + " - Da non puo' essere indicato da solo");
      }
    }

    if (messages.length > 0) {
      Utility.showMessage('ERR', messages.join("<br/>"));
    } else {
      Utility.hideMessage();
    }

    return messages;
  },

  //foglio da alfanumerico foglio al o assente o stesso valore (il campo alfanumerico è ammesso solo per
  //i fabbricati ) ; nel caso di valori numerici foglio da deve essere minore o identico a foglio a : se viene
  //inserito foglio a , foglio da deve essere obbligatorio , se foglio da viene inserito e foglio a è vuoto
  //foglio a diventa identico foglio da
  verificaFogliFabbricati: function(elemDa, elemA) {
    let u = Utility;

    let jElemDa = $(elemDa);
    let jElemA = $(elemA);
    let textDa, textA, floatDa, floatA, messages = [];

    textDa = u.coalesce(jElemDa.val());
    textA = u.coalesce(jElemA.val());

    // se sono entrambi vuoti esco
    if (textDa == "" && textA == "") return messages;

    let re = /^[0-9]+$/;
    let isNumeric = (re.test(textDa) || re.test(textA));
    if (isNumeric) {
      messages = u.verificaIntervallo(elemDa, elemA, "Foglio", 4, 0, 2, 1);
    } else {
      if (textDa != textA) {
        messages.push("Foglio: nel caso di foglio non numerico i valori Da e A devono coincidere");
        jElemDa.addClass("is-invalid");
        jElemA.addClass("is-invalid");
      }
    }

    return messages;
  },

  verificaFogliTerreni: function(elemDa, elemA) {
    let u = this;
    return u.verificaIntervallo(elemDa, elemA, "Foglio", 4, 0, 2, 1);
  },

  /**
   * Verifica i valori di una coppia di input che rappresentano un intervallo.
   *
   * @params elemDa (element) : elemento iniziale dell'intervallo, obbligatorio
   * @params elemA (element) : elemento finale dell'intervallo, obbligatorio
   * @params nome (string) : nome dell'intervallo, opzionale, predefinito "".
   * @params iPrec (integer) : numero di cifre intere da controllare, opzionale, predefinito 0.
   * @params dPrec (integer) : numero di cifre decimali da controllare, opzionale, predefinito 0.
   * @params modoDa (integer) : Imposta la modalita' di controllo del valore
   *                            Da, opzionale, valori:
   *                            0: nessun controllo oltre l'intervallo;
   *                            1: predefinito, se vuoto e A e' valorizzato ne copia il valore;
   *                            2: se il valore non esiste segnala un errore;
   * @params modoA (integer) : come modoDa per il valore A.
   */
  verificaIntervallo: function(elemDa, elemA, nome, iPrec, dPrec, modoDa, modoA) {
    let u = this;
    //console.log("x debug");

    let jElemDa = $(elemDa);
    let jElemA = $(elemA);
    let i = iPrec || 0;
    let d = dPrec || 0;
    let n = (nome ? nome + ": " : "");
    let md = modoDa || 1;
    let ma = modoA || 1;
    let s = ",";
    let m = true;
    let isNumeric = (i > 0);
    let isDecimal = (isNumeric && d > 0);
    let textDa, textA, floatDa, floatA, messages = [];

    textDa = u.coalesce(jElemDa.val());
    textA = u.coalesce(jElemA.val());

    // se sono entrambi vuoti esco
    if (textDa == "" && textA == "") return messages;

    // * se sono numerici
    if (isNumeric) {
      let re, reText;
      if (isDecimal) {
        // /^[0-9]{1,12}(\,[0-9]{1,2})?$/;
        reText = "^[0-9]{1," + i + "}(\\" + s + "[0-9]{1," + d + "})?$";
      } else {
        reText = "^[0-9]{1," + i + "}$";
      }
      re = new RegExp(reText); // , "g"): tolgo il global altrimenti mi torna una volta true e una volta false
      // * prima di tutto controllo che siano numerici
      if (textDa) {
        if (re.test(textDa)) {
          floatDa = parseFloat(textDa.replace(s, '.'));
        } else {
          if (isDecimal) {
            messages.push(n + "il valore Da non e' decimale nel formato (" + i + ", " + d + ")");
          } else {
            messages.push(n + "il valore Da non e' intero di " + i + " cifre");
          }
          if (m) jElemDa.addClass("is-invalid");
        }
      }
      if (textA) {
        if (re.test(textA)) {
          floatA = parseFloat(textA.replace(s, '.'));
        } else {
          if (isDecimal) {
            messages.push(n + "il valore A non e' decimale nel formato (" + i + ", " + d + ")");
          } else {
            messages.push(n + "il valore A non e' intero di " + i + " cifre");
          }
          if (m) jElemA.addClass("is-invalid");
        }
      }
    }
    // * quindi controllo i valori
    if (messages.length == 0) {
      if (textDa != "" && textA != "") {
        //if (isNumeric && (floatDa > floatA)) {
        //  messages.push(n + "il valore Da non puo' essere maggiore del valore A");
        //  if (m) jElemDa.addClass("is-invalid");
        //}
        if (isNumeric) {
          if (floatDa > floatA) {
            messages.push(n + "il valore Da non puo' essere maggiore del valore A");
            if (m) jElemDa.addClass("is-invalid");
          }
        } else {
          if (textDa > textA) {
            messages.push(n + "il valore Da non puo' essere maggiore del valore A");
            if (m) jElemDa.addClass("is-invalid");
          }
        }
        // controllo se devo forzare i valori mancanti
      } else if (textDa == "" && textA != "") {
        if (md == 1) jElemDa.val(jElemA.val());
        else if (md == 2) {
          messages.push(n + "il valore A non puo' essere indicato da solo");
          if (m) jElemDa.addClass("is-invalid");
        }
      } else if (textDa != "" && textA == "") {
        if (ma == 1) jElemA.val(jElemDa.val());
        else if (ma == 2) {
          messages.push(n + "il valore Da non puo' essere indicato da solo");
          if (m) jElemA.addClass("is-invalid");
        }
      }
    }

    return messages;
  },

  verificaNumero: function(elem, iPrec, dPrec, minVal, maxVal) {
    let u = this;
    //console.log("x debug");

    const s = ",";
    let jElem = $(elem);
    let i = iPrec; //|| 0;
    let d = dPrec || 0;
    let min = (minVal == undefined) ? null : parseFloat(minVal);
    let max = (maxVal == undefined) ? null : parseFloat(maxVal);
    let isDecimal = (d > 0);
    let messages = [];
    let text = u.coalesce(jElem.val());

    // se vuoto esco
    if (text == "") return messages;

    let re, reText;
    if (isDecimal) {
      // /^[0-9]{1,12}(\,[0-9]{1,2})?$/;
      reText = "^[0-9]{1," + i + "}(\\" + s + "[0-9]{1," + d + "})?$";
    } else {
      reText = "^[0-9]{1," + i + "}$";
    }
    re = new RegExp(reText); // , "g"): tolgo il global altrimenti mi torna una volta true e una volta false

    // per gli input normali
    let label = jElem.prev("label").html();
    // per gli input group
    if (!label) label = jElem.closest(".form-group").find("label").html();

    if (re.test(text)) {
      let fv = parseFloat(text.replace(s, '.'));
      if (min != null) {
        if (fv < min) {
          messages.push(label + " e' minore del valore minimo (" + min + ")");
          jElem.addClass("is-invalid");
        }
      }
      if (max != null) {
        if (fv > max) {
          messages.push(label + " e' maggior del valore massimo (" + max + ")");
          jElem.addClass("is-invalid");
        }
      }
    } else {
      if (isDecimal) {
        messages.push(label + " non e' un decimale nel formato (" + i + ", " + d + ")");
      } else {
        messages.push(label + " non e' un intero di " + i + " cifre");
      }
      jElem.addClass("is-invalid");
    }

    return messages;
  },

  verificaObbligatori: function(elem) {
    let u = this;
    //console.log("x debug");

    let jElem = $(elem);
    let id = jElem.prop("id");
    let messages = [];

    // pulisco i precedenti controlli
    //$("#" + id + " .is-invalid").removeClass("is-invalid");

    $("#" + id + " :input[required]").filter(":visible").each(
      function(index, element) {
        let el = $(this);
        if (el.val() == "") {
          el.addClass("is-invalid");
          // per gli input normali
          let label = el.prev("label").html();
          // per le date
          if (!label) label = el.closest(".form-group").find("label").html();
          messages.push(label + " e' obbligatorio");
        }
      }
    );

    return messages;
  },

  // ***** FUNZIONI DI TESTO *****

  coalesce: function(s, val) {
    if (val === undefined) val = "";
    if (s) return s;
    else return val;
  },

  trimLeadingZero: function(s) {
    if (s) return s.replace(/^0+/, "");
    else return "";
  },

  padLeadingZero: function(s, l) {
    var p = ""; // se e' vuota ritorna stringa vuota
    if (s) {
      p = s;
      for (var i = 0; i < l; i++) p = "0" + p;
      p = p.slice(-l);
    }
    return p;
  },

  leftTrim: function(s, c) {
    if (s) {
      let reString = "^" + c + "+";
      let re = new RegExp(reString);
      return s.replace(re, "");
    } else return "";
  },

  leftPad: function(s, l, c) {
    var p = ""; // se e' vuota ritorna stringa vuota
    if (s) {
      p = s;
      for (var i = 0; i < l; i++) p = c + p;
      p = p.slice(-l);
    }
    return p;
  },

  val: function(elemId) {
    return this.coalesce($("#" + elemId).val());
  },

  // ***** UTILE *****

  /**
   * Restituisce i dati in formato JSON recuperati da una form.
   * @params idForm (string)
   * Return JSON (string)
   */
  dataFormJSON: function(idForm) {
    /*$("#" + idForm + " :input").each(function() {
        $(this).prop("name", $(this).prop("id"));
    });*/
    $("#" + idForm + " :input").each(function() {
      if ($(this).prop("name") == "") {
        $(this).prop("name", $(this).prop("id"));
      }
    });
    let dataForm = $("#" + idForm).serialize().replace(/%20/g, '').split('&');
    let objDataToSend = {}
    for (let i = 0; i < dataForm.length; i++) {
      let data = dataForm[i].split("=");
      objDataToSend[data[0]] = data[1];
    }
    return JSON.stringify(objDataToSend)
  },

  // ***** HTML *****

  loadSelect: function(sel, data, opt) {
    sel.empty();
    if (opt) {
      for (name in opt) {
        sel.append('<option value="' + name + '">' + opt[name] + '</option>');
      }
    }
    for (name in data) {
      sel.append('<option value="' + name + '">' + data[name] + '</option>');
    }
  },

  /**
   * Esegue lo svuotamento di un controllo di tipo select
   * @param element - Elemento di tipo SELECT da svuotare
   */
  emptySelect: function(element) {
    element.empty();
    element.val('');
  },

  /**
   * Imposta un elemento OPTION selezionato, prima in base al VALUE e se
   * non lo trova in base al TEXT.
   * @param sel {Element} - Elemento di tipo SELECT.
   * @param valueOrText {String} - Stringa corrispondente al VALUE o al TEXT.
   */
  setSelectedOption: function(sel, valueOrText) {
    // prima provo se esiste il value
    sel.val(valueOrText);
    // se non esiste provo il text
    if (!sel.val() && valueOrText) {
      valueOrText = valueOrText.toLowerCase();
      sel.children("option").filter(function(i, e) { return $(e).text().toLowerCase() == valueOrText; }).prop("selected", true);
    }
  },

  aggiungiClasse: function(elem, className) {
    if (elem.hasClass(className) == false) elem.addClass(className);
  },

  rimuoviClasse: function(elem, className) {
    if (elem.hasClass(className) == true) elem.removeClass(className);
  },

  nascondiElemento: function(elem) {
    let c = this;
    c.aggiungiClasse(elem, "d-none");
  },

  mostraElemento: function(elem) {
    let c = this;
    c.rimuoviClasse(elem, "d-none");
  },

  /**
   * Nasconde il div colonna in cui è contenuto elem.
   * @param elem {Element} - elemento jquery
   */
  nascondiClosestDiv: function(elem) {
    let div = elem.closest("div");
    if (div.hasClass("d-none") == false) div.addClass("d-none");
  },

  // TODO: implementare un data-qualcosa
  //onNavShown: function(name, e) {
  //  let href = $(e.target).attr("href");
  //  //console.log("shown -> " + href);
  //  this[name] = href.replace("#notifica_ricerca_", "").replace("_tab", "");
  //},

  spostaElementoAfter: function(elemDaSpostare, elemPosizione) {
    let divDaSpostare = $("#" + elemDaSpostare).closest("div");
    let divNuovaPosizione = $("#" + elemPosizione).closest("div");
    divDaSpostare.detach();
    divDaSpostare.insertAfter(divNuovaPosizione);
  },

  onNavHidden: function(e) {
    let href = $(e.target).attr("href");
    //console.log("hidden -> " + href);
    $(href + " :input").val("");
    $(href + " input:checkbox").prop("checked", false);
  },

  // ***** SPINNER *****

  showSpinner: function() {
    let sHtml = '';
    let divSpinner = $('#spinner');
    sHtml = '<div id="spinner" style="display:none" aria-hidden="true" class="spinnerdiv"><i class="fas fa-circle-notch fa-4x fa-spin spinner-center"></i><span style="position: absolute;left: 55%;top: 53%;">Caricamento in corso...</span></div>';
    divSpinner = $(sHtml);
    $('body').append(divSpinner);
    $("#spinner").show();
  },

  hideSpinner: function() {
    $('#spinner').remove();
  },

  // ***** MESSAGGI  *****

  showModalInfo: function(title, content, closeHandler) {
    let elem = $("#idModalInfoTpl");
    elem.find("#modal-label-1").text(title);
    elem.find("div.modal-body").text(content);
    if (typeof closeHandler == "function") {
      elem.one("hidden.bs.modal", closeHandler);
    }
    elem.modal();
  },

  showMsgInfo: function(status, type, message) {
    if (!status) {
      $("#elenchi-msg").closest("div").addClass('d-none');
    } else {
      let elem = $("#elenchi-msg").closest("div").detach();
      let dest = $("#elenchi_bread_crumb").closest("div");
      elem.insertAfter(dest);
      $("#elenchi-msg").closest("div").removeClass('d-none');
      $("#elenchi-msg").removeAttr('class');
      if (type == 'alert-info') {
        $("#elenchi-msg").closest("div").addClass('alert alert-info d-flex');
      } else if (type == 'alert-warning') {
        $("#elenchi-msg").closest("div").addClass('alert alert-warning d-flex');
      } else if (type == 'alert-success') {
        $("#elenchi-msg").closest("div").addClass('alert alert-success d-flex');
      } else if (type == 'alert-danger') {
        $("#elenchi-msg").closest("div").addClass('alert alert-danger d-flex');
      }
      $('#elenchi-msg-content').text(message);
    }
  },

  /**
   * Permette di inserire e mostrare un messaggio all'interno di un tipo di bunner prescelto
   *
   * @params idTarget (string) : da inserire se si vuole scegliere dove mostrare il bunner, altrimenti per default viene mostrato in fondo alla pagina
   * @params typeMsg (string) : colore del bunner ERR = rosso, INFO = blu,  SUCC = verde,  WARN = giallo, DEFAULT = grigio
   * @params msg (string)
   * @params marginTop : true = aggiunge margine sopra il bunner
   */
  showMessage: function(type, msg, idTarget, marginTop) {

    //Controllo che non esista un bunner gia mostrati all'utente, nel caso in cui esite lo distruggo
    if ($("#elenchiContainerBunnerMsg").length) {
      $('#elenchiContainerBunnerMsg').remove();
    }

    if (msg === undefined) {
      msg = 'nessun messaggio inserito'
    }

    $('#elenchiContainerBunnerMsg').remove();
    bHtml = '<div id="elenchiContainerBunnerMsg">';

    if (marginTop === true) {
      bHtml += '<div class="row"><div class="col-md-12 pt-3"></div></div>';
    }

    switch (type) {
      case 'ERR':
        bHtml += '<div class="alert alert-danger d-flex" role="alert"><p class="alert-content">' + msg + '</p></div></div>';
        break;
      case 'INFO':
        bHtml += '<div class="alert alert-info d-flex" role="alert"><p class="alert-content">' + msg + '</p></div></div>';
        break;
      case 'SUCC':
        bHtml += '<div class="alert alert-success d-flex" role="alert"><p class="alert-content">' + msg + '</p></div></div>';
        break;
      case 'WARN':
        bHtml += '<div class="alert alert-warning d-flex" role="alert"<p class="alert-content">' + msg + '</p></div></div>';
        break;
      default:
        bHtml += '<div class="alert alert-secondary d-flex" role="alert"><p class="alert-content"> type ERR = ross; INFO = blu; WARN = giallo; SUCC = verde; default = grigio' + '<br>' + 'Attenzione:' + msg + '</p></div></div>';
        break;
    }
    if (idTarget === undefined) {
      $('#id-center').append(bHtml);
    } else {
      $('#' + idTarget).append(bHtml);
    };
  },

  /**
   * Rimuove evenutali messaggi di bunner mostrati all'utente
   */
  hideMessage: function() {
    $('#elenchiContainerBunnerMsg').remove();
  },

  /******* MESSAGE  *****
   * Visualizza un messaggio del tipo indicato. Se viene passato come elementId un tipo button visualizza
   *  il messaggio sopra il pulsante nel caso di tipo err,warn, sotto negli altri casi. Se è un altro tipo
   * di elemento viene utilizzato come contenitore del messaggio. Se non viene passato, viene visualizzato in fondo alla pagina.
   *
   * @params type (string) : colore del banner: ERR = rosso, INFO = blu,  SUCC = verde,  WARN = giallo, DEFAULT = grigio
   * @params msg (string)
   * @params elementId (string) : id dell'elemento, opzionale.
   */
  showAlertMessage: function(msg, type, elementId, fadeOut) {

    let fade = fadeOut || true;

    let ct = $("#elenchi-msg-container");
    //Controllo che non esista un banner gia mostrati all'utente, nel caso in cui esite lo distruggo
    if (ct.length > 0) {
      ct.remove();
    }
    let marginTop = "";
    let alertClass = "alert-secondary";

    if (type == 'SUCC') {
      marginTop = " mt-3";
      alertClass = 'alert-success';
    } else if (type == 'INFO') {
      marginTop = " mt-3";
      alertClass = 'alert-info';
    } else if (type == 'WARN') {
      alertClass = 'alert-warning';
    } else if (type == 'ERR') {
      alertClass = 'alert-danger';
    }

    bHtml = '<div id="elenchi-msg-container" class="w-100">' +
      '<div class="row">' +
      '<div class="col-12' + marginTop + '">' +
      '<div class="alert ' + alertClass + ' d-flex" role="alert">' +
      '<p class="alert-content">' + msg + '</p>' +
      '</div></div></div></div>';

    //controllo se l'elemento con questo id esiste
    if (elementId && $('#' + elementId).length > 0) {
      //se è un button metto il div come nodo fratello
      if ($('#' + elementId)[0].tagName == "BUTTON") {
        if (marginTop == "") {
          $(bHtml).insertBefore('#' + elementId);

        } else {
          $(bHtml).insertAfter('#' + elementId);
        }
      } else { //altrimenti aggiungo il messaggio come nodo figlio
        $('#' + elementId).append(bHtml);
      }
    } else { //se non ho l'elemento uso il div applicativo
      $('#id-center').append(bHtml);
    }
    //TODO: margin-top dovrebbe essere impostato anche quando si fa l'append
    // lo faccio sparire dopo 10 secondi
    if (fade) $('#elenchi-msg-container').fadeOut(10000);
  },

  onAjaxError: function(errorThrown) {
    Utility.hideWait();
    console.log("ERRORE chiamata Ajax: " + errorThrown);
  },

  // ***** UFFICIO *****

  prendiUfficio: function() {
    let ufficio = "";
    try {
      ufficio = window.G_oSelectUff.selectedUff.COD_UFF;
    } catch (ex) {
      console.log("Errore accesso codice ufficio selezionato");
    }
    return ufficio;
  },

  ltrimZero: function(stringa) {
    return stringa.replace(/^0+/, "");
  },

  toCommaDecimal: function(v) {
    let s = "";
    if (v !== null && v !== undefined) {
      if (typeof v == "number") s = v.toString();
      if (typeof v == "string") s = v;
    }
    s = s.replace(/\./, ",")
    return s;
  },

  /**
   * Riordina le option della select in input
   * @public
   */
  sortSelect: function(select) {
    let selectList = select.children('option');
    let newList = []; //viene popolato con la lista disordinata
    for (let i = 0; i < selectList.length; i++) {
      newList[i] = (selectList[i].value);
    }
    select.empty(); //Svuoto la select prima di ricaricarla
    newList.sort(); //ordino la lista e ricarico la select
    for (let j = 0; j < newList.length; j++) {
      select.append(new Option(newList[j], newList[j]))
    }
  },

  /**
   * Ritorna il cambio di valuta da lira a euro
   * @param classe {string} - valore in lire
   */
  cambioLiraEuro: function(tariffa, arrotonda) {
    let tariffa_trattata = (tariffa / 1936.27);
    return +(Math.round(tariffa_trattata + "e+" + arrotonda) + "e-" + arrotonda);
  },

  /**
   * Sostituisce '<' con l'entità in html &lt;
   */
  formattaEntities: function(stringa) {
    return jQuery('<div />').text(stringa).html();
  },

  /**
   * ************************************************
   * FUNZIONI PER AGGIUNGERE/RIMUOVERE IL BREAD CRUMB
   * ************************************************
   */

  /**
   * Aggiunge un elemento in coda al BradCrumb
   */
  addToBreadcrumb: function(bc, text, handler) {
    var lastElem = bc.find("li:last-child");
    var itemText = lastElem.text();
    lastElem.html('<a href="javascript:void(0)">' + itemText + '</a>');
    lastElem.off("click").on("click", handler);
    $('<li class="breadcrumb-item"><strong>' + text + '</strong></li>').insertAfter(lastElem);
  },

  /**
   * Rimuove l'ultimo elemento al BradCrumb
   */
  deleteFromBreadcrumb: function(bc) {
    bc.find("li:last-child").remove();
    var lastElem = bc.find("li:last-child");
    var itemText = lastElem.text();
    lastElem.off("click");
    lastElem.html('<strong>' + itemText + '</strong>');
  },

  thousandSeparator: function(x) {
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },

  /**
   * *********************************************
   * FUNZIONI PER MOSTRARE E NASCONDERE LO SPINNER
   * **********************************************
   */

  showStackSpinner: function(id) {
    Utility.addToWaitStack(id);
  },

  hideStackSpinner: function(id) {
    Utility.removeFromWaitStack(id);
  },

  addToWaitStack: function(id) {
    if (this.aWaitStack.length == 0) this.showWait();
    if ($.inArray(id, this.aWaitStack) == -1) this.aWaitStack.push(id);
  },

  removeFromWaitStack: function(id) {
    let idx = $.inArray(id, this.aWaitStack);
    if (idx != -1) this.aWaitStack.splice(idx, 1);
    if (this.aWaitStack.length == 0) this.hideWait();
  },

  hideWait: function() {
    $('#spinner').remove();
  },

  //utilizza le classi css spinnerdiv e spinner-center di estrazione.css
  showWait: function() {
    if ($('#spinner').length === 0) $('body').append('<div id="spinner" aria-hidden="true" class="spinnerdiv"><i class="fas fa-circle-notch fa-4x fa-spin spinner-center"></i></div>');
  },

  /**
   * *********************************************
   * FUNZIONI DI DEBUG
   * **********************************************
   */

  showModalError: function(msg) {
    Utility.showModal({ 'type': Utility.ERROR, 'sMsg': msg, 'modalSize': 'large' });
  },

  /**
   * *********************************************
   * FUNZIONI PER MOSTRARE E NASCONDERE LA MODALE
   * **********************************************
   */
  showModal: function(params) {

    if ('id' in params) {
      sId = params.id;
    } else {
      sId = 'dlg_' + this.getUniqueID(9);
    }
    var oModal = null;

    var bCreate = true;
    if ($('#' + sId).length > 0) {
      oModal = $('#' + sId);
    } else {

      var idTpl = ('modalType' in params && params.modalType == 'form') ? 'idModalFormTpl' : 'idModalInfoTpl';

      oModal = $('#' + idTpl).clone();


      if ('type' in params) {
        switch (params.type) {
          case this.INFO:
            params.icon = true;
            params.clsicon = 'fa-info';
            params.title = 'INFO';
            break;
          case this.WARNING:
            params.icon = true;
            params.clsicon = 'fa-exclamation-triangle';
            params.title = 'ATTENZIONE';
            break;
          case this.ERROR:
            params.icon = true;
            params.clsicon = 'fa-exclamation';
            params.title = 'ERRORE';
            break;
          case this.DEBUG:
            params.icon = true;
            params.clsicon = 'fa-info';
            params.title = 'DEBUG';
            break;
          case this.QUESTION:
            params.icon = true;
            params.clsicon = 'fa-question-circle';
            params.title = 'QUESTION';
            break;
          default:
            params.icon = false;
            params.title = params.type;
            break;
        }
      }

      var sTitle = params.icon ? '<i class="fas ' + params.clsicon + ' mr-2"></i>' + params.title : params.title;

      oModal.find('.modal-title').html(sTitle);
      oModal.attr('id', sId);

      if ('modalSize' in params) {
        if (params.modalSize == 'large') {

          oModal.find('.modal-dialog').addClass('modal-lg');
        } else if (params.modalSize == 'small') {
          oModal.find('.modal-dialog').addClass('modal-sm');
        }
      }

      oModal.find('.modal-body').html(params.sMsg);

      if (params.modalType === 'form') {
        if (typeof params.okButtonLabel !== 'undefined' && params.okButtonLabel !== '') {
          oModal.find('button[type="submit"]').html(params.okButtonLabel);
        }

        if (typeof params.annullaButtonLabel !== 'undefined' && params.annullaButtonLabel !== '') {
          oModal.find('button[type="button"]').html(params.annullaButtonLabel);
        }
      }



      oModal.find('button[type="submit"]').on('click', params.modalAction);

      if ('modalCancel' in params) {
        oModal.find('button[type="button"]').on('click', params.modalCancel);
      }

      if ('disableOk' in params && params.disableOk) {
        oModal.find('button[type="submit"]').prop('disabled', true);
      }

      oModal.appendTo('body');

      if ('onClose' in params) {
        if (params.onClose == 'destroy') {
          $('#' + sId).on('hidden.bs.modal', function(e) {
            $(this).remove();
          });
        }
      } else { //per default viene distrutto
        $('#' + sId).on('hidden.bs.modal', function(e) {
          $(this).remove();
        });
      }
    }

    if ('beforeShow' in params && typeof params.beforeShow == 'function') {
      oModal.on('show.bs.modal', params.beforeShow);
    }

    if ('afterShow' in params && typeof params.afterShow == 'function') {
      oModal.on('shown.bs.modal', params.afterShow);
    }

    if ('beforeHide' in params && typeof params.beforeHide == 'function') {
      oModal.on('hide.bs.modal', params.beforeHide);
    }

    if ('afterHide' in params && typeof params.afterHide == 'function') {
      oModal.on('hidden.bs.modal', params.afterHide);
    }


    oModal.modal('show');

  },

  getUniqueID: function(idlength) {
    let charstoformid = '_0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
    if (!idlength) {
      idlength = Math.floor(Math.random() * charstoformid.length);
    }
    let uniqid = '';
    for (let i = 0; i < idlength; i++) {
      uniqid += charstoformid[Math.floor(Math.random() * charstoformid.length)];
    }
    // one last step is to check if this ID is already taken by an element before
    if ($("#" + uniqid).length == 0)
      return uniqid;
    else
      return this.getUniqueID(idlength + 10)
  },

  //richiesta per singola select
  sendRequestForSelect: function (restUrl, type, data, idSpinner, select) {
    Utility.showStackSpinner(idSpinner);

    let configAjax = {
      type: type,
      url: G_sAppIndex + restUrl,
      dataType : 'json',
      success: Utility.onSelectRequestSuccess.bind(Utility,idSpinner, select),
      error: Utility.onSelectRequestError.bind(Utility,idSpinner)
    }

    if(type.toUpperCase() == "POST"){
      configAjax.data = JSON.stringify(data);
    }

    $.ajax(configAjax);
  },

  onSelectRequestSuccess: function (idSpinner, select, data) {
    Utility.hideStackSpinner(idSpinner);
    $("#" + select).empty();
    if(data.status == 0){
      let lista = data.data;
      let html = "<option value=''></option>";
      for(var i = 0; i < lista.length; i++){
        // if(!lista[i].DESCRIZIONE){
        html += "<option value='"+ lista[i] +"'>"+ lista[i] +"</option>";
        /* }else{
             html += "<option value='"+ lista[i].CODICE +"'>"+ lista[i].DESCRIZIONE +"</option>";
         }*/

      }
      $("#" + select).append(html);
      $("#" + select).find('option:first').attr('selected', 'selected').trigger("change");
    }else{
      Utility.showModalError(data.message);
    }
  },

  onSelectRequestError: function (idSpinner, xhr, textStatus, errorThrown ) {
    Utility.hideStackSpinner(idSpinner);
    Utility.showModalError(errorThrown);
  },

  /**
   * *********************************************
   * FUNZIONI PER EFFETTURARE LE RICHIESTE
   * **********************************************
   */

  request: function(url, callback, idSpinner, type, data){

    //Attivo lo spinner
    this.showStackSpinner(idSpinner);

    //Configuro la richiesta
    let configAjax = {
      url: url,
      type: type,
      headers: { Authorization: localStorage.getItem("token")},
      data: JSON.stringify(data),
      success: this.onSuccess.bind(this,idSpinner,callback),
      error: this.onError.bind(this,idSpinner)
    }

    //In caso di richiesta POST aggiungo il corpo della richiesta
    if(this.coalesce(type) != '' &&  type.toUpperCase() === 'POST'){
      configAjax.data = JSON.stringify(data);
    }

    //Effettua la richiesta asincrona
    $.ajax(configAjax);
  },

  /**
   * CallBack della richiesta con stato Success
   * @param dataRet {obj|JOSN} - dati di ritorno dalla richiesta
   */
  onSuccess : function(idSpinner,callback,dataRet) {

    //spengo lo spinner
    this.hideStackSpinner(idSpinner);

    try {
      let dataRetParse = JSON.parse(dataRet);
      if (dataRetParse.statusCode == 200) {
        callback(dataRetParse);
      } else {
        this.showModalError(dataRetParse.error.description);
      }
    } catch (error) {
      if(dataRet.indexOf('SESSION_ERROR') > -1){
        this.showModalError(dataRet.split('=')[1]);
      }else {
        this.showModalError(error);
      }
    }
  },

  /**
   * CallBack della richiesta con stato Error
   * @param xhr, textStatus, errorThrown - dati di ritorno dalla richiesta
   */
  onError : function(idSpinner, xhr, textStatus, errorThrown) {
    this.hideStackSpinner(idSpinner);
    this.showModalError(xhr.responseJSON.error.description);
  },

  /**
   * CallBack della richiesta con stato Success di datatable
   * @param draw {integer}
   * @param callbackDataTable {function}
   * @param dataRet {obj|JSON} - dati di ritorno dalla richiesta
   */
  onSuccessDataTable : function(draw,callbackDataTable, dataRet) {
    let dataTab = {};
    dataTab.draw = draw;
    dataTab.recordsTotal = dataRet.dataCount;
    dataTab.recordsFiltered = dataRet.dataCount;
    dataTab.data = dataRet.data;
    callbackDataTable(dataTab);
  },

  getTask: function(dataTask) {
    let liTask = $('<li>');
    liTask.append($('<span class="handle ui-sortable-handle">')
        .append($('<i class="fa fa-ellipsis-v"></i>'))
        .append($('<i class="fa fa-ellipsis-v"></i>'))
        );
    liTask.append($('<input type="checkbox" value="">').prop('checked',dataTask.checked).val(dataTask.id));
    liTask.append($('<span class="text"></span>').text(dataTask.task));
    liTask.append($('<span class="badge bg-info">')
            .append($('<i class="fa fa-clock-o"></i>').text(dataTask.tempo_previsto))
        );
    liTask.append($('<div class="tools">')
          .append($('<i class="fa fa-edit"></i>'))
          .append($('<i class="fa fa-trash-o"></i>'))
        );
    return liTask
  },

  getStatusLabel: function(statusCode) {
      let statusLabel = '';
      let todo = '<span class="badge  bg-danger">TODO</span>';
      let doing = '<span class="badge bg-warning">DOING</span>';
      let completed = '<span class="badge bg-success">COMPLETATO</span>';
      let deployed = '<span class="badge bg-primary">RILASCIATO</span>';
      let notDefined = '<span class="badge bg-default">NON DEFINITO</span>';
      switch (statusCode){
          case 1:
              statusLabel = todo;
              break;
          case 2:
              statusLabel = doing;
              break
          case 3:
              statusLabel = completed;
              break
          case 4:
              statusLabel = deployed;
              break
          default:
              statusLabel = notDefined;
      }
      return statusLabel;
  }
}
