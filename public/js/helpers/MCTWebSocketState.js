const wsUrl = "ws://localhost:8080/realtime";

class MCTWebSocket {
  constructor(id) {
    this.id = id;
    this.socket = new WebSocket(wsUrl);
  }

  setSubscribeResponse(subscribeResponse) {
    this.subscribeResponse = subscribeResponse;
  }

  subscribe() {
    this.socket.onopen = () => {
      const subscriptionMessage = `subscribe ${this.id}`;
      this.socket.send(subscriptionMessage);
    };

    this.socket.addEventListener("message", (msg) => {
      this.subscribeResponse(JSON.parse(msg.data));
    });
  }

  close = () => {
    this.socket.onclose = () => {
      const unsubscriptionMessage = `unsubscribe ${this.id}`;
      this.socket.send(unsubscriptionMessage);
    };
  };
  unsubscribe = () => {
    const unsubscriptionMessage = `unsubscribe ${this.id}`;
    this.socket.send(unsubscriptionMessage);
  };
}

class MCTWebSocketState {
  // ids = array of ids
  constructor(ids) {
    this.socketState = ids.reduce(
      (acc, id) => ({
        ...acc,
        [id]: new MCTWebSocket(id),
      }),
      {}
    );
  }

  setRetrieveData(retrieveData) {
    Object.values(this.socketState).forEach((mctSocket) =>
      mctSocket.setSubscribeResponse(retrieveData)
    );
  }

  // {id: boolean}
  mapStateToSubscriptions(idState) {
    Object.keys(idState).forEach((id) =>
      idState[id] ? this.stateSubscribe(id) : this.stateUnsubscribe(id)
    );
  }

  stateSubscribe(id) {
    this.socketState[id].subscribe();
  }

  stateClose(id) {
    this.socketState[id].close();
  }

  stateUnsubscribe(id) {
    this.socketState[id].unsubscribe();
  }
}

export { MCTWebSocketState };
