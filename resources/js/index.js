Vue.component('modal', {
	template: '#modal-template'
})


const app = new Vue({
	el: '#app',
	created() {
	},
	data:{
		showModal: false,
		cantidad: 1,
		punto: 10,
		nombre: '',
		tieneInv: false,
		personas: [],
		seleccionado: {},
		zapatos: [
		{id:0,folio:"XA23",nombre:"Zapato clasico",ruta: "resources/img/z1.jpg",precio: 1000.0},
		{id:1,folio:"XA24",nombre:"Zapato de caballero 1",ruta: "resources/img/z2.jpg",precio: 1100.0},
		{id:2,folio:"XA25",nombre:"Zapato de cabellero 2",ruta: "resources/img/z3.jpg",precio: 1200.0},
		{id:3,folio:"XA26",nombre:"Zapato de caballero 3",ruta: "resources/img/z4.jpg",precio: 1300.0},
		{id:4,folio:"XA27",nombre:"Zapato de caballero 4",ruta: "resources/img/z5.jpg",precio: 2000.0},
		{id:5,folio:"XA28",nombre:"Zapato de caballero 5",ruta: "resources/img/z6.jpg",precio: 2200.0},
		{id:6,folio:"XA29",nombre:"Zapato de caballero 6",ruta: "resources/img/z7.jpg",precio: 2300.0},
		{id:7,folio:"XA30",nombre:"Zapato de caballero 7",ruta: "resources/img/z8.jpg",precio: 1100.0},
		{id:8,folio:"XA31",nombre:"Zapato de caballero 8",ruta: "resources/img/z9.jpg",precio: 4000.0},
		{id:9,folio:"XA32",nombre:"Zapato de caballero 9",ruta: "resources/img/z10.jpg",precio: 2000.0}
		],
		colores: [
		{id:0,nombre:"Negro"},
		{id:1,nombre:"Gris"},
		{id:2,nombre:"Cafe"},
		],
		slctColores: null,
		slctEstilos: null,
		slctPieles: null,
		estilos: [
		{id:0,nombre:"Estilo 1"},
		{id:1,nombre:"Estilo 2"},
		{id:2,nombre:"Estilo 3"},
		{id:3,nombre:"Estilo 4"},
		{id:4,nombre:"Estilo 5"},
		],
		pieles: [
		{id:0,nombre:"Piel 1"},
		{id:1,nombre:"Piel 2"},
		{id:2,nombre:"Piel 3"},
		],
		carrito: []
	},
	methods:{
		selecionar: function (id) {
			this.seleccionado = this.zapatos[id];
			this.showModal = true;
		},
		close: function (id) {
			this.seleccionado = {};
			this.showModal = false;
		},
		addCarrito: function () {
			if(this.slctColores == null || this.slctEstilos == null || this.slctPieles == null)
			{
				alert("Debes seleccionar una opcion en los menus desplegables");
				return 0;	
			}
			this.seleccionado.color = this.slctColores;
			this.seleccionado.estilo = this.slctEstilos;
			this.seleccionado.pieles = this.slctPieles;
			this.seleccionado.cantidad = this.cantidad;
			this.seleccionado.punto = this.punto;
			console.log(this.seleccionado);
			this.carrito.push(this.seleccionado);
			if(this.carrito.total == null)
			{
				this.carrito.total = 0;
			}
			this.carrito.total = (this.carrito.total+(this.seleccionado.precio*this.cantidad));
			this.cantidad = 1;
			this.showModal = false;
			this.seleccionado = {};
			this.slctColores = null;
			this.slctEstilos = null;
			this.slctPieles = null;
			this.tieneInv = true;

		},
		deleteCarrito: function(index){
			this.carrito.splice(index, 1);
			this.carrito.total = 0;
			if(this.carrito.length >= 1)
			{
				for (var i = 0; i < this.carrito.length; i++) {
					this.carrito.total = (this.carrito.total+(this.seleccionado.precio*this.cantidad));
				}
			}else{
				this.tieneInv = false;
			}

		},
		clearCarrito: function(index){
			if(this.carrito.length > 0)
			{
				this.carrito = [];
				this.tieneInv = false;
			}else{
				Swal.fire({
					icon: 'error',
					title: 'Error',
					text: 'No tienes nada en la compra',
				});
			}

		},
		comprarCarrito: function(index){
			if(this.carrito.length > 0)
			{
				if(this.nombre == '')
				{
					this.carrito = [];
					this.tieneInv = false;
					Swal.fire({
						icon: 'success',
						title: 'Compra de publico general',
						text: 'Se ha realizado la venta',
					});
					return 0;
				}
				this.carrito = [];
				this.tieneInv = false;
				console.log(this.personas);
				if(this.personas.length > 0)
				{
					var persona = this.personas.find(a => a.nombre === this.nombre);
					persona.puntos = (persona.puntos+1);
					Swal.fire({
						icon: 'success',
						title: 'Estimado '+persona.nombre,
						text: 'Ahora tienes '+persona.puntos+' puntos',
					});
					console.log(persona.puntos);
					this.nombre = '';
					return 1;

				}else{
					var persona = {nombre: this.nombre,puntos: 1};
					Swal.fire({
						icon: 'success',
						title: 'Estimado '+persona.nombre,
						text: 'Usted comenzara a acumular puntos',
					});
					this.personas.push(persona);
					console.log(this.personas);
					this.nombre = '';
					return 1;
				}
			}else{
				Swal.fire({
					icon: 'error',
					title: 'Error',
					text: 'No tienes nada en la compra',
				});
			}




		}

	}
});
