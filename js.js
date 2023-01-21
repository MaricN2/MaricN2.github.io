// Artikal klasa
class Korisnik{
    constructor(email,username,password,grad,adresa,telefon){
        this.email=email;
        this.username=username;
        this.password=password;
        this.grad=grad;
        this.adresa=adresa;
        this.telefon=telefon;
    }
}



// document.getElementById('tastature').addEventListener('click',proizvodi("tastature"));
// document.getElementById('slusalice').addEventListener('click',proizvodi);
// document.getElementById('monitori').addEventListener('click',proizvodi);
// document.getElementById('laptopovi').addEventListener('click',proizvodi);
// document.getElementById('monitori').addEventListener('click',proizvodi);
// document.getElementById('tableti').addEventListener('click',proizvodi);


document.getElementById('pretragaBar').addEventListener('keyup',pretragaDisplay)
document.getElementById('registracija').addEventListener("click",registracija)

function ispisArtikla(){
    var xhr=new XMLHttpRequest();
    var br=0,brr=0;
    xhr.open('GET','artikli.json',true)
    xhr.onload=function(){
        if(this.status==200){
            var artikli=JSON.parse(this.responseText);
            artikli.sort(function(a,b){return a.popust-b.popust});
            artikli.reverse();
            var output='';
            for(var i in artikli){
            br++;
            // if(br===4){
            // output += '<div class="row text-center">';}
            output += '<div class="col-md-3 col-sm-4 col-6 d-flex align-items-stretch">' +
            '<div class="card mb-4 mx-2">' +
            '<div class="card-body text-center">' +
            '<a href="artikal.html?id='+artikli[i].id+'">'+
            '<img src="'+artikli[i].slika+'" class="card-img-top img-fluid" alt="...">' +
            '</a>';
            if(artikli[i].popust!=0){
            output +=
            '<span class="carousel-caption tekst badge" style="width:60px">-'+artikli[i].popust+'%</span>' ;}
            output +='<h4 class="card-title mt-2">'+artikli[i].ime+'</h4>' ;
            if(artikli[i].popust!=0){
            output +=
            '<p class="card-text fs-6 " style="text-decoration-line:line-through; color:gray;">Cena: '+artikli[i].cena+'</p>' +
            '<p class="card-text fs-5 mb-4" style="line-height:1.4; color:rgb(180, 14, 14); font-weight:bold;">Cena: '+parseFloat(artikli[i].cena)*parseFloat('0.'+(100-artikli[i].popust))+' RSD</p>';
            }
            else{
            output +=
            '<p class="card-text fs-5 mt-4" style="font-weight:bold;">Cena: '+artikli[i].cena+' RSD</p>';
            }
            output +=
            '<a href="artikal.html?id='+artikli[i].id+'" class="btn" id="dropdownMenu">Kupi ></a>' +
            '</div>' +
             '</div>'+
             '</div>'+
             '</div>';
             if(br===8){
             break;}
            //  if(br===4)
            //  {
            //      '</div>'
            //      br=1;
            //  }
            //  else{
            //      br++;
            //  }
            }
        document.getElementById('artikli').innerHTML=output;
        }
    }
    xhr.send();
}

function passValue(value){
    var tip=value;
    sessionStorage.setItem("tip",tip);
}

function proizvodi(x,y){
    var tip=new URLSearchParams(window.location.search)
    console.log(tip);
    var xhr=new XMLHttpRequest();
    var br=(y-1)*16,brr=0;
    let i=y-1;
    xhr.open('GET','artikli.json',true)
    xhr.onload=function(){
        if(this.status==200){
        var artikli=JSON.parse(this.responseText);
        artikli=artikli.filter(function(artikal){
            if(artikal.tip == tip.get('tip'))
            {
               return true;
            }});
        if(artikli.length%16!=0)
        brojStrana=parseInt(artikli.length/16)+1;
        else
        brojStrana=parseInt(artikli.length/16);
        console.log(brojStrana);
        switch(x)
        {
            case 1:
                artikli.sort(function(a,b){
                    return (parseFloat(a.cena)-parseFloat(a.cena)*parseFloat(a.popust)/100)-(parseFloat(b.cena)-parseFloat(b.cena)*parseFloat(b.popust)/100)
                });
                console.log(x)
                break;
            case 2:
                artikli.sort(function(a,b){
                    return (parseFloat(b.cena)-parseFloat(b.cena)*parseFloat(b.popust)/100)-(parseFloat(a.cena)-parseFloat(a.cena)*parseFloat(a.popust)/100)
                });
                break;
            case 3:
                artikli=artikli.filter(function(artikal){
                    if(artikal.popust != 0)
                    {
                       return true;
                    }});
                    if(artikli.length%16!=0)
                    brojStrana=parseInt(artikli.length/16)+1;
                    else
                    brojStrana=parseInt(artikli.length/16);
                    console.log(brojStrana);
                    break;
            default:
                break;
        }
            console.log(artikli);
            var output='';
            output +=
            '<div class="col-md-2">' +
                '<div class="list-group">' +
                '<button type="button" class="list-group-item list-group-item-action mt-2" onclick="proizvodi(1,1)">Cena rastuce</a>' +
                '<button type="button" class="list-group-item list-group-item-action" onclick="proizvodi(2,1)">Cena opadajuce</a>' +
                '<button type="button" class="list-group-item list-group-item-action" onclick="proizvodi(3,1)">Popusti</a>' +
                '<button type="button" class="list-group-item list-group-item-action disabled pb-5 mb-5"></a>' +
                '</div>' +
                '</div>' +
            '<div class="col-md-10">' +
            '<div class="row">';
            for(i=(y-1)*16; i<(Math.min(y*16,artikli.length));i++){
                console.log(i);
                output += 
                '<div class="col-lg-3 col-md-4 col-sm-6 col-6 d-flex align-items-stretch">' +
                '<div class="card mb-4 mx-2">' +
                '<div class="card-body text-center">' +
                '<a href="artikal.html?id='+artikli[i].id+'">'+
                '<img src="'+artikli[i].slika+'" class="card-img-top img-fluid" alt="...">'+
                '</a>' ;
                if(artikli[i].popust!=0){
                output +=
                '<span class="carousel-caption tekst badge" style="width:60px">-'+artikli[i].popust+'%</span>' ;}
                output +='<h4 class="card-title mt-2">'+artikli[i].ime+'</h4>' ;
                if(artikli[i].popust!=0){
                output +=
                '<p class="card-text fs-6 " style="text-decoration-line:line-through; color:gray;">Cena: '+artikli[i].cena+'</p>' +
                '<p class="card-text fs-5 mb-4" style="line-height:0.4; color:rgb(180, 14, 14); font-weight:bold;">Cena: '+parseFloat(artikli[i].cena)*parseFloat('0.'+(100-artikli[i].popust))+' RSD</p>';
                }
                else{
                output +=
                '<p class="card-text fs-5 mt-4" style="font-weight:bold;">Cena: '+artikli[i].cena+' RSD</p>';
                }
                output +=
                '<a href="artikal.html?id='+artikli[i].id+'" class="btn" id="dropdownMenu">Kupi ></a>' +
                '</div>' +
                 '</div>'+
                 '</div>' ;
        }
        output += '</div>'+
        '</div>'+
        '<div class="container text-center my-4">';
        for(let z=0; z<brojStrana ;z++){
            output += 
            '<button type="button" class="btn btn-primary-dark mx-2 " style="width:fit-content; font-weight: bold; font-size:20px;" onclick="proizvodi('+x+','+(z+1)+')">'+(z+1)+'</a>';
        }
        document.getElementById('artikli').innerHTML=output;
    }
    }
    xhr.send();
}

function pretragaDisplay(){
    // document.getElementById("pretragaBar").click();
    var xhr=new XMLHttpRequest();
    xhr.open('GET','artikli.json',true)
    xhr.onload=function(){
        if(this.status==200){
            var artikli=JSON.parse(this.responseText);
            var tekst=document.getElementById('pretragaBar').value;
            console.log(tekst);
            let isti=artikli.filter(function(artikal){
                {
                   const regtekst = new RegExp(`${tekst}`,'gi');
                   return artikal.ime.match(regtekst);
                }});
                console.log(isti);
                if(tekst.length===0||isti.length===0){
                    isti=[];
                    document.getElementById('pretraga').innerHTML='';
                    document.getElementById('pretraga').classList.add('d-none');
                }
                if(isti.length!=0){
                document.getElementById('pretraga').classList.remove('d-none');
                var output='';
                for(var i=0;i<Math.min(4,isti.length);i++){
                output +=
                '<div class="container-fluid my-2">'+
                '<li><a class="dropdown-item py-2 lead"  id="ddItem" href="artikal.html?id='+isti[i].id+'"><img src="'+isti[i].slika+'" style="height:68px; ">'+isti[i].ime+'</a></li>'+
                '</div>';
            }
            document.getElementById('pretraga').innerHTML=output;}
        }
    }
    xhr.send();
}

function kupiProizvod(){
    var id=new URLSearchParams(window.location.search)
    var xhr=new XMLHttpRequest();
    console.log(id.get("id"));
    xhr.open('GET','artikli.json',true)
    xhr.onload=function(){
        if(this.status==200){
            var artikli=JSON.parse(this.responseText);
        const pronadjen=artikli.find((artikal)=>{
            return artikal.id == id.get("id");
        })
    var output='';
    output +=
    '<header class="h1" style=" margin-top:60px; margin-bottom:40px;" id="naslov">'+pronadjen.ime+'</header>'+
    '<div class="container-fluid d-grid">'+
    '<div class="row text-center mb-5">'+
    '<div class="col-lg-4">'+
    '<img src="'+pronadjen.slika+'" class="img-fluid" style="max-height:60vh; min-height:20vh;">'+
    '</div>'+
    '<div class="col-lg-3 mt-4 pt-4">'+
    '<p class=" pb-4 lg-4 lead" style="text-align:left;">Karakteristike artikla Karakteristike artikla Karakteristike artikla Karakteristike artikla Karakteristike artikla Karakteristike artikla  Karakteristike artikla Karakteristike artikla Karakteristike artikla</p>'+
    '</div>'+
    '<div class="col-md-4 mt-4 pt-4 border">'+
    '<span class="h2">Besplatna dostava <i class="bi bi-truck"></i></span>'+
    '<div class="clearfix mb-5"></div>';
    if(pronadjen.popust!=0){
        output +=
        '<p class="" style="text-decoration-line:line-through; color:gray; font-size:1.2rem;">Stara cena: '+pronadjen.cena+'</p>' +
        '<span class="cena mb-5 rounded" style="text-align:center">Cena: '+parseFloat(pronadjen.cena)*parseFloat('0.'+(100-pronadjen.popust))+' RSD</span>';
        }
    else{
    output +=
    '<p class="cena mb-5 rounded">Cena: '+pronadjen.cena+' RSD</p>';}
    output +=
    '<div class="clearfix mb-5"></div>'+
    '<div class="mt-2 container align-items-center">' +
    '<span style="font-size:1.2rem">Kolicina: </span>'+
    '<input  type="number" style="font-size:1.2rem" value="1" min="1" max="10" id="number" />'+
    '<div class="clearfix mb-4"></div>'+
    '<button class="btn mb-4 mx-2 p-2" href="korpa.html" onclick="posaljiPodatke('+pronadjen.id+')" style="background-color: orange; font-size:1.8rem;" type="button" id="korpa">Dodaj u korpu<i class="bi bi-cart-fill text-white"></i></button>'+
    '</div>'+
    '</div>' +
    '</div>'+
    '</div>';
    document.getElementById('kupi').innerHTML=output;
    
    //Sp

    var output2='';
    var br=0;
    for(var i in artikli){
        if(artikli[i].tip==pronadjen.tip){
        br++;
        // if(br===4){
        // output += '<div class="row text-center">';}
        output2 += '<div class="col-lg-2 col-md-3 col-sm-6 col-6 d-flex align-items-stretch">' +
        '<div class="card mb-4 mx-2">' +
        '<div class="card-body text-center">' +
        '<img src="'+artikli[i].slika+'" class="card-img-top img-fluid" style="max-height:200px;" alt="...">' ;
        if(artikli[i].popust!=0){
        output2 +=
        '<span class="carousel-caption tekst badge" style="width:60px">-'+artikli[i].popust+'%</span>' ;}
        output2 +='<h4 class="card-title mt-2">'+artikli[i].ime+'</h4>' ;
        if(artikli[i].popust!=0){
        output2 +=
        '<p class="card-text fs-6 " style="text-decoration-line:line-through; color:gray;">Cena: '+artikli[i].cena+'</p>' +
        '<p class="card-text fs-5 mb-4" style="line-height:0.4; color:rgb(180, 14, 14); font-weight:bold;">Cena: '+parseFloat(artikli[i].cena)*parseFloat('0.'+(100-artikli[i].popust))+'</p>';
        }
        else{
        output2 +=
        '<p class="card-text fs-5 mt-4" style="font-weight:bold;">Cena: '+artikli[i].cena+'</p>';
        }
        output2 +=
        '<a href="artikal.html?id='+artikli[i].id+'" class="btn" id="dropdownMenu">Kupi ></a>' +
        '</div>' +
         '</div>'+
         '</div>'+
         '</div>';
         if(br===12){
         break;}
        }}
        document.getElementById("slicniproizvodi").innerHTML=output2;
        }
        }
        xhr.send();
    }

function posaljiPodatke(x){
    var poruci=`${x}`;
    var broj=document.getElementById("number").value;
    for(var i=0;i<broj;i++)
    {if(localStorage.getItem("porudzbine"))
    localStorage.setItem("porudzbine",localStorage.getItem("porudzbine")+','+poruci);
    else
    localStorage.setItem("porudzbine",poruci);}
    window.location.href = "korpa.html";
}

function obrisi(x){
    var mesto=x;
    var j=0;
    var br=0;
    var lista=localStorage.getItem("porudzbine");
    var porudzbina=lista.split(',');
    var duzina=porudzbina.length;
    localStorage.removeItem("porudzbine");
    console.log(localStorage.getItem("porudzbine"));
    console.log(duzina);
    if(mesto==0)
        { 
        j=1;
    }
    for(j;j<duzina;j++)
    {
        if(br==0){
        localStorage.setItem("porudzbine",porudzbina[j]);
        br++;
        continue;}
        if(j!=mesto)
        localStorage.setItem("porudzbine",localStorage.getItem("porudzbine")+','+porudzbina[j]);
    }
    if(!localStorage.getItem("porudzbine")){
    localStorage.setItem("porudzbine","");
    location.reload();
    }
    korpa();
}

function korpa(){
    var xhr=new XMLHttpRequest();
    var br=0;
    var ukupno=0;
    var ispis=[];
    xhr.open('GET','artikli.json',true)
    xhr.onload=function(){
        if(this.status==200){
            var artikli=JSON.parse(this.responseText);
            var lista=localStorage.getItem("porudzbine");
            var porudzbina=lista.split(',');
            var x=porudzbina.length;
            for(var i=0;i<artikli.length;i++){
            for(br=0;br<x;br++)
            {
                if(artikli[i].id==porudzbina[br]){
                ispis[br]=artikli[i];
                }
            }}
            console.log(porudzbina);
            console.log(ispis);
            var output='';
            var output2='';
            if(porudzbina==''){
            document.getElementById("naslov").innerHTML="Vasa korpa je prazna";
            document.getElementById("naslov").classList.add("text-center");}
            else{
            document.getElementById("naslov").innerHTML="Vasa korpa";
            for(i=0; i<x; i++){
            ukupno +=parseFloat(ispis[i].cena)*parseFloat('0.'+(100-ispis[i].popust));
            output +=
            '<div class="row px-2 border-bottom" id="r">'+
            '<div class="col-7">'+
            '<img src="'+ispis[i].slika+'" style="height:90px;">'+
            '<span class="lead">'+ispis[i].ime+'</span>'+
            '</div>'+
            '<div class="col-4" style="padding-top:20px;">';
            if(ispis[i].popust!=0)
            output +=
            '<span class="lead">Cena: '+parseFloat(ispis[i].cena)*parseFloat('0.'+(100-ispis[i].popust))+' RSD</span>';
            else
            output +=
            '<span class="lead">Cena: '+ispis[i].cena+' RSD</span>';
            output +=
            '</div>'+
            '<div class="col-1">'+
            '<button class="btn btn-danger fw-bold" onclick="obrisi('+i+')" style="background-color:rgb(180, 14, 14);" href="#">X</a>'+
            '</div>'+
            '</div>';
            }
            output +=
            '<div class="row px-2 mb-5" id="r">'+
            '<div class="col-7">'+
            '</div>'+
            '<div class="col-4" style="padding-top:20px; padding-bottom:20px;">'+
            '<span class="lead fw-bold">Ukupno: '+ukupno+' RSD</span>'+
            '</div>'+
            '<div class="col-1">'+
            '</div>'+
            '</div>';
            document.getElementById("korpa").innerHTML=output;
            
            output2+=
            '<div class="container-fluid border rounded p-5 pt-2 mb-5 text-center">'+
            '<div class="row">'+
            '<span class="fs-4 fw-bold mb-4">Besplatna dostava za 3-6 dana</span>'+
            '</div>'+
            // Plati
            '<p class="fs-5">Nacin placanja: </p>'+
            '<div class="pb-1 border-bottom">'+
            '<div class="form-check form-check-inline">'+
            '<input class="form-check-input" type="radio" name="placanje" id="kartica">' +
            '<label class="form-check-label" for="kartica">Kartica</label>'+
            '</div>'+
            '<div class="form-check form-check-inline">'+
            '<input class="form-check-input" type="radio" name="placanje" id="gotovina">' +
            '<label class="form-check-label" for="gotovina">Gotovina</label>'+
            '</div>'+
            '</div>'+
            // Adresa
            '<p class="fs-5 mt-3">Adresa</p>'+
            '<div class="form-check form-check-inline">'+
            '<input class="form-check-input " type="radio" name="adresa" onclick="disableButton()"  id="profilAdresa" checked>' +
            '<label class="form-check-label" for="profilAdresa">Adresa sa profila</label>'+
            '</div>'+
            '<div class="form-check form-check-inline">'+
            '<input class="form-check-input" type="radio" name="adresa" onclick="disableButton()" id="novaAdresa" value="1">' +
            '<label class="form-check-label" for="novaAdresa">Nova adresa</label>'+
            '</div>'+
            '<input type="text" class="form-control mt-1" id="adresa" placeholder="Adresa" disabled>'+           
            '<div class="row">'+
            '<button class="btn mb-2 mx-2 mt-4 py-2 px-5" href="#" style="background-color: orange; font-size:1.8rem;" type="button" id="korpa">Naruci</button>'+
            '</div>'+
            '</div>'+
            '</div>';
            console.log(output2);
            document.getElementById("korpa2").innerHTML=output2;
        }
        }
    }
    xhr.send();
}

function disableButton(){
    if(document.getElementById("novaAdresa").checked)
    document.getElementById("adresa").disabled=false;
    else
    document.getElementById("adresa").disabled=true;
}

window.beforeunload = function() {
    localStorage.removeItem("porudzbine");
    return '';
  };

  function validateEmail(email) 
  {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
  }
  function containsAnyLetter(str) {
    return /[a-zA-Z]/.test(str);
  }

// function registracija(){
//     var xhr=new XMLHttpRequest();
//     xhr.open('GET','korisnici.json',true)
//     xhr.onload=function(){
//     if(this.status==200){
//         var korisnici=JSON.parse(this.responseText);
//         var email=document.getElementById('email2').value;
//         var username=document.getElementById('username').value;
//         var password=document.getElementById('password2').value;
//         var grad=document.getElementById('grad').value;
//         var adresa=document.getElementById('adresa').value;
//         var telefon=document.getElementById('telefon').value;
        
//     if(email==''||username==''||password==''||grad==''||adresa==''||telefon=='')
//     {
//         alert("Sva polja moraju biti popunjena");
//         return;
//     }
//     if(!validateEmail(email)){
//         console.log(email);
//         alert("Email nije validan");
//         return;}
//     for(i in korisnici){
//             if(username==korisnici[i].username){
//             alert("Korisnicko ime je zauzeto");
//             return;}
//         }
//     if(password.length<4)
//         {
//             alert("Lozinka mora da bude duza od 4 karaktera");
//             return;
//         }
//     if(containsAnyLetter(telefon)||telefon.length<10)
//         {
//             alert("Neispravan broj telefona");
//             return;
//         }
    
//         var korisnik = new Korisnik(email,username,password,grad,adresa,telefon);
//         const data=JSON.stringify(korisnik);
//         korisnici.push(data);
//         console.log(data);
        
//     }
//     } ;xhr.send();
// }



function registracija(){
    var korisnici=JSON.parse(fs.readFile('korisnici.json'));
    if(this.status==200){
        var korisnici=JSON.parse(this.responseText);
        var email=document.getElementById('email2').value;
        var username=document.getElementById('username').value;
        var password=document.getElementById('password2').value;
        var grad=document.getElementById('grad').value;
        var adresa=document.getElementById('adresa').value;
        var telefon=document.getElementById('telefon').value;
        
    if(email==''||username==''||password==''||grad==''||adresa==''||telefon=='')
    {
        alert("Sva polja moraju biti popunjena");
        return;
    }
    if(!validateEmail(email)){
        console.log(email);
        alert("Email nije validan");
        return;}
    for(i in korisnici){
            if(username==korisnici[i].username){
            alert("Korisnicko ime je zauzeto");
            return;}
        }
    if(password.length<4)
        {
            alert("Lozinka mora da bude duza od 4 karaktera");
            return;
        }
    if(containsAnyLetter(telefon)||telefon.length<10)
        {
            alert("Neispravan broj telefona");
            return;
        }
    
        var korisnik = new Korisnik(email,username,password,grad,adresa,telefon);
        const data=JSON.stringify(korisnik);
        korisnici.push(data);
        fs.writeFile("korisnici.json",JSON.stringify(korisnici));
        console.log(data);
    }
     ;xhr.send();
}
