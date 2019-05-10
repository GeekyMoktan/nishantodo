// 20th baisakh 2076 friday

// cache the DOM

const itemForm = document.getElementById('itemForm');
const input = document.getElementById('itemInput');
const add = document.getElementById('add');
const itemContainer = document.querySelector('.item-container');
const clearBtn = document.getElementById('clear-items');
const itemlist = document.querySelectorAll('.item-list');
let itemData =  JSON.parse(localStorage.getItem('list')) || [] ;

if(itemData.length > 0 ){
    itemData.forEach(function(x){
        const div = document.createElement('div');
        div.classList.add('item-list');
        div.innerHTML = `
        
        <h5>${x}</h5>
        <div class="item-icons">
            <button id="edit" class='btn' >EDIT</button>
            <button id="delete" class='btn' >DELETE</button>
            <button id="complete" class='btn' >DONE</button>
        </div>
        `;
        itemContainer.appendChild(div);
        handleEvent(x);
    })
}


itemForm.addEventListener('submit',function(e){
    e.preventDefault();
    const textValue = input.value;
    if(textValue == ' '){
        alert('PLEASE ENTER VALID TEXT');
    }else{
        addItem(textValue);
        handleEvent(textValue);
        itemData.push(textValue);

        localStorage.setItem('list',JSON.stringify(itemData));
        
    }
})


function addItem(value){
    const div = document.createElement('div');
    div.classList.add('item-list');
    div.innerHTML = `
    <h5>${value}</h5>
    <div class="item-icons">
        <button id="edit" class='btn' >EDIT</button>
        <button id="delete" class='btn' >DELETE</button>
        <button id="complete" class='btn' >DONE</button>
    </div>
    `;
    itemContainer.appendChild(div);
    input.value = ' ';
    
}

function handleEvent(value){
    const items = itemContainer.querySelectorAll('.item-list');
    items.forEach(function(x){        
        if(x.querySelector('h5').textContent == value){
            
            //to edit

            x.querySelector('#edit').addEventListener('click',function(){
                input.value = value;

                // itemData is array so remove we need filter
                
                itemData = itemData.filter(function(x){
                    return x !== value;
                });

                localStorage.setItem('list',JSON.stringify(itemData));



                // item-list remove

                itemContainer.removeChild(x);



            });

            // to delete

            x.querySelector('#delete').addEventListener('click',function(){
                
               itemData = itemData.filter(function(x){
                    return x !== value;
                });

                console.log(itemData);
                localStorage.setItem('list',JSON.stringify(itemData));
                console.log(localStorage);
                itemContainer.removeChild(x);

            });

            // to completed task

            x.querySelector('#complete').addEventListener('click',function(){
                x.querySelector('h5').classList.toggle('completed'); 
            });
        }
    })
}


clearBtn.addEventListener('click',function(){
    itemData = [];
    localStorage.setItem('list',JSON.stringify(itemData));
    const items = itemContainer.querySelectorAll('.item-list');
    if(items.length > 0){
        items.forEach(function(x){
            itemContainer.removeChild(x);
        })
    }
})