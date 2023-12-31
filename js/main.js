$(window).load(function() {
  $('.leoslider').leoslider({
    animation: "slide"
  });
});


$(document).ready(function () {
  $(".customer__carousel").owlCarousel({
    items: 2,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    margin: 20,

    responsiveClass: true,

    responsive: {
      320: {
        items: 1,
      },
      767: {
        items: 2
      }
    }
  });
});


const feedbackForm = document.querySelector('.feedback__form')

feedbackForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  
  const feedbackTel = feedbackForm.querySelector('#feedbackTel')
  const feedbackLoading = feedbackForm.querySelector("#feedbackLoading");
  const feedbackLoadingDate = feedbackForm.querySelector("#feedbackLoadingDate");
  const feedbackLoadingStartTime = feedbackForm.querySelector("#feedbackLoadingStartTime");

  const feedbackUnloading = feedbackForm.querySelector("#feedbackUnloading");
  const feedbackUnloadingDate = feedbackForm.querySelector("#feedbackUnloadingDate");
  const feedbackUnloadingStartTime = feedbackForm.querySelector("#feedbackUnloadingStartTime");

  const feedbackDescription = feedbackForm.querySelector("#feedbackDescription");

  const feedbackBtn = feedbackForm.querySelector('.feedback__btn')

  // console.log(feedbackTel.value, feedbackLoading.value, feedbackLoadingDate.value, feedbackLoadingStartTime.value, feedbackUnloading.value, feedbackUnloadingDate.value, feedbackUnloadingStartTime.value)

  try {
    const res = await fetch("https://test-ho66.onrender.com/feedback", {
      method: "POST",
      body: JSON.stringify({
        phone: feedbackTel.value,
        loadingAddress: feedbackLoading.value,
        loadingDate: feedbackLoadingDate.value,
        loadingStartTime: feedbackLoadingStartTime.value,
        unloadingAddress: feedbackUnloading.value,
        unloadingDate: feedbackUnloadingDate.value,
        unloadingStartTime: feedbackUnloadingStartTime.value,
        description: feedbackDescription.value
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(!res.ok) return console.log('Ошибка')

    const result = await res.json()

    if('success' in result && result.success) {
      feedbackBtn.innerHTML = "Success &#10003;";
      feedbackBtn.setAttribute('disabled', 'true')
    } else {
      alert('Something went wrong')
    }

  } catch(err) {
    alert('Something went wrong, please try again later!')
  }
})