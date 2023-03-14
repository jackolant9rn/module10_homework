const ws = "wss://echo-ws-service.herokuapp.com";
    const messageInput = document.querySelector(".message");
    const sendButton = document.querySelector(".sendButton");
    const geoButton = document.querySelector(".geoButton");
    const chatWindow = document.querySelector(".chatWindow");
    
    let websocket = new WebSocket(ws); 
    
    websocket.onopen = () => {
        console.log("CONNECTED");
    };
    
    websocket.onerror = (event) => {
        console.log(event.data)
    };
    
    websocket.onmessage = (event) => {
        let data = JSON.parse(event.data);
        if (data.echo != false) {
            addMessage(data.message, "recievedMessage")
        }
    };

    function addMessage(message, messageClass) {
        let newMessage = `
            <p class="chatMessage ${messageClass}">
                ${message}
            </p>
        `;
        let chat = chatWindow.innerHTML;
        chatWindow.innerHTML = chat + newMessage;
    };

    sendButton.addEventListener("click", () => {
        let message = messageInput.value;
        let echo = true;
        if (message !== "") {
            addMessage(message, "sentMessage");
            websocket.send(JSON.stringify({message, echo}));
            messageInput.value = "";
        }
    });
    
    function onGeoPositionError() {
        alert("Гео-локация не может быть определена!");
    };
    
    function onGeoPositionSuccess(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let link = `https://www.openstreetmap.org/#map=15/${latitude}/${longitude}`;
        let echo = false;
        addLink(link);
        websocket.send(JSON.stringify({link, echo}));
    };
    
    function addLink(link) {
        let geoMessage = `<a class="chatMessage geoLink" href="${link}" target="_blank">Гео-локация</a>`;
        let chat = chatWindow.innerHTML;
        chatWindow.innerHTML = chat + geoMessage;
    };

    geoButton.addEventListener("click", () => {
        if (!navigator.geolocation) {
            alert("Ваш браузер не поддерживает функцию гео-локации!")
        } else {
            navigator.geolocation.getCurrentPosition(onGeoPositionSuccess, onGeoPositionError);
        };
    });