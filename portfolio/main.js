// drop down menu
const dropDown = () => {
    document.getElementById('dropContent').classList.toggle('show');
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn h2')) {
        document.getElementById('dropContent').classList.remove('show');
    }
  }

//navigation on scroll
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    console.log(prevScrollpos);
  var currentScrollPos = window.pageYOffset;
  if(prevScrollpos < currentScrollPos ) { 
    document.getElementById("navbar").style.top = "0";
  }
  else {
    document.getElementById("navbar").style.top = "-200px";
  }
  prevScrollpos = currentScrollPos;
}