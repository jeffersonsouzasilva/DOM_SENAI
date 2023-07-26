// alert("Hello World!!")

//OK  1. Pegar os valores dos inputs
//OK  2. Fazer o calculo do IMC -> valorImc
//OK  3. Gerar a classificacao IMC -> classificacaoImc
//  4. Organizar os dados do usuario para salvar na lista e gerar a data do cadastro
//  5. Inserir os usuario na lista (salvar no localStorage [significa salvar no navegador])
//  6. Funcao para carregar os usuarios (localStorage), chamar ao carregar a pagina
//  7. Renderizar o conteudo da tabela com os usuarios cadastrados
//  8. Botao para limpar os registros (localStorage)


function calcular(event)/* conectado no evento calcular do html */{ 
    event.preventDefault()

    console.log("Foi executada a funcao calcular")

    let usuario = receberValores()
    let imcCalculado = calcularImc(usuario.altura, usuario.peso)
    let classificacaoImc = classificarImc(imcCalculado)

    console.log(classificacaoImc)
}

function receberValores() {
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

function calcularImc(altura, peso) /* parametro na funcao, ou seja precisa digitar esse valores */{
    let imc = peso / (altura * altura)

    console.log(imc)

    return imc
}

function classificarImc (imc) {
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