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
            addMessage(data.message, "flex-start")
        }
    };

    function addMessage(message, position="flex-end") {
        let newMessage = `
            <p class="chatMessage" style="align-self: ${position}">
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
            addMessage(message);
            websocket.send(JSON.stringify({message, echo}));
            messageInput.value = "";
        }
    });
    
    const error = () => {
        let error = "Гео-позиция не может быть определена!";
        addMessage(error);
    };
    
    const success = (position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let link = `https://www.openstreetmap.org/#map=15/${latitude}/${longitude}`;
        let echo = false;
        addLink(link);
        websocket.send(JSON.stringify({link, echo}));
    };
    
    function addLink(link) {
        let newMessage = `<a class="chatMessage geoLink" href="${link}" target="_blank">Гео-локация</a>`;
        let chat = chatWindow.innerHTML;
        chatWindow.innerHTML = chat + newMessage;
    };

    geoButton.addEventListener("click", () => {
        if (!navigator.geolocation) {
            console.log("You can't use geolocation!")
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        };
    });