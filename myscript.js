let app = new Vue ({
    el : '#app',
    data : {
        userName : {
            name : 'Maurizio',
            avatar : 'io'
        },
        messaggi : [
            'Ok!',
            'Non ho capito',
            'Mi dispiace, non so di cosa parli',
            'Buona giornata'
        ],
        nuovoContatto : "",
        linkImmagine : "",
        newChat : "hidden",
        info : "hidden",
        accessoOra : "",
        ultimoAccesso : "hidden",
        online : "hidden",
        attesa : "hidden",
        filtro : "",
        invia : "hidden",
        microfono : "active",
        nuovoMessaggio : "",
        chatVisualizzata : 0,
        contacts : [
            {
                name : 'Michele',
                avatar : 'img/avatar_1.png',
                visible : true,
                messages : [
                    {
                        date : '10/01/2020 15:30:55',
                        text : 'Hai portato a spasso il cane?',
                        status : 'sent'
                    },
                    {
                        date : '10/01/2020 15:50:00',
                        text : 'Ricordati di dargli da mangiare',
                        status : 'sent'
                    },
                    {
                        date : '10/01/2020 16:15:22',
                        text : 'Tutto fatto!',
                        status : 'received'
                    },
                ]
            },
            {
                name : 'Fabio',
                avatar : 'img/avatar_2.png',
                visible : true,
                messages : [
                    {
                        date : '20/03/2020 16:30:00',
                        text : 'Ciao come stai?',
                        status : 'sent'
                    },
                    {
                        date : '20/03/2020 16:30:55',
                        text : 'Bene grazie! Stasera ci vediamo?',
                        status : 'received'
                    },
                    {
                        date : '20/03/2020 16:35:00',
                        text : 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status : 'sent'
                    },
                ]
            },
            {
                name : 'Samuele',
                avatar : 'img/avatar_3.png',
                visible : true,
                messages : [
                    {
                        date : '28/03/2020 10:10:40',
                        text : 'La Marianna va in campagna',
                        status : 'received'
                    },
                    {
                        date : '28/03/2020 10:20:10',
                        text : 'Sicuro di non aver sbagliato chat?',
                        status : 'sent'
                    },
                    {
                        date : '28/03/2020 16:15:22',
                        text : 'Ah scusa!',
                        status : 'received'
                    },
                ]
            },
            {
                name : 'Luisa',
                avatar : 'img/avatar_4.png',
                visible : true,
                messages : [
                    {
                        date : '10/01/2020 15:30:55',
                        text : 'Lo sai che ha aperto una nuova pizzeria?',
                        status : 'sent'
                    },
                    {
                        date : '10/01/2020 15:50:00',
                        text : 'Si, ma preferirei andare al cinema',
                        status : 'received'
                    }
                ]
            },
        ]
    },
    methods : {
        mostraChat : function (indice) {
            if(indice == this.chatVisualizzata){
                return 'active'
            }
            return 'hidden'
        },
        selezionata : function (indice){
            this.chatVisualizzata = indice;
            this.nuovoMessaggio = "";
            this.invia = 'hidden';
            this.microfono = "active";
        },
        tipoMessaggio : function (indice, windex) {
            if(this.contacts[indice].messages[windex].status == 'received'){
                return 'ricevuto'
            }
            return 'inviato'
        },
        colonnaMessaggio : function (indice, windex) {
            if(this.contacts[indice].messages[windex].status == 'received'){
                return 'd-flex justify-content-start'
            }
            return 'd-flex justify-content-end'
        },
        chiudiChat : function () {
            this.chatVisualizzata = null;
        },
        infoChat : function () {
            if(this.info == 'hidden'){
                return this.info = 'active'
            }
            return this.info = 'hidden'
        },
        newMessage : function (indice) {
            const newMess = {
                date : dayjs().format("HH:mm"),
                text : this.nuovoMessaggio,
                status : 'sent'
            }; 
            if(this.nuovoMessaggio != ""){
                this.invia = 'active';
                this.microfono = 'hidden';
                this.attesa = 'active';
                this.ultimoAccesso = 'hidden';
                this.contacts[indice].messages.push(newMess);
                setTimeout(() => {
                    this.newRisposta(indice);
                    this.attesa = 'hidden';
                    this.online = 'active';
                }, 4000);
                setTimeout(() => {
                    this.online = 'hidden';
                    this.ultimoAccesso = 'active';                   
                }, 8000);
                setTimeout(() => {
                    this.accessoOra = dayjs().format("HH:mm")                   
                }, 8001);
            }
            this.nuovoMessaggio = "";
            this.invia = 'hidden';
            this.microfono = "active"
        },
        newRisposta : function (indice) {
            const newMess = {
                date : dayjs().format("HH:mm"),
                text : this.messaggi[this.getRandomInt()],
                status : 'received'
            }; 
            this.contacts[indice].messages.push(newMess);
        },
        search : function(){
            this.contacts.forEach((element) => {
                element.visible = element.name.toLowerCase().includes(this.filtro.toLowerCase());
            });
        },
        cambioIconaInvio : function () {
            if(this.nuovoMessaggio != ""){
                this.invia = 'active';
                this.microfono = 'hidden'
            }else{
                this.invia = 'hidden';
                this.microfono = 'active'
            }
        },
        getRandomInt: function () {
            return Math.floor(Math.random() * 4);
        },
        eliminaChat : function (indice) {
            this.contacts.splice(indice,1);
            this.chatVisualizzata = null;

        },
        eliminaMessaggi : function (indice) {
            return this.contacts[indice].messages = [];
        }, 
        nuovaChat : function () {
            if(this.newChat == 'hidden'){
                return this.newChat = 'active'
            }
            return this.newChat = 'hidden'
        },
        newContact : function () {
            const newCont = {
                name : this.nuovoContatto,
                avatar : this.linkImmagine,
                visible : true,
                messages : [],
            };
            if((this.nuovoContatto != "") && (this.linkImmagine != "")){
                this.contacts.push(newCont)
            }
            this.nuovoContatto = ""
            this.linkImmagine = ""
            this.newChat = 'hidden'
        },
    },
    updated: function () {
        let box = document.querySelector(".messaggi_chat");
        box.scrollTop = box.scrollHeight;
    },
}
);