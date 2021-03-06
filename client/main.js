const baseUrl = 'https://portal-covid-19.herokuapp.com'
$("document").ready(()=>{
    checkLocalStorage();

    $("#btn-submit").on("click", (e) => {
        e.preventDefault();
        login();
    })

    $("#sign-up").on("click", (e) => {
        e.preventDefault();
        $("#login-page").hide();
        $("#register-page").show();
        $("#home-page").hide();
        $("#rumah-sakit").hide();
    })

    $("#sign-in").on("click", (e) => {
        e.preventDefault();
        $("#login-page").show();
        $("#register-page").hide();
        $("#home-page").hide();
        $("#rumah-sakit").hide();
    })

    $("#create-member").on("click", (e) => {
        e.preventDefault();
        register();
    })

    $("#logout").on("click", (e) => {
        e.preventDefault();
        logout();
    })

    $("#logout-rs").on("click", (e) => {
        e.preventDefault();
        logout();
    })

    $("#home").on("click", (e) =>{
        e.preventDefault();
        $("#login-page").hide();
        $("#register-page").hide();
        $("#home-page").show();
        $("#rumah-sakit").hide();
    })

    $("#home-rs").on("click", (e) =>{
        e.preventDefault();
        $("#login-page").hide();
        $("#register-page").hide();
        $("#home-page").show();
        $("#rumah-sakit").hide();
        $("#judul-rs").empty();
        $("#data-hospital").empty();
    })
    
})

function login(){
    const email = $("#email-login").val();
    const password = $("#password-login").val();
    $.ajax({
        url: baseUrl+'/login',
        method: 'post',
        data: {
            email,
            password
        }
    })
        .done((response) => {
            // console.log(response, '<<<<<');
            Swal.fire('Welcome', 'success login','success')
            localStorage.setItem("access_token", response.token);
            checkLocalStorage();
            getDataTotalCovid();
            getDataCovidProvince();
        })
        .fail((err) => {
            if(!email || !password){
                Swal.fire('Error', 'email or password is required','error')
            }else{
                Swal.fire('Error', 'email or password invalid','error')
            }
            console.log(err);
        })
        .always(()=> {
            $("#password-login, #email-login").val("");
        })
}

function register(){
    const email = $("#email-registration").val();
    const password = $("#password-registration").val();
    console.log(email,password)
    $.ajax({
        url:baseUrl+"/register",
        method: 'post',
        data: {
            email,
            password
        }
    })
        .done(() => {
            Swal.fire('Succes', 'Success sign up','success')
            checkLocalStorage();
        })
        .fail((err) => {
            if(!email || !password){
                Swal.fire('Error', 'email or password is required','error')
            }else{
                Swal.fire('Error', 'email or password invalid','error')
            }
        })
        .always(()=> {
            $("#email-registration, #password-registration").val("");
        })
}

function getDataTotalCovid(){
    $.ajax({
        url: baseUrl+"/covid/total",
        method:'get',
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done((response) => {
            $("#data-positif").html(response.jumlah_positif.toLocaleString());
            $("#data-sembuh").html(response.jumlah_sembuh.toLocaleString());
            $("#data-meninggal").html(response.jumlah_meninggal.toLocaleString());
        })
        .fail(err => {
            console.log(err);
        })
}

function getDataCovidProvince(){
    $.ajax({
        url: baseUrl+"/covid",
        method:'get',
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done((response) => {
            let covids = response.covids;
            for ( let i = 0; i < covids.length; i++){
                if(covids[i].percent){
                    $("#data-covid").append(
                        `
                        <tr>
                        <th class="no" >${i+1}</th>
                        <td>
                        <a href = "#" style="text-decoration: none;" id="${covids[i].province}" onclick = "getDataHospital('${covids[i].province}');"> ${covids[i].province} </a>
                        </td>
                        <td>${covids[i].kasus.toLocaleString()}</td>
                        <td>${covids[i].sembuh.toLocaleString()}</td>
                        <td>${covids[i].meninggal.toLocaleString()}</td>
                        <td>${covids[i].percent.toFixed(2)}%</td>
                        </tr>
                        `
                    )
                }
            }
        })
        .fail(err => {
            console.log(err);
        })
}

function getDataHospital(province){
    $("#news").empty();
    $("#login-page").hide();
    $("#register-page").hide();
    $("#home-page").hide();
    $("#rumah-sakit").show();
    $.ajax({
        url: baseUrl+`/hospital/${province}`,
        method: 'get',
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(response => {
            $("#judul-rs").append(`
            <h2 class="text-center">Data Rumah Sakit <br> Di Provinsi ${province}</h2>
            `)
            response.forEach( (e,i) => {
                $("#data-hospital").append(
                    `
                    <tr>
                        <th class="no">${i}</th>
                        <td>${e.name}</td>
                        <td>${e.address}</td>
                        <td>${e.phone}</td>
                        <td>${e.region}</td>
                    </tr>
                    `
                )
            })
        })

    $.ajax({
        url: baseUrl+"/news",
        method: 'get',
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(response => {
            console.log(response);
            response.forEach( e => {
                $("#news").append(`
                <div class="col-4">
                    <div class="card mb-5 mx-auto" style="width: 25rem; height: 26rem">
                        <a href="${e.url}" target="_blank"><img src="${e.urlToImage}"
                            class="card-img-top py-3 px-3 w-100" alt="..." style="height: 250px"></a>
                        <div class="card-body ">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <a class="card-text" href="${e.url}" target="_blank" style="text-decoration: none;">${e.title}</a>
                                    <h6 class="card-text mt-3 font-weight-light" style="color: #ADADAD;">
                                        ${e.publishedAt.split('T')[0]}
                                    </h6>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                `)
            })
        })
}

function logout(){
    localStorage.removeItem("access_token");
    var auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut().then(function() {
        console.log('User signed out.');
    })
    Swal.fire('Succes', 'Success logout','success')
    checkLocalStorage();
    $("#judul-rs").empty();
    $("#data-hospital").empty();
    $("#data-covid").empty();
}

function checkLocalStorage(){
    if(localStorage.access_token){
        $("#login-page").hide();
        $("#register-page").hide();
        $("#home-page").show();
        $("#rumah-sakit").hide();

        getDataTotalCovid();
        getDataCovidProvince();
    } else {
        $("#login-page").show();
        $("#register-page").hide();
        $("#home-page").hide();
        $("#rumah-sakit").hide();
        
    }
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/googleLogin",
        data: {
            token: id_token
        }
    })
    .done((response) => {
        Swal.fire('Succes', 'Success login','success')
        localStorage.setItem("access_token", response.access_token)
        checkLocalStorage();
        getDataTotalCovid();
        getDataCovidProvince();
    })
    .fail((err) => {
        console.log(err);
    })
}
