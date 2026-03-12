document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    alert("El formulario fue enviado exitosamente");
    this.reset();
});