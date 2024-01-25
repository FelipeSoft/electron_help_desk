import { serverClient } from "../server/client.mjs"

const modal = document.querySelector("#confirmation")
const errorMessage = document.querySelector("#errorMessage")

var owner = "Nenhum"
var email = "Nenhum"
var company = "Nenhum"
var enterpriseIdentifier = "Nenhum"

document.querySelector("#buttonValidateToken").addEventListener("click", async () => {
    const inputToken = document.querySelector("#token").value
    const authMessage = document.querySelector("#authMessage")

    if (inputToken.length > 24 || inputToken.length < 24) {
        authMessage.innerHTML = "A Client Key deve conter 24 caracteres!"
        authMessage.classList.replace("text-gray-500", "text-red-500")
        return;
    }

    authMessage.innerHTML = ""

    try {
        const client = await serverClient.getClientByToken()

        owner = client.owner
        email = client.email
        company = client.company
        enterpriseIdentifier = client.enterpriseIdentifier
    } catch (error) {
        if (error instanceof TypeError) {
            if (error.message = "TypeError: Failed to fetch") {
                alert("Falha na Requisição: Não foi possível realizar a operação pois o servidor se encontra fora do ar.")
            }
            return
        }

        alert("Credencial Inválida: Não foi possível encontrar nenhum cliente com a Client Key informada. \n Por favor, verifique-a e tente novamente, caso o problema persistir solicite o suporte técnico da TH Soluções.")
    }

    errorMessage.classList.remove("block")
    errorMessage.classList.add("hidden")

    document.querySelector("#owner").innerHTML = owner
    document.querySelector("#email").innerHTML = email
    document.querySelector("#company").innerHTML = company
    document.querySelector("#identifier").innerHTML = enterpriseIdentifier
})

document.querySelector("#ok").addEventListener("click", async () => {
    modal.classList.remove("flex")
    modal.classList.add("hidden")

    const ok = await serverClient.invokeClientAgent()
    if (ok) {
        errorMessage.classList.remove("block")
        errorMessage.classList.add("hidden")
        window.location.href = "../views/home.html"
    } else {
        errorMessage.innerHTML = "Não foi possível concluir a autenticação..."
        errorMessage.classList.remove("hidden")
        errorMessage.classList.add("block")
    }
})

document.querySelector("#confirm").addEventListener("click", () => {
    if (owner === "" || company === "" || email === "" || enterpriseIdentifier === "") {
        errorMessage.classList.remove("hidden")
        errorMessage.classList.add("block")
        return;
    }

    errorMessage.classList.remove("block")
    errorMessage.classList.add("hidden")

    modal.classList.remove("hidden")
    modal.classList.add("flex")
})

document.querySelector("#remove").addEventListener("click", () => {
    document.querySelector("#owner").innerHTML = "Nenhum"
    document.querySelector("#email").innerHTML = "Nenhum"
    document.querySelector("#company").innerHTML = "Nenhum"
    document.querySelector("#identifier").innerHTML = "Nenhum"

    owner = ""
    email = ""
    company = ""
    enterpriseIdentifier = ""
})

const closeActions = document.querySelectorAll("#cancel, #close");
closeActions.forEach((element) => {
    element.addEventListener("click", () => {
        modal.classList.remove("flex")
        modal.classList.add("hidden")
    })
})