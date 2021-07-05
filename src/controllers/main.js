let toDoListService = new ToDoListService();
let validator = new Validator();

function getEle(id){
    return document.getElementById(id)
}

var getToDoLists = function(){
    toDoListService.getToDoApi()
        .then(function(res){
            renderToDoLists(res.data)
            renderToDoCompleted(res.data)
        })
        .catch(function(err){
            console.log(error)
        })
}
getToDoLists();

function renderToDoLists(toDoLists){
    var content = ''
    toDoLists.forEach(function(toDo, index){
        if(toDo.status == false){
        content += `
            <li> 
                ${toDo.taskName} 
                <div>
                <button id="btnXoa" onClick="xoaToDo(${toDo.id})"><i class="fa fa-trash-alt"></i></button>
                <button id="btnCheck" onClick="checkToDo(${toDo.id})"><i class="fa fa-check"></i></button>
                </div>               
            </li>
        `}
    })
    getEle('todo').innerHTML = content;
}
var renderToDoCompleted = function(toDoLists){
    let content = '';
    toDoLists.forEach(function(toDo, index){
        if(toDo.status == true){
            content += `
            <li> 
                ${toDo.taskName} 
                <div>
                <button id="btnXoa" onClick="xoaToDo(${toDo.id})"><i class="fa fa-trash-alt"></i></button>
                <button id="btnCheck" onClick="checkCompleted(${toDo.id})"><i class="fa fa-check"></i></button>
                </div>               
            </li>
        `
        }        
    })
    getEle('completed').innerHTML = content;
}

getEle('addItem').addEventListener('click', function(){
    var id = Math.random();
    var taskName = getEle('newTask').value;
    var status = false;


    let isValid = true;
    toDoListService.getToDoApi()
    .then(function(res){
        isValid &= validator.KiemTraRong(taskName,'notiInput','Vui lòng không để trống') && validator.KiemTraTrung(res.data,taskName,false,'notiInput', "Thông tin đã tồn tại") && validator.KiemTraTrung(res.data,taskName,true,'notiInput', "Thông tin đã hoàn thành") 
        
        console.log(isValid)
        if(!isValid) return;
    
        var toDoList = new ToDoList(id, taskName, status);
        toDoListService.addToDoApi(toDoList)         
            .then(function(res){          
                getToDoLists();
                getEle('newTask').value = ''
            })
            .catch(function(err){
                console.log(err)
            })
    })
    
})

var xoaToDo = function(id){
    toDoListService.deleteToDoApi(id)
        .then(function(res){
            getToDoLists()
        })
        .catch(function(err){
            console.log(err)
        })
}

var checkToDo = function(id){
    toDoListService.getToDoIdApi(id)
        .then(function(res){
            var toDoCheck = {...res.data, status : true}           
            toDoListService.checkToDoApi(id, toDoCheck)
                .then(function(res){
                    getToDoLists()
                })
        })
        .catch(function(err){
            console.log(err)
        })
}

var checkCompleted = function(id){
    toDoListService.getToDoIdApi(id)
        .then(function(res){
            var toDoCheck = {...res.data, status : false}           
            toDoListService.checkToDoApi(id, toDoCheck)
                .then(function(res){
                    getToDoLists()
                })
        })
        .catch(function(err){
            console.log(err)
        })
}