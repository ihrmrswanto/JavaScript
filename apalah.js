class Data {
    constructor(a, b, c, d, e){
        this.id = a
        this.kategori = b
        this.nama = c 
        this.harga = d
        this.stok = e
    }

}

class Cart extends Data{
    constructor(a, b, c, d, e, f){
        super(a, b, c, d, e)
        this.qty = f
    }
}


var data = [
    new Data(12, 'Fast Food', 'KFC', 25000, 10),
    new Data(34, 'Pakaian', 'Gaun', 150000, 6),
    new Data(7, 'Kendaraan', 'Honda', 12000000, 5),
    new Data(13, 'Fast Food', 'Burger King', 35000, 5)
]

var cart = []

var arrKategori = ["All", "Fast Food", "Pakaian", "Kendaraan"]

indexEdit = -1
indexDelete = -1

let tampilkanData=()=>{
    var showProduk = data.map((val,index)=>{
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
    var id = Math.floor(Math.random() * 50)
    var nama = document.getElementById('nameInput').value
    var harga = document.getElementById('priceInput').value
    var kategori = document.getElementById('categoryInput').value
    var stok = document.getElementById('stockInput').value
    var obj = {id, kategori, nama, harga, stok}
    data.push(obj)
    document.getElementById('nameInput').value = ''
    document.getElementById('priceInput').value = ''
    document.getElementById('categoryInput').value = ''
    document.getElementById('stockInput').value = ''
    
    tampilkanData()
}


const funFilter=()=>{
    var inputNama = document.getElementById('keyword').value
    var hargaMin = document.getElementById('min').value // bug kalau min dr 0 diganti jadi 10
    var hargaMax = document.getElementById('max').value
    var inputKategori = document.getElementById('categoryFilter').value

    var filterData = data.filter((val)=>{
        var cekNama = val.nama.toLowerCase().includes(inputNama.toLowerCase()) // hasilnya boolean
        if(!inputNama){ // kenapa ini ga guna? kata dino kalau ga diisi pasti true
            cekNama = true // if kosong
        }
        var cekHarga = val.harga >= hargaMin && val.harga <= hargaMax // boolean
        if(!hargaMin || !hargaMax){
            cekHarga = true // if kosong
        }
        var cekKategori = val.kategori == inputKategori && inputKategori !== "All" // boolean
        if(inputKategori == "All"){
            cekKategori = true // if kosong
        }
        return cekNama && cekHarga && cekKategori
    })
   document.getElementById('render').innerHTML = tampilkanFilter(filterData).join('')
}

var tampilkanFilter=(filterarr)=>{
    return filterarr.map((val,index)=>{
        if(index == indexDelete){
            return ( // kalau button delete di klik
                    // kenapa si cancelDelete gaperlu dikasi ${index} di onclick
                    `<tr>
                        <td>${val.id}</td>
                        <td>${val.kategori}</td>
                        <td>${val.nama}</td>
                        <td>${val.harga}</td>
                        <td>${val.stok}</td>
                        <td><button onclick="saveDelete()">Yes</td>
                        <td><button onclick="cancelDelete()">Cancel</td>
                    </tr>`
            )
        }else if(index == indexEdit){
            var showKategori = arrKategori.map((val1)=>{
                if(val1 == 'All'){
                    return (`<option value="${val1}" selected hidden>${val1}</option>`)
                }
                return (
                    `<option value="${val1}">${val1}</option>`
                )
            }).join('')
            return ( // kalau button edit di klik, si dino pakenya value bukan placeholder
                `<tr>
                    <td>${val.id}</td>
                    <td><select id="newKategori${index}">${showKategori}</select></td>
                    <td><input type="text" id="newNama${index}" placeholder="${val.nama}"</td> 
                    <td><input type="text" id="newHarga${index}" placeholder="${val.harga}"></td>
                    <td><input type="text" id="newStok${index}" placeholder="${val.stok}"></td>
                    <td><input type="button" id="add" onclick="addToCart('${val.id}')" value="Add"></td>
                    <td><input type="button" id="save" onclick="saveEdit()" value="Save"></td>
                    <td><input type="button" id="cancel" onclick="cancelEdit()" value="Cancel"></td>
                </tr>`
            )
        }
        return( //tampilan normal

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
    })
}

var indexCart = -1

const addToCart=(num)=>{
    for(i=0; i<data.length; i++){
        var qtyCart
        if(num == data[i].id){
            for(j=0; j<cart.length; j++){
                if(num == cart[j].id){
                    indexCart = j
                    console.log(num)
                }
            }
            if(indexCart<0){
                qtyCart = 1
                cart.push(new Cart(data[i].id, data[i].kategori, data[i].nama, data[i].harga, qtyCart, data[i].stok))
                console.log(indexCart)
            }else{
                cart[indexCart].qty += 1
            }
    }
    }
    indexCart = -1
    tampilkanCart()
}

const deleteCart=(index)=>{
    cart.splice(index, 1)
    tampilkanCart()
}

const tampilkanCart=()=>{
    if(cart.length){
        var output = cart.map((val, index)=>{
            return `<tr>
                        <td>${val.id}</td>
                        <td>${val.kategori}</td>
                        <td>${val.nama}</td>
                        <td>${val.harga}</td>
                        <td>${val.qty}</td>
                        <td>${val.stok}</td>
                        <td><input type="button" onclick="deleteCart(${index})" value="Delete"></td>
                    </tr>`
        }).join('')
        
        document.getElementById('bawahrender').innerHTML = output
    }else{
        document.getElementById('bawahrender').innerHTML = ''
    }
}

const payCart=()=>{
    var transaksi = '<p><h2>Transaction Detail</h2></p>'
    var subtotal = 0
    var output = cart.map((val)=>{
        subtotal += val.harga * val.qty
        return(
            `<p>${val.id} | ${val.kategori} | ${val.nama} | Rp ${val.harga}
            | qty : ${val.qty} | Total ${val.nama} = ${val.harga*val.qty}</p>
            `
        )
    })
    // subtotal = Math.ceil(subtotal)
    var totalBayar = `<p><h3>Subtotal = ${subtotal}</h3></p>
                    <p><h3>PPN = ${subtotal * 0.1}</h3></p>
                    <p><h3>TOTAL = ${subtotal * 0.1 + subtotal}</h3></p>`
    document.getElementById('transaksiBayar').innerHTML = transaksi + output.join('') + totalBayar
}

const editData=(index)=>{
    indexEdit = index
    document.getElementById('render').innerHTML = tampilkanFilter(data).join('')
}

const cancelEdit=()=>{
    indexEdit = -1
    document.getElementById('render').innerHTML = tampilkanFilter(data).join('')
}

const deleteData=(index)=>{
    indexDelete = index
    document.getElementById('render').innerHTML = tampilkanFilter(data).join('')
}

const cancelDelete=()=>{ // saat tombol cancel delete di klik
    indexDelete = -1 // kenapa de difine lagi jadi -1? --> biar ga masuk syarat
    document.getElementById('render').innerHTML = tampilkanFilter(data).join('')
}

const saveEdit=()=>{ // saat tombol save di klik
    var inputNamaEdit = document.getElementById('newNama' + indexEdit).value
    var hargaEdit = document.getElementById('newHarga' + indexEdit).value // bug kalau min dr 0 diganti jadi 10
    var inputKategoriEdit = document.getElementById('newKategori' + indexEdit).value
    var stokEdit = document.getElementById('newStok' + indexEdit).value
    // console.log(inputNamaEdit, hargaEdit, inputKategoriEdit, stokEdit)
    data.splice(indexEdit, 1, { // pake cara ini, gapake push biasa karna id nya mau tetep sama, dan lebih mudah
        ...data[indexEdit],
        kategori: inputKategoriEdit,
        nama: inputNamaEdit,
        harga: hargaEdit,
        stok: stokEdit
    })
    indexEdit = -1
    document.getElementById('render').innerHTML = tampilkanFilter(data).join('')
}

const saveDelete=()=>{
    data.splice(indexDelete, 1)
    indexDelete = -1
    document.getElementById('render').innerHTML = tampilkanFilter(data).join('')
}