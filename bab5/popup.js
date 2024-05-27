document.getElementById('adminForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    
    if (name && email) {
        addAdminData(name, email);
        document.getElementById('adminForm').reset();
    } else {
        alert('Silakan masukkan nama dan email admin.');
    }
});

// Memuat data admin saat halaman dimuat
window.onload = function() {
    fetchAdminData();
};

function fetchAdminData() {
    fetch('https://example.com/admins')
    .then(response => response.json())
    .then(data => {
        data.forEach(admin => {
            addAdminData(admin.name, admin.email);
        });
    })
    .catch(error => console.error('Error fetching admin data:', error));
}

function addAdminData(name, email) {
    var table = document.getElementById('adminTable').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    cell1.innerHTML = name;
    cell2.innerHTML = email;
    cell3.innerHTML = '<button onclick="openEditPopup(this)">Edit</button> <button onclick="openDeletePopup(this)">Delete</button>';
}

function addAdminData(name, email) {
    var table = document.getElementById('adminTable').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    cell1.innerHTML = name;
    cell2.innerHTML = email;
    cell3.innerHTML = '<button onclick="openEditPopup(this)">Edit</button> <button onclick="openDeletePopup(this)">Delete</button>';
    
    // Simpan data admin ke localStorage
    var adminData = JSON.parse(localStorage.getItem('adminData')) || [];
    adminData.push({ name: name, email: email });
    localStorage.setItem('adminData', JSON.stringify(adminData));
}

function loadAdminData() {
    var adminData = JSON.parse(localStorage.getItem('adminData')) || [];
    adminData.forEach(function(admin) {
        addAdminData(admin.name, admin.email);
    });
}

// Fungsi-fungsi lainnya tetap sama seperti sebelumnya
function openEditPopup(button) {
    var row = button.parentNode.parentNode;
    var name = row.cells[0].innerHTML;
    var email = row.cells[1].innerHTML;
    document.getElementById('editName').value = name;
    document.getElementById('editEmail').value = email;
    document.getElementById('editPopup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    rowToDelete = row;
}

function openDeletePopup(button) {
    document.getElementById('deletePopup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    var row = button.parentNode.parentNode;
    rowToDelete = row;
}

function saveEdit() {
    var newName = document.getElementById('editName').value;
    var newEmail = document.getElementById('editEmail').value;
    rowToDelete.cells[0].innerHTML = newName;
    rowToDelete.cells[1].innerHTML = newEmail;
    
    // Perbarui data admin di localStorage
    var adminData = JSON.parse(localStorage.getItem('adminData')) || [];
    var index = Array.from(rowToDelete.parentNode.children).indexOf(rowToDelete);
    adminData[index] = { name: newName, email: newEmail };
    localStorage.setItem('adminData', JSON.stringify(adminData));
    
    closePopup();
}

function confirmDelete() {
    rowToDelete.remove();
    
    // Hapus data admin dari localStorage
    var adminData = JSON.parse(localStorage.getItem('adminData')) || [];
    var index = Array.from(rowToDelete.parentNode.children).indexOf(rowToDelete);
    adminData.splice(index, 1);
    localStorage.setItem('adminData', JSON.stringify(adminData));
    
    closePopup();
}

function closePopup() {
    document.getElementById('editPopup').style.display = 'none';
    document.getElementById('deletePopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}