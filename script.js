function allowDrop(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('highlight');
}

function dragLeave(e) {
    e.preventDefault();
    e.target.classList.remove('highlight');
}

function drag(e) {
    e.dataTransfer.setData("text", e.target.id);
    e.target.style.opacity = '0.4';
}

function drop(e) {
    e.preventDefault();
    e.target.classList.remove('highlight');
    
    const data = e.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    draggedElement.style.opacity = '1';
    
    // Verifica se já está em uma tier list
    if (draggedElement.parentElement.classList.contains('tier-items')) {
        e.target.appendChild(draggedElement);
    } else {
        // Cria uma cópia para permitir múltiplas classificações
        const clone = draggedElement.cloneNode(true);
        clone.id = data + '-' + Date.now(); // ID único
        clone.setAttribute('draggable', 'true');
        clone.addEventListener('dragstart', drag);
        e.target.appendChild(clone);
    }
}