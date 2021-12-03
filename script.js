window.onload = meuPerfil ();
window.onload = meuRepo;
var appForm = document.querySelector("#app form");
var listaEl = document.querySelector("#app ul");
var listaEl2 = document.querySelector(".mostraRepo ul");
var xhttp = new XMLHttpRequest();

var url_base = 'https://api.github.com/';

var lista = [];
var lista1 = [];

appForm.onsubmit = buscarRepo;
function meuPerfil (){
    let xhr = new XMLHttpRequest ();
    
             
    
    xhr.onload = function(){
            let dado = JSON.parse(this.responseText)
               
            let perfil = `<div class="col-12 ">
                        <img id="per" class="img1" width="60%" src="${dado.avatar_url}">
                        </div>
                        <div class="col-12 col-sm-12 col-md-5 col-lg-7">
                        <h5>${dado.name} <br>Login: ${dado.login}</h5>
                        <h6>${dado.bio}</h6>
                        <a href="${dado.html_url}" target="_blank" class="botaoGit">Perfil GitHub</a> 
                        </div>`;
          document.getElementById(`perfill`).innerHTML = perfil;
            } 
             xhr.onerror = function(){
                alert(`retorno da requisição: ${this.status} - ${this.statusText}`);
            }
             xhr.open('GET', 'https://api.github.com/users/igorrr2');
             xhr.send();
}
function buscarRepo(e){
	e.preventDefault();

	var user = document.getElementById("input_user").value;
	if(user.length === 0) {
		alert("Por favor, preencha o nome do usuário");
		return;
	}

	var url = url_base + 'users/' + user + '/repos';
	xhttp.open('GET', url);
	xhttp.send();

	xhttp.onreadystatechange = function(){
		if(xhttp.readyState === 4){
			if(xhttp.status === 200){
				var result = JSON.parse(xhttp.responseText);
				//console.log(result);

				lista = result.map(function(item){
					return { 
						name: item.name, 
						description: item.description, 
						html_url: item.html_url 
					};
				});
				renderLista();
			}
			else{
				alert('Falha ao buscar usuário. Tente novamente.');
			}
		}
	}
}


function renderLista(){
	listaEl.innerHTML = '';

	for(item of lista){
		var nameEl = document.createElement('strong');
		nameEl.appendChild(document.createTextNode(item.name));

		var descriptionEl = document.createElement('p');
		descriptionEl.appendChild(document.createTextNode(item.description));

		var urlEl = document.createElement('a');
		urlEl.setAttribute('href', item.html_url);
		urlEl.setAttribute('target', '_blank');
		urlEl.appendChild(document.createTextNode("Ver repositório"));

		var itemEl = document.createElement('li');
		itemEl.appendChild(nameEl);
		itemEl.appendChild(descriptionEl);
		itemEl.appendChild(urlEl);

		listaEl.appendChild(itemEl);
	}
}

function meuRepo(e){
	e.preventDefault();
  xhttp.open('GET', 'https://api.github.com/users/igorrr2/repos');
	xhttp.send();

	xhttp.onreadystatechange = function(){
		if(xhttp.readyState === 4){
			if(xhttp.status === 200){
				var result = JSON.parse(xhttp.responseText);
				//console.log(result);

				lista1 = result.map(function(item){
					return { 
						name: item.name, 
						description: item.description, 
						html_url: item.html_url 
					};
				});
				mostrarRepo();
			}
			else{
				alert('Falha ao buscar usuário. Tente novamente.');
			}
		}
	}
}


function mostrarRepo(){
	listaEl.innerHTML = '';

	for(item of lista1){
		var nameEl = document.createElement('strong');
		nameEl.appendChild(document.createTextNode(item.name));

		var descriptionEl = document.createElement('p');
		descriptionEl.appendChild(document.createTextNode(item.description));

		var urlEl = document.createElement('a');
		urlEl.setAttribute('href', item.html_url);
		urlEl.setAttribute('target', '_blank');
		urlEl.appendChild(document.createTextNode("Ver repositório"));

		var itemEl = document.createElement('li');
		itemEl.appendChild(nameEl);
		itemEl.appendChild(descriptionEl);
		itemEl.appendChild(urlEl);

		listaEl2.appendChild(itemEl);
	}
}


