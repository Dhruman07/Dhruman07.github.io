let bills = JSON.parse(localStorage.getItem("bills")) || [];

const form = document.getElementById("billForm");
const tableBody = document.getElementById("tableBody");
const search = document.getElementById("search");

let editIndex = -1;

render();

form.addEventListener("submit", function(e){

    e.preventDefault();

    const bill = {
        id: editIndex === -1 ? Date.now() : bills[editIndex].id,
        invoice: document.getElementById("invoice").value,
        supplier: document.getElementById("supplier").value,
        date: document.getElementById("date").value,
        amount: parseFloat(document.getElementById("amount").value),
        status: document.getElementById("status").value
    };

    if(editIndex === -1){
        bills.push(bill);
    }else{
        bills[editIndex] = bill;
        editIndex = -1;
    }

    saveData();
    form.reset();

});

function saveData(){

    localStorage.setItem("bills",JSON.stringify(bills));

    render();

}

function render(filter=""){

    tableBody.innerHTML="";

    let totalBills=0;
    let totalAmount=0;
    let paidBills=0;
    let pendingBills=0;

    bills.forEach((bill,index)=>{

        if(
            bill.invoice.toLowerCase().includes(filter.toLowerCase()) ||
            bill.supplier.toLowerCase().includes(filter.toLowerCase())
        ){

            let tr=document.createElement("tr");

            tr.innerHTML=`

            <td>${bill.id}</td>

            <td>${bill.invoice}</td>

            <td>${bill.supplier}</td>

            <td>${bill.date}</td>

            <td>₹${bill.amount.toFixed(2)}</td>

            <td>

            <span class="${
                bill.status==="Paid"
                ?
                "status-paid"
                :
                "status-unpaid"
            }">

            ${bill.status}

            </span>

            </td>

            <td>

            <button class="edit-btn" onclick="editBill(${index})">

            <i class="fa-solid fa-pen"></i>

            </button>

            <button class="delete-btn" onclick="deleteBill(${index})">

            <i class="fa-solid fa-trash"></i>

            </button>

            </td>

            `;

            tableBody.appendChild(tr);

        }

        totalBills++;

        totalAmount+=bill.amount;

        if(bill.status==="Paid")
            paidBills++;
        else
            pendingBills++;

    });

    document.getElementById("totalBills").innerText=totalBills;

    document.getElementById("totalAmount").innerText=
    "₹"+totalAmount.toLocaleString();

    document.getElementById("paidBills").innerText=paidBills;

    document.getElementById("pendingBills").innerText=pendingBills;

}

function deleteBill(index){

    if(confirm("Delete this bill?")){

        bills.splice(index,1);

        saveData();

    }

}

function editBill(index){

    const bill=bills[index];

    document.getElementById("invoice").value=bill.invoice;

    document.getElementById("supplier").value=bill.supplier;

    document.getElementById("date").value=bill.date;

    document.getElementById("amount").value=bill.amount;

    document.getElementById("status").value=bill.status;

    editIndex=index;

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}

search.addEventListener("keyup",function(){

    render(this.value);

});