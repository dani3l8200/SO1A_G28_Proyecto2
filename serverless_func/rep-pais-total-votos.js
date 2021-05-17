exports.helloWorld = function helloWorld(req, res) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST");

  const redis = require("redis");

  const client = redis.createClient({
    host: "34.70.185.180",
    port: 6379,
    auth_pass: "rZC8P/36pkIx24KRrDE7L8DeyFAqBK3MZ9F+SHqJpUQExLTvAfTZ0zeMDxkIDSp2UhdAwOJvCaebNY0S",
  });

  const getValueOfKey = (key) => {
    return new Promise((resolve, reject) => {
      client.get(key, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      });
    });
  };

  let llaves = [];
  client.keys("*", async (err, keys) => {
    if (err) return res.send(err);

    if (keys.length < 1) {
      return res.send([]);
    }

    try {
      for (var i = 0, len = keys.length; i < len; i++) {
        console.log("La llave es: ", keys[i]);
        await getValueOfKey(keys[i]).then((resp) => {
          if (keys[i] !== 'indice'){
            console.log("La respuesta es: ", resp);
            llaves.push(JSON.parse(resp));
          }
        });
      }

      const locations = llaves.reduce((locations, item) => {
        const location = locations[item.location] || [];
        location.push(item);
        locations[item.location] = location;
        return locations;
      }, {});

      const paises_total = [];
      for (const property in locations) {
        console.log(`{"${property}": ${locations[property].length}}`);
        paises_total.push(
          JSON.parse(
            `{"pais":"${property}", "vacunados": ${locations[property].length}}`
          )
        );
      }

      paises_total.sort((a, b) =>
        a.vacunados < b.vacunados ? 1 : b.vacunados < a.vacunados ? -1 : 0
      );
      res.send(paises_total);
      
    } catch (error) {
      res.send([]);
    }
  });
};
