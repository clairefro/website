// prevent focus box from appearing on clicked links (but keep for keyboard accessibilty)
function handleDown(e) {
  e.target.classList.add('mouse');
}

function handleBlur(e) {
  e.target.classList.remove('mouse');
}

const links = document.querySelectorAll('a');

links.forEach((a) => {
  a.addEventListener('mousedown', handleDown);
  a.addEventListener('blur', handleBlur);
});
