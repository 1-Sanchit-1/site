# How Microservices Talk to Each Other?

Microservices can communicate using synchronous (REST, gRPC) or asynchronous (message queues, event-driven) approaches.

## Synchronous Communication (Request-Response Model)

In synchronous communication, one microservice sends a request to another and waits for a response. The client must wait for the response to proceed. This is most commonly done using HTTP/HTTPS or gRPC.

### REST (Representational State Transfer):

Microservices communicate over HTTP using standard protocols like GET, POST, PUT, DELETE, etc. REST is widely used because it is stateless, platform-independent, and uses standard web protocols.

```
Service A  ---->  Service B (GET /data)
         <----  Response (JSON data)
```

## Asynchronous Communication (Event-Driven Model)

In asynchronous communication, the sender doesn’t wait for the recipient to respond. Instead, messages are sent and handled independently, which is useful when services need to be decoupled. This is typically done using messaging systems or event-driven architectures.

### Message Brokers (Message Queues):

Microservices use message brokers like RabbitMQ, Kafka, or ActiveMQ to send messages to each other asynchronously. The sender pushes the message into the broker, and the receiver pulls the message when ready.

Example: Service A sends a message to a queue or topic, and Service B listens to that queue.

```
Service A  ---->  Message Queue/Topic  ---->  Service B
```
