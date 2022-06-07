<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

const placeOrderBtn = document.querySelector('#placeOrderBtn');
placeOrderBtn.addEventListener("click", orderPlaced);

// <script>
function orderPlaced(event) {
  const email = document.querySelector('#email').value;
  const fullName = document.querySelector('#name').value;
  const street1 = document.querySelector('#street1').value;
  const street2 = document.querySelector('#street2').value;
  const city = document.querySelector('#city').value;
  const state = document.querySelector('#state').value;
  const zip = document.querySelector('#zip').value;

  axios.post({
    method: 'post',
    url: 'http://localhost:3000/purchase',
    body: {
      email: email,
      fullName, fullName,
      street1, street1,
      street2, street2,
      city: city,
      state: state,
      zip: zip
    }
  }).then(res => {
    console.log(res);
  })
}
// </script>
