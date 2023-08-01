/*
1. Pegar os valores
2. Calcular a Idade
      a. Com base no ano
      b. Com mês (EXTRA)
      c. Com dia (EXTRA)

3. Gerar a faixa etária
   
    Resultado            Faixa
    0 à 12                Criança
    13 à 17                Adolescente
    18 à 65               Adulto
    Acima de 65         Idoso
   

4. Organizar o objeto pessoa para salvar na lista
5. Cadastrar a pessoa na lista
6. Função para carregar as pessoas, carrega a lista do localStorage, chamar ao carregar a página
7. Renderizar o conteúdo da tabela com as pessoas cadastradas
8. Botão para limpar os registros; */


function Calcular (event) {
    event.preventDefault()

    console.log("Foi executada a funcao calcular")

    let usuario = receberValores() // Passo 1
    let IdadeCalculada = calcularIdade() //Passo 2
    let faiEtaria = faixaEtaria() //Passo 3

    console.log(faiEtaria)

    usuario = organizarObjeto(usuario, IdadeCalculada, faiEtaria) //Passo 4

    cadastrarUsuario(usuario) //Passo 5

    window.location.reload() // adicionar na lista sem precisar atualizar a pagina // Passo 6

}


// Passo 1
function receberValores() {
    let nomeRecebido =  document.getElementById("nome").value.trim()
    let nascimentoRecebido =  document.getElementById("nascimento").value

    let dadosUsuario = {
        nome: nomeRecebido,
        diaNascimento: nascimentoRecebido
    }

    console.log(dadosUsuario)

    return dadosUsuario
}




//Passo 2
function calcularIdade (){

    let idade = anoNascimento - anoAtual

    console.log(idade)

    return idade

}




//Passo 3
function faixaEtaria (idade){
/*     
    Resultado            Faixa
    0 à 12                Criança
    13 à 17                Adolescente
    18 à 65               Adulto
    Acima de 65         Idoso
*/
    if( idade <= 12){
        return "Criança"

    }else if (idade > 12 && idade <= 17){
        return "Adolescente"

    }else if(idade > 17 && idade <= 65){
        return "Adulto"

    }else{
        return "Idoso"
    }

}


//Passo 4
function organizarObjeto (dadosUsuario, valorIdade, faixaEtaria ){
    let dataAtual = new Intl.DateTimeFormat ('pt-br', { dateStyle:'short'}).format(Date.now())
    
    console.log(dataAtual);
    
    let dadosUsuarioAtualizado = {
        ... dadosUsuario,
        idade: valorIdade,
        Etaria: faixaEtaria,
        dataCadastro: dataAtual
    }

    return dadosUsuarioAtualizado
}



//Passo 5
function cadastrarUsuario (dadosUsuario) {
    let listaUsuarios = []

    if (localStorage.getItem("usuariosCadastrados") != null){ // se houver uma lista de usuarios no localStorage, carregar isso para a variavel
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados")) // converte de volta ao objeto

    }

    listaUsuarios.push(dadosUsuario) // adiciona o usuario na lista de usuario
    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios) ) // salva a listaUsuarios no localStorage //JSON para transformar em string
}


//Passo 6
function carregarUsuarios (){
    let  listaCarregada = []

    if (localStorage.getItem("usuariosCadastrados") != null){ // caso nao tenha e a mesma coisa que != null
        listaCarregada = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }

    if(listaCarregada.length == 0){
        // se nao tiver nenhum usuario cadastrado, mostrar mensagem //lenth e comprimento
        let tabela = document.getElementById("corpo-tabela") // elemento da tabela no html "corpo-tabela"

        tabela.innerHTML = `<tr class = "linha-mensagem" >
            <td colspan="4">Nenhum usuario cadastrado :( </td>
        </tr>`
    }
    window.addEventListener("DOMContentLoaded" , () => carregarUsuarios()) // escutador de eventos / quando carregar execute a function // Passo 6 esta sendo chamado aqui
}