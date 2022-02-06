// prevent focus box from appearing on clicked links (but keep for keyboard accessibilty)
function handleDown(e) {
  // get parent <a> element for svg icon links
  const closestA = e.target.closest('a');
  closestA.classList.add('mouse');
}

function handleBlur(e) {
  // get parent <a> element for svg icon links
  const closestA = e.target.closest('a');
  closestA.classList.remove('mouse');
  // enforce blur of active element when opening new tab
  document.activeElement.blur();
}

const links = document.querySelectorAll('a');

links.forEach((a) => {
  a.addEventListener('mousedown', handleDown);
  a.addEventListener('blur', handleBlur);
});
