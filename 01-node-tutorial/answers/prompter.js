const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let selectLabel = "Choose your favorite fruit right now.";
let apple = "Apple";
let peach = "Peach";
let orange = "Orange";
let banana = "Banana";
let grape = "Grape";

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = (selectedFruit = "") => {
  //const background = fruitColor[selectedFruit] || "pink";
  return `
  <head>
    <script>
      function changeBackgroundColor() {
        const fruitForm = document.getElementById('fruitForm');
        const selectedFruit = document.getElementById('fruits').value;
        let backgroundColor;

        switch (selectedFruit) {
          case 'apple': backgroundColor = 'lightgreen'; break;
          case 'peach': backgroundColor = 'coral'; break;
          case 'orange': backgroundColor = 'orange'; break;
          case 'banana': backgroundColor = 'yellow'; break;
          case 'grape': backgroundColor = 'lavender'; break;
          default: backgroundColor = 'white'; break;
        }

        fruitForm.style.backgroundColor = backgroundColor;
      }
    </script>
  </head>
  <body>
    <form id="fruitForm" method="POST">
      <label for="fruits">${selectLabel}</label>
      <select id="fruits" name="fruits" onchange="changeBackgroundColor()">
        <option value="empty">${selectedFruit}</option>
        <option value="apple">${apple}</option>
        <option value="peach">${peach}</option>
        <option value="orange">${orange}</option>
        <option value="banana">${banana}</option>
        <option value="grape">${grape}</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  </body>
  </html>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      // here, you can add your own logic
      let item = body["fruits"] ? body["fruits"] : "Nothing was selected.";
      console.log("Selected fruit:", item);
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.on("request", (req) => {
  console.log("event received: ", req.method, req.url);
});

server.listen(3000);
console.log("The server is listening on port 3000.");
