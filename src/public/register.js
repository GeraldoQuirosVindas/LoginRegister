const errorMessage = document.getElementsByClassName("error")[0];

document.getElementById("register-form").addEventListener("submit", async(e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/register", {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: e.target.children.user.value,
            phone: e.target.children.phone.value,
            email: e.target.children.email.value,
            password: e.target.children.password.value
        })
    });
    if(!res.ok) return errorMessage.classList.toggle("hide",false);
    const resJson = await res.json();
    console.log("resJson", resJson)
    if(resJson.redirect){
        window.location.href = resJson.redirect;
    }
})