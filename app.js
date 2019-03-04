//Communication from client side with server using XMLHttpRequest OBJECT
const xml = new XMLHttpRequest(); //Constructor function create a new XMLHttp object

// XMLHttp .open method - specifies the type of request and 2 arguments required: (method (POST,GET...) and server URL)
xml.open("GET","https://mysafeinfo.com/api/data?list=rivers_europe&format=xml&abbreviate=false&case=default");

//Sends the request to the server
xml.send();

//onreadystatechange - defines a function to be called when the readyState property changes
xml.addEventListener('readystatechange',function () {
  if (xml.readyState == 4 && xml.status == 200) { // .readyState - Holds the status of the XMLHttpRequest - 4: requset finished and respnse is ready. Status returns the status number of a request - 200: OK.

    display();
  }
});

function display() {
  let data = xml.responseText; //get the response data as a string
  let parser = new DOMParser(); // pars from XML to DOM element
  let xmlData = parser.parseFromString(data,"text/xml"); //format from string
  let rivers = xmlData.getElementsByTagName('r'); //select all 'r' tags from XML

  //display XML river and Wikipedia links in HTML
  for (var i = 0; i < rivers.length; i++) {
    document.body.innerHTML += "<h2>"+rivers[i].getAttribute('River')+"</h2>"+
                                "<h3><a href='"
                                +rivers[i].getAttribute('Url')+
                                "'>"+"More on Wikipedia</a></h3>";
  }
};

//**
