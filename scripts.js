const inputByUser = document.querySelector(".input_user input");
const tombolTambah = document.querySelector(".input_user button");
const toDoList = document.querySelector(".toDoList");
const hapusSemua = document.querySelector(".footer button");
 
inputByUser.onkeyup = ()=>{
    let isiInputan = inputByUser.value;
    if(isiInputan.trim() !=0){ // jika yg diinput cuman bukan cuman spasi
        tombolTambah.classList.add("active"); //maka tambah kelas "active" (aktifkan tombol).
    }else{
        tombolTambah.classList.remove("active");//kalau cuman spasi, hapus kelas "active" (matikan tombol).
    }
}

tombolTambah.onclick = () =>{
    let isiInputan = inputByUser.value; //menampung value yang diinput pada variable isiInputan
    let getLocalStorage = localStorage.getItem("Todo"); //menggunakan localStorage
    if(getLocalStorage == null){ //ceke kondisi apabila storage null
        listArr = []; //deklarasi array kosong
    }else{
        listArr = JSON.parse(getLocalStorage); //mengubah jason string ke bentuk objek js
    }
    listArr.push(isiInputan); //menambah nilai isi inputan ke array
    localStorage.setItem("Todo", JSON.stringify(listArr));//mengubah objek js ke jason string
    tampilData(); //memanggil fungsi tampil data
}

tampilData();


function tampilData(){
    let getLocalStorage = localStorage.getItem("Todo");
    if(getLocalStorage == null){
        listArr = [];
    }
    else{
        listArr = JSON.parse(getLocalStorage);
    }
    
    const totalTugas = document.querySelector(".banyakTugas");
    totalTugas.textContent = listArr.length;

    let tambahTagli = "";
    listArr.forEach((element, index)=>{
        tambahTagli += `<li>${index+1}. ${element} <span onclick="deleteTodo(${index})"><i class="uil uil-trash-alt"></i></span></li>`       
    });

   toDoList.innerHTML = tambahTagli;
   inputByUser.value = "";
}

function deleteTodo(index){
    let getLocalStorage = localStorage.getItem("Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);
    localStorage.setItem("Todo", JSON.stringify(listArr));
    tampilData();
}

hapusSemua.onclick = ()=>{
    listArr = [];
    localStorage.setItem("Todo", JSON.stringify(listArr));
    tampilData();
}
