import { limitWords } from "../utils/functions.mjs"

const modal = document.querySelector("#newTicketModal")

document.querySelectorAll("#ticketsTable tbody tr td:nth-child(4)").forEach((description) => {
    description.innerHTML = limitWords(description.innerHTML)
})

document.querySelector("#newTicket").addEventListener("click", () => {
    modal.classList.remove("hidden")
    modal.classList.add("flex")
})

document.querySelector("#closeModal").addEventListener("click", () => {
    modal.classList.remove("flex")
    modal.classList.add("hidden")
})