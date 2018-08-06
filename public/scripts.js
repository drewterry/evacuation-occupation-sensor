const http = new XMLHttpRequest();
const url = "http://10.1.5.135:3000/stall";

http.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    const occupied = JSON.parse(this.responseText).occupied;
    document.getElementById('occupied').style.display = occupied ? 'inline' : 'none';

    setTimeout(() => {
      http.open("GET", url)
      http.send();
    }, 1000);
  }
};

http.open("GET", url);
http.send();