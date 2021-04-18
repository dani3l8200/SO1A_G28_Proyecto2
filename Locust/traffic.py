import json
from numpy import random
from locust import task, between
from locust.contrib.fasthttp import FastHttpUser
debug=True
def printDebug(msg):
    
    if debug:
       print(msg)
       
class Reader():
    def __init__(self):
        self.infected_users = []
    def pickRandom(self):
        global index_used
        length = len(self.infected_users)
        
        if length > 0:
            random_index = random.randint(0,length-1) if length > 1 else 0
        
            return self.infected_users.pop(random_index)
        
        else:
            print(">>Read: No hay mas valores para leer en el archivo")
            
            return None

# Metodo para cargar el archivo json 
    def load(self):
        
        # print('>>Read: Iniciando con la carga de datos')
        
        try:
            with open('traffic.json', 'r',encoding='utf8') as data_file:
                global len_archive
                self.infected_users = json.loads(data_file.read())
                print('data leida correctamente', len(self.infected_users))
        except Exception as e:
            print(f'Hubo un error {e}')
  
class MessageTraffic(FastHttpUser):
    # Tiempo de espera entre peticiones
    # En este caso, esperara un tiempo de 0.1 segundos a 0.5 segundos (inclusivo) 
    #  entre cada llamada HTTP
    wait_time = between(0.1,0.9)
    host = "http://34.96.121.87" # en esta parte va el url
    # Este metodo se ejecutara cada vez que empecemos una prueba
    # Este metodo se ejecutara POR USUARIO (o sea, si definimos 3 usuarios, se ejecutara 3 veces y tendremos 3 archivos)
    def on_start(self):
        # print (">> MessageTraffic: Iniciando el envio de tráfico")
        # Iniciaremos nuestra clase reader
        self.reader = Reader()
        # Cargaremos nuestro archivo de datos traffic.json
        self.reader.load()

    # Este es una de las tareas que se ejecutara cada vez que pase el tiempo wait_time
    # Realiza un POST a la dirección del host que especificamos en la página de locust
    # En este caso ejecutaremos una petición POST a nuestro host, enviándole uno de los mensajes que leimos
    @task
    def PostMessage(self):
        # Obtener uno de los valores que enviaremos
        random_data = self.reader.pickRandom()
        
        # Si nuestro lector de datos nos devuelve None, es momento de parar
        if (random_data is not None):
            # utilizamos la funcion json.dumps para convertir un objeto JSON de python
            # a uno que podemos enviar por la web (básicamente lo convertimos a String)
            data_to_send = json.dumps(random_data,ensure_ascii=False)
            # Imprimimos los datos que enviaremos
            printDebug (data_to_send)
        
            # Enviar los datos que acabamos de obtener
            self.client.post("/", data=data_to_send)
            
        # En este segmento paramos la ejecución del proceso de creación de tráfico
        else:
            
            # Parar ejecucion del usuario
            self.stop(True) # Se envía True como parámetro para el valor "force", este fuerza a locust a parar el proceso inmediatamente.
    