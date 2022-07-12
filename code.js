// JQUERY
let path = window.location.pathname;
let page = path.split("/").pop().replace('.html','');

$("document").ready(function(){
    //Form
    $("#reveal-book").click(function(){
        $("#myForm").load(`txt/form.txt`,function(){
            $("#location").load(`txt/opt-${page}.txt`,function(){
                $("#myForm").slideToggle().css("display","flex");
                $(function(){
                    let today = new Date();
                    
                    let month = today.getMonth() + 1;
                    let day = today.getDate();
                    let year = today.getFullYear();
                    if(month < 10)
                        month = '0' + month.toString();
                    if(day < 10)
                        day = '0' + day.toString();
                    
                    let maxDate = year + '-' + month + '-' + day;
                
                    $('#date').attr('min', maxDate);
                });
            });
        });
    //ticket
    });
    $("#submited").click(function(){
        $("#submited").fadeOut();
    });
    //index
    $(".opt, #opt-title").hide();
    $("#hero-title").click(function(){
        $("#hero-title").fadeOut(500,function(){
            $(".opt, #opt-title").fadeIn(500);
        });
        $("#hero").css("gap","2em")
    });

    //Block prev Date
})
//JAVASCRIPT


//Hide Navbar
let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
let currentScrollPos = window.pageYOffset;
if (prevScrollpos > currentScrollPos) {
    $("document").ready(function(){
        $("nav").slideDown(300);
    })
    
} else {
    $("document").ready(function(){
        $("nav").slideUp(300);
    })
}
prevScrollpos = currentScrollPos;
}


//submit
let form = document.getElementById("myForm");
let qrImg = document.getElementById("qr-img");
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

form.addEventListener('submit',function(event){
    event.preventDefault();

    let name = document.getElementById("name").value;
    let date = document.getElementById("date").value;
    
    date = new Date(date);
    console.log(typeof(date));
    date = date.toLocaleDateString('id-ID', options)

    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let loc = document.getElementById("location").value;
    let ticket = document.getElementById("ticket").value;

    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${email}`;    

    qrImg.addEventListener('load',function(){
        $(document).ready(function(){
            $("#submited").fadeIn().css("display","flex");
        });

        let myTicket = document.getElementById("txt-wrap");

        myTicket.innerHTML = `
        <h2 class="txt-center">Pembelian Ticket</h1>
        <h3 class="txt-center">${loc}</h3>
        <table>
        <tr>
            <td>Nama</td>
            <td>:</td>
        <td>${name}</td>
        </tr>
        <tr>
            <td>Email</td>
            <td>:</td>
            <td>${email}</td>
        </tr>
        <tr>
            <td>No. Telp</td>
            <td>:</td>
            <td>${phone}</td>
        </tr>
        <tr>
            <td>Tanggal</td>
            <td>:</td>
            <td>${date}</td>
        </tr>
        <tr>
            <td>Jumlah</td>
            <td>:</td>
            <td>${ticket}</td>
        </tr>
        </table>
    `
    });
});