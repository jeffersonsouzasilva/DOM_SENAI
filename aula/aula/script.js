// alert("Hello World!!")

//OK  1. Pegar os valores dos inputs
//OK  2. Fazer o calculo do IMC -> valorImc
//OK  3. Gerar a classificacao IMC -> classificacaoImc
//OK  4. Organizar os dados do usuario para salvar na lista e gerar a data do cadastro
//OK  5. Inserir os usuario na lista (salvar no localStorage [significa salvar no navegador])
//OK  6. Funcao para carregar os usuarios (localStorage), chamar ao carregar a pagina
//OK  7. Renderizar o conteudo da tabela com os usuarios cadastrados
//  8. Botao para limpar os registros (localStorage)


function calcular(event)/* conectado no evento calcular do html */{ 
    event.preventDefault()

    console.log("Foi executada a funcao calcular")

    let usuario = receberValores() // Passo 1
    let imcCalculado = calcularImc(usuario.altura, usuario.peso) // Passo 2
    let classificacaoImc = classificarImc(imcCalculado) // Passo 3

    console.log(classificacaoImc)

   /*  organizarDados(usuario, imcCalculado, classificacaoImc) */ // chamar a funcao e mostrar data/hora atual / dia 26/07
   usuario = organizarDados(usuario, imcCalculado, classificacaoImc) // Passo 4

   cadastrarUsuario (usuario) // chamar para armazenamento local // Passo 5

   window.location.reload() // adicionar na lista sem precisar atualizar a pagina
  
}





function receberValores() { // Passo 1
    let nomeRecebido =  document.getElementById("nome").value.trim() //elemento do html campo-form id nome //value valor do input //eliminar expacos vazios antes e depois 
    let alturaRecebida = document.getElementById("altura").value
    let pesoRecebida = document.getElementById("peso").value

    let dadosUsuario = {
        nome: nomeRecebido,
        altura: alturaRecebida,
        peso: pesoRecebida
    }

    console.log(dadosUsuario)
    // console.log(nomeRecebido)
    // console.log(alturaRecebida)
    // console.log(pesoRecebida)

    return dadosUsuario // retornar os dados do usuario ou seja usar essas informacoes em algum outro momento
}




function calcularImc(altura, peso) /* parametro na funcao, ou seja precisa digitar esse valores */{ //Passo 2
    let imc = peso / (altura * altura)

    console.log(imc)

    return imc
}





function classificarImc (imc) { // Passo 3
    /* 
    Resultado               Situacao
    Abaixo 18.5             Abaixo do peso
    Entre 18.5 e 24.99      Peso normal
    Entre 25 e 29.99        Sobrepeso
    Acima de 30             Obesidade
    */
    if (imc < 18.5){
        return "Abaixo do peso"

    } else if (imc >= 18.5 && imc < 25 ){
        return "Peso normal"

    } else if (imc > 25 && imc < 30 ) {
        return "Sobrepeso"
    } else {
        return "Obesidade"
    }
}





function organizarDados(dadosUsuario, valorImc, classificacaoImc){ //dia 26/07 // Passo 4
    /* let dataHoraAtual = new Date().toISOString() */ // retorno data de agora(now) /da trabalho e nao e funcional
    let dataHoraAtual = new Intl.DateTimeFormat ('pt-br', {timeStyle: 'long', dateStyle:'short'}).format(Date.now()) //data e horario atual tiago pesquisou chegou essa opcao de codigo 

    console.log(dataHoraAtual);

    let dadosUsuarioAtualizado = { // organizando o objeto
        ... dadosUsuario, // usar os dadosUsuario mais os outro itens
        imc: valorImc,
        situacaoImc: classificacaoImc,
        dataCadastro: dataHoraAtual
    }

    return dadosUsuarioAtualizado; // para retornar essas informacoes na tabela 

}




function cadastrarUsuario (dadosUsuario){ // Passo 5
    let listaUsuarios = []

    if (localStorage.getItem("usuariosCadastrados") != null){ // se houver uma liosta de usuarios no localStorage, carregar isso para a variavel
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados")) // converte de volta ao objeto

    }
    

    /* localStorage.setItem("nomeUsuario", "Thiago") */ // armezar no armazenamento local

    listaUsuarios.push(dadosUsuario) // adiciona o usuario na lista de usuario
    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios) ) // salva a listaUsuarios no localStorage //JSON para transformar em string
    

}




function carregarUsuarios(){ //Passo 6
    let  listaCarregada = []

    if (localStorage.getItem("usuariosCadastrados") != null){ // caso nao tenha e a mesma coisa que != null
        listaCarregada = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }

    if(listaCarregada.length == 0){
        // se nao tiver nenhum usuario cadastrado, mostrar mensagem //lenth e comprimento
        let tabela = document.getElementById("corpo-tabela") // elemento da tabela no html "corpo-tabela"

        tabela.innerHTML = `<tr class = "linha-mensagem" >
            <td colspan="6">Nenhum usuario cadastrado :( </td>
        </tr>`
    }else {
        //Montar conteudo da tabela
        montarTabela(listaCarregada) // do passo 7
    }

    console.log(listaCarregada)
}

window.addEventListener("DOMContentLoaded" , () => carregarUsuarios()) // escutador de eventos / quando carregar execute a function // Passo 6 esta sendo chamado aqui





function montarTabela(listaUsuarios){ // Passo 7 // 
    let tabela = document.getElementById("corpo-tabela")

    let template = ""

    listaUsuarios.forEach(usuario => { //adicionar cada linha a mais da lista
        template +=`<tr>   
        <td data-cell="nome"> ${usuario.nome} </td>
        <td data-cell="altura"> ${usuario.altura} </td>
        <td data-cell="peso"> ${usuario.peso}</td>
        <td data-cell="valor do IMC"> ${usuario.imc.toFixed(2)} </td> 
        <td data-cell="classificação do IMC"> ${usuario.situacaoImc} </td>
        <td data-cell="data de cadastro"> ${usuario.dataCadastro} </td>
    </tr>` 
})

    tabela.innerHTML = template;
}





function deletarRegistros() { //Passo 8
    localStorage.removeItem("usuariosCadastrados") // remove o item do localStorage

    window.location.reload() // recarrega a pagina
}