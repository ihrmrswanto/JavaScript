class Data {
    constructor(a, b, c, d, e){
        this. id = a
        this. kategori = b
        this. nama = c
        this. harga = d
        this. stok = e
    }
}

class Cart extends Data{
    constructor(a, b, c, d, e, f, e){
        super(a, b, c, d, e)
        this.qty = f
    }
}

var data = [
    new Data (12, 'Fast Food', 'KFC', 25000, 10 ),
    new Data (34, 'Pakaian', 'Gaun', 15000, 6),
    new Data (7, 'Kendaraan', 'Honda', 120000, 5),
    new Data (13, 'Fast Food', 'McDonald', 35000, 5)
]

var cart = []

var arrKategori = ['ALL', 'Fast Food', 'Pakaian', 'Kendaraan']

indexEdit = -1
indexDelete = -1

let tampilkanData=()=>{
    var showProduk = data.map((val, index)=>{ //ini map tuh bangkai
        return (
            `<tr>
                    <td>${val.id}</td>
                    <td>${val.kategori}</td>
                    <td>${val.nama}</td>
                    <td>${val.harga}</td>
                    <td>${val.stok}</td>
                    <td><input type="button" id="add" onclick="addToCart('${val.id}')" value="Add"></td>
                    <td><input type="button" id="delete" onclick="deleteData(${index})" value="Delete"></td>
                    <td><input type="button" id="edit" onclick="editData(${index})" value="Edit"></td>
            </tr>`
        )
    }).join('')
    var showKategori = arrKategori.map((val)=>{
        return (
            `<option value="${val}">${val}</option>`
        )
    }).join('')
    document.getElementById('categoryFilter').innerHTML = showKategori
    document.getElementById('categoryInput').innerHTML = showKategori
    document.getElementById('render').innerHTML = showProduk
}
tampilkanData()

let funInputData=()=>{
    var id =Math.floor(Math.random() *50)
    var nama =document.getElementById('nameInput').value
    var harga =document.getElementById('priceInput').value
    var kategori=document.getElementById('categoryInput').value
    var stok =document.getElementById('stockInput').value
    var obj={id, nama, kategori, harga, stok}
    data.push(obj)
    document.getElementById('nameInput').value =''
    document.getElementById('priceInput').value=''
    document.getElementById('categoryInput').value=''
    document.getElementById('stockInput').value=''

    tampilkanData()
}


const funFilter=()=>{
    var inputNama = document.getElementById('keywoard').value
    var hargaMin = document.getElementById('min').value
    var hargaMax = document.getElementById('max').value
    var inputKategori = document.getElementById('categoryFilter').value

    var filterData = data.filter((val)=>{
        var cekNama =val.nama.toLowerCase().includes(inputNama.toLowerCase()) //hasilnya boolean
        if(!inputNama){
            cekNama = true
        } 
        if(!hargaMin || hargaMax){
            cekHarga = true
        }
        var cekKategori = val.kategori == inputKategori && inputKategori !== 'ALL'
        if(inputKategori == 'ALL'){
            cekKategori = true
        }
        return cekNama && cekHarga && cekKategori
    })  
    document.getElementById('render').innerHTML = tampilkanFilter(filterData).join('')
}