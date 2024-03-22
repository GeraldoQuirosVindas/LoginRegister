const errorMessage = document.getElementsByClassName("error")[0];

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.children.email.value;
    const password = e.target.children.password.value;
    const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer <token>"
        },
        body: JSON.stringify({
            email, password
        })
    });
    if (!res.ok) return errorMessage.classList.toggle("hide", false);
    const resJson = await res.json();
    if (resJson.redirect) {
        window.location.href = resJson.redirect;
    }
})