var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");
var trash = document.getElementsByClassName("fa-trash");
var comments = document.querySelector(".comments");
var comInput = document.querySelector("#comInput");
var comButton = document.querySelector(".comButton");


Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});

comButton.addEventListener('click', (event) => {
  event.preventDefault()
  let comment = comInput.value;
  let button = comButton.value;
  console.log(comment)
  fetch('/comments', {
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    'comment': comment,
    'id': button
  })
 })
})


const infoFetch = () =>{
  let location = input.value;
  fetch(`https://www.googleapis.com/civicinfo/v2/representatives?address=[address]&levels=country&roles=legislatorUpperBody&roles=legislatorLowerBody&key=KEY`)
    .then( res => res.json())
    .then(data => {
      let info = data.normalizedInput
      document.querySelector('#display').textContent = info;
    })
}

submit.addEventListener('click', (event) => {
  event.preventDefault();
})

submit.addEventListener('click', infoFetch);
