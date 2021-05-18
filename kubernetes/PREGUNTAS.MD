# PREGUNTAS DE PROYECTO 2

- [PREGUNTAS DE PROYECTO 2](#preguntas-de-proyecto-2)
    - [¿Cómo se pueden interpretar las cuatro pruebas de faulty traffic?](#¿Cómo-se-pueden-interpretar-las-cuatro-pruebas-de-faulty-traffic?)
    - [¿Qué patrones de conducta fueron descubiertos?](#¿Qué-patrones-de-conducta-fueron-descubiertos?)
    - [¿Qué sistema de mensajería es más rápido? ¿Por qué?](#¿Qué-sistema-de-mensajería-es-más-rápido?-¿Por-qué?)
    - [¿Cuántos recursos utiliza cada sistema de mensajería?](#¿Cuántos-recursos-utiliza-cada-sistema-de-mensajería?)
    - [¿Cuáles son las ventajas y desventajas de cada servicio de mensajería?](#¿Cuáles-son-las-ventajas-y-desventajas-de-cada-servicio-de-mensajería?)
    - [¿Cuál es el mejor sistema de mensajería?](#¿Cuál-es-el-mejor-sistema-de-mensajería?)
    - [¿Cuál de las dos bases de datos se desempeña mejor y por qué?](#¿Cuál-de-las-dos-bases-de-datos-se-desempeña-mejor-y-por-qué?)
    - [¿Cómo se refleja en los dashboards de Linkerd los experimentos de Chaos Mesh?](#¿Cómo-se-refleja-en-los-dashboards-de-Linkerd-los-experimentos-de-Chaos-Mesh?)
    - [¿En qué se diferencia cada uno de los experimentos realizados?](#¿En-qué-se-diferencia-cada-uno-de-los-experimentos-realizados?)
    - [¿Cuál de todos los experimentos es el más dañino?](#¿Cuál-de-todos-los-experimentos-es-el-más-dañino?)




## ¿Cómo se pueden interpretar las cuatro pruebas de faulty traffic?
R// Debemos tener en cuenta que el traffic split Imita tipo lo que es un balanceador de carga pero haciendo uso de otras tecnologías, en ella se determina cuánto porcentaje va hacia cada ruta haciendo uso de los nombres de los servicios y permite distribuir a lo que es el faulty traffic que su trabajo en sí es simular el tráfico defectuoso, se le mete un porcentaje de error al faulty traffic.
1. Kafka
2. GRPC
3. REDIS

![alt](./img/img1.png)

1. GRPC
2. Error Injector

![alt](./img/img2.png)

1. Error Injector 
2. GRPC
3. REDIS

![alt](./img/img3.png)

1. REDIS
2. KAFKA

![alt](./img/img4.png)


## ¿Qué patrones de conducta fueron descubiertos?
R// Al hacer las pruebas el porcentaje de latencia cambiaba ya que cuando se iba un mayor porcentaje al faulty traffic quiere decir que los otros reciben en menor porcentaje y por ello lo que recibían de peticiones disminuye. 


## ¿Qué sistema de mensajería es más rápido? ¿Por qué?
R// Cuando su aplicación se describe mejor como flujo de datos, donde está procesando un flujo de mensajes o eventos pasándose a través de servicios, quizás transformándolos en otros flujos para ser procesados ​​por otros servicios y así sucesivamente. Este es el tipo de cosas para las que Kafka en particular es ideal.

Utilice Redis:
Si desea un donde todos los mensajes que produce se entregan instantáneamente a los consumidores.
Si lo que más le preocupa es la velocidad.
Si puede estar a la altura de la pérdida de datos.
Si no desea que su sistema retenga el mensaje que se ha enviado.
La cantidad de datos que se van a tratar no es enorme.

Utilice kafka:
Si quieres confiabilidad.
Si desea que su sistema tenga una copia de los mensajes que se han enviado incluso después del consumo.
Si no puede estar a la altura de la pérdida de datos.
Si la velocidad no es una gran preocupación.
el tamaño de los datos es enorme

## ¿Cuántos recursos utiliza cada sistema de mensajería?
R//  para esta debemos de darle un kubectl top pods -n nombreNamepsace o al ver el CPU de los nodos en los clústeres

![alt](./img/img5.png)


## ¿Cuáles son las ventajas y desventajas de cada servicio de mensajería?
R// En el caso de Kafka su curva de aprendizaje es alta, desventaja.
En el caso de Redis puede usarse de la forma pub sub y también como base de datos, es versátil, ventaja.

- Ventajas de GRPC
    - Actuación
	gRPC está diseñado para HTTP / 2, una revisión importante de HTTP que proporciona importantes beneficios de rendimiento sobre HTTP 1.x:

    - Codigo de GENERACION
	La generación de código del cliente elimina la duplicación de mensajes en el cliente y el servidor, y crea un cliente fuertemente tipado para usted. No tener que escribir un cliente ahorra un tiempo de desarrollo significativo en aplicaciones con muchos servicios.
- Desventajas de GRPC
    - Soporte de navegador limitado
	Hoy en día, es imposible llamar directamente a un servicio de gRPC desde un navegador. gRPC utiliza en gran medida las funciones HTTP / 2 y ningún navegador proporciona el nivel de control necesario sobre las solicitudes web para admitir un cliente gRPC.
    - No legible por humanos
	Los mensajes de gRPC están codificados con Protobuf de forma predeterminada. Si bien Protobuf es eficiente para enviar y recibir, su formato binario no es legible por humanos.


## ¿Cuál es el mejor sistema de mensajería?
R// Depende de tus necesidades y el ámbito donde se quiera aplicar.

Por ejemplo gRPC se adapta muy bien cuando se trabaja con microservicios, entornos con restricciones de red  y con comunicación entre procesos.

![alt](./img/img6.png)

![alt](./img/img7.png)

Por otro lado Kafka es recomendado usarlo cuando se requiere transmisiones de streams fiables.

![alt](./img/img8.png)

![alt](./img/img9.png)

Redis pub/sub es excelente cuando hay varios servidores de nodos comunicándose directamente a redis porque puede enviar un mensaje hacia todos los demás de manera rapida.

![alt](./img/img10.png)

![alt](./img/img11.png)

## ¿Cuál de las dos bases de datos se desempeña mejor y por qué?
R// Muchos pueden decir que en redis puede ser más tardado porque se maneja de la forma clave valor, pero en nuestro caso hicimos uso de un índice y su valor era el texto de un objeto donde luego se hacía un parseo, entonces el acceso era directo y al estar en memoria principal eso se iba rapidísimo, en sí Redis está pensado para eso.

## ¿Cómo se refleja en los dashboards de Linkerd los experimentos de Chaos Mesh?
R// Cuando se ejecutan todos los experimentos el dashboard tiene el siguiente comportamiento como se muestra en la imagen 

![alt](./img/img12.png)

El comportamiento de la anterior se nota como si todo estuviera de una manera correcta pero esto se debe por que utilizaron mas replicas en este caso se utilizaron 3 por cada mensajería, por eso es que no se nota que están tan afectadas, en la siguiente imagen podemos ver como es el comportamiento de los pods, básicamente lo que sucede es que en la columna connections se ve que unos tienen más que otro pero esto por eso chaos slow network.

![alt](./img/img13.png)

En esta imagen podemos observar cómo es que chaos está afectando el traffic split y esto teniendo tres réplicas de este, podemos ver cómo es que empieza a ser afectado por todos los experimentos de chaos.

![alt](./img/img14.png)

![alt](./img/img15.png)

En esta imagen podemos ver el dashboard de chaos como es su comportamiento, donde se ve claramente que están los 5 experimentos en ejecución

![alt](./img/img16.png)

## ¿En qué se diferencia cada uno de los experimentos realizados?
PODKILL: como su nombre lo dice lo que realiza este experimento es matar el pod de un deployment o service en específico,
CONTAINER KILL: este otro experimento prácticamente lo que hace es matar al container de docker del deployment y service indicado en el manifest 
PODFAILLURE: este experimento lo que hace es dañar al pod, para que se reinicie dicho pod, pero sigue siendo el mismo, mientras que con podkill este si elimina el pod y kubernetes crea otra, en eso se diferencian estos dos experimentos
SLOWNETWORK: este experimento lo que hace es mandar de manera aleatoria los paquetes mediante linkerd por el split, dando esto un retraso en que el cliente pueda recibir la información en su página web.
KERNELFAILLURE: este experimento lo que afecta es el kernel de los nodos de los clusters ya que esto afecta en el rendimiento de los pods que se tiene en cada namespace.

## ¿Cuál de todos los experimentos es el más dañino?
R// Definitivamente los más dañinos son aquellos que rompen o matan la arquitectura como tal, entre ellos puede ser el pod kill ya que rompe una secuencia de la arquitectura en comparación con otros experimentos que afectan el desempeño de la estructura. 

![alt](./img/img17.png)

Como podemos ver en la imagen al utilizar pod kill este es el comportamiento que se tiene, ya que en este contamos con que utilizaron mas replicas, pero si no se hubieran utilizado mas, prácticamente se perderá ese tráfico en la red y no podrá llegar a su destino llegando esto a ser una pérdida para la empresa que consume ese tráfico.

![alt](./img/img18.png)