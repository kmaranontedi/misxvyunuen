document.getElementById('guestForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Obtener los valores de nombre y apellido
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
  
    // Realizar la petición al servidor (simulada)
    fetch('invitados15.xlsx')
      .then(response => response.arrayBuffer())
      .then(buffer => {
        // Convertir el buffer en un libro de Excel
        const workbook = XLSX.read(buffer, { type: 'array' });
        // Obtener la primera hoja del libro
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        // Obtener los datos como JSON
        const data = XLSX.utils.sheet_to_json(sheet);
  
        // Buscar al invitado por nombre y apellido
        const invitado = data.find(inv => inv.Nombre === nombre && inv['Apellido_Paterno'] === apellido);
  
        if (invitado) {
          const numeroMesa = invitado.Mesa;
          const mapaURL = `imagenes/${numeroMesa}.png`; // Directorio actualizado
          const mensaje = `¡Bienvenido! Tu mesa es la número ${numeroMesa}.<br><img src="${mapaURL}" alt="Mapa de mesas">`;
          document.getElementById('mensaje').innerHTML = mensaje;
        } else {
          document.getElementById('mensaje').innerHTML = 'Lo sentimos, no hemos podido encontrar tu mesa.';
        }
      })
      .catch(error => {
        console.error('Error al cargar los datos:', error);
        document.getElementById('mensaje').innerHTML = 'Lo sentimos, ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.';
      });
  });
  
