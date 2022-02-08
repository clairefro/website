// prevent focus box outline from appearing on clicked links (but keep for keyboard accessibilty)
// grab closest anchor tag to bubble up from non-text links (like svg icon links)

function handleDown(e) {
  e.target.closest('a').classList.add('mouse');
}

function handleBlur(e) {
  e.target.closest('a').classList.remove('mouse');
  // handle edge case of opening new tab
  document.activeElement.blur();
}

const links = document.querySelectorAll('a');

links.forEach((a) => {
  a.addEventListener('mousedown', handleDown);
  a.addEventListener('blur', handleBlur);
});

// Add copyright date in footer
const copyright = document.getElementById('copyright-goes-here');
copyright.innerText = `© ${new Date().getFullYear()}`;
