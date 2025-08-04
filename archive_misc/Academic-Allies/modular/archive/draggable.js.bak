function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.style.position = 'absolute';
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }


# Backup and fix the header layout
cp modular/shared-header.html modular/shared-header.html.bak

# Remove the duplicate justify-content rule that conflicts with proper positioning
sed -i '/\.header-content {/,/}/ { /justify-content: space-between/d; }' modular/shared-header.html

# Ensure home icon is properly positioned at top-left
sed -i '/\.home-link {/,/}/ s/text-align: [^;]*/text-align: left/' modular/shared-header.html
sed -i '/\.home-link {/,/}/ { /margin-left:/!s/}/  margin-left: 0;\n}/ }' modular/shared-header.html

# Stage, commit, and push all changes
git add modular/js/draggable.js modular/shared-header.html
git commit -m "Make status circle draggable and fix home icon position (CAj)"
git push

mkdir -p modular/js
cat > modular/js/draggable.js << 'EOF'
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.style.position = 'absolute';
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
window.onload = function() {
  var statusCircle = document.getElementById("status-circle");
  if (statusCircle) dragElement(statusCircle);
};
