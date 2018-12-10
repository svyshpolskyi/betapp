function ping() {
  setInterval(function() {
    http.get("http://bettingapp.herokuapp.com");
    console.log("--ping--");
  }, 300000); // every 5 minutes (300000)
}

export default ping;
