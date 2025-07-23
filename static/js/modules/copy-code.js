// document.addEventListener('DOMContentLoaded', function () {
//   document.querySelectorAll('.copy-btn').forEach(function (btn) {
//     btn.addEventListener('click', function () {
//       const code = btn.parentElement.querySelector('code');
//       if (!code) return;
//       const text = code.innerText;
//       navigator.clipboard.writeText(text).then(function () {
//         btn.textContent = 'Copied!';
//         btn.classList.remove('btn-secondary');
//         btn.classList.add('btn-success');
//         setTimeout(function () {
//           btn.textContent = 'Copy';
//           btn.classList.remove('btn-success');
//           btn.classList.add('btn-secondary');
//         }, 1500);
//       });
//     });
//   });
// });
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Look for code element in the parent container
      const container = btn.closest('.highlight-container');
      if (!container) return;
      const code = container.querySelector('code');
      if (!code) return;
      const text = code.innerText;
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = 'Copied!';
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-success');
        setTimeout(function () {
          btn.textContent = 'Copy';
          btn.classList.remove('btn-success');
          btn.classList.add('btn-secondary');
        }, 1500);
      });
    });
  });
});