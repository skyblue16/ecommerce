$(document).ready(function() {
  // Inicializar la base de datos
  var config = {
    apiKey: 'AIzaSyCA_qTHoFGTVKRvPSAMCajPblhVZJ73Zk0',
    authDomain: 'demoapp-30f5d.firebaseapp.com',
    databaseURL: 'https://demoapp-30f5d.firebaseio.com',
    projectId: 'demoapp-30f5d',
    storageBucket: 'demoapp-30f5d.appspot.com',
    messagingSenderId: '992985819602'
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var articulo;
  var descripcion;
  var precio;
  var imagen;

  $('#imagen').change(function() {
    var descriptor = new FileReader();
    descriptor.readAsDataURL(this.files[0]);

    descriptor.onloadend = function() {
      imagen = descriptor.result;
      $('#previsualizacion').attr('src', imagen);
    };
  });


  $('#formularioAlta').change(function() {
    articulo = $('#articulo').val();
    descripcion = $('#descripcion').val();
    precio = $('#precio').val();

    if (articulo && descripcion && precio) {
      $('#botonGuardar').prop('disabled', false);
    } else {
      $('#botonGuardar').prop('disabled', true);
    }
  });


  $('#botonGuardar').click(function() {
    articulo = $('#articulo').val();
    descripcion = $('#descripcion').val();
    precio = $('#precio').val();

    if (!imagen) {
      imagen = 'NONE';
    }

    // Indicamos que la referencia base de nuestra base de datos es productos (algo así como el padre)
    // del que colgarán el resto de nodos hijos.
    /*
        var usersRef = new Firebase('https://samplechat.firebaseio-demo.com/users');
        var fredRef = usersRef.child('fred');
        var fredFirstNameRef = fredRef.child('name/first');
        */
    var referencia = database.ref('productos');


    // De la siguiente forma el método sobreescribe los datos
    /*
        referencia.set(
        {
            articulo: articulo,
            descripcion: descripcion,
            precio: precio,
            imagen: imagen
        });
        */

    // Ahora estamos poniendo el articulo como clave en la colección
    // De esta manera podremos añadir nuevos articulos o actualizar uno ya existente.

    /*
        referencia.child(articulo).set(
        {
            descripcion: descripcion,
            precio: precio,
            imagen: imagen
        });
        */

    // Si queremos permitir que hayas artículos con nombres duplicados entonces tendremos
    // que decirle a Firebase que utilice otra clave en lugar del nombre del articulo.
    // Usaremos el método push en lugar de set
    referencia.push(
      {
        articulo: articulo,
        descripcion: descripcion,
        precio: precio,
        imagen: imagen
      }, function() {
        alert('El alta se ha realizado correctamente');
      });
  });
});