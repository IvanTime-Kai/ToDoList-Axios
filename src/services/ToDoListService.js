function ToDoListService() {}

ToDoListService.prototype.getToDoApi = function(){
    var promise = axios({
        url : 'https://60e0240f6b689e001788c908.mockapi.io/toDoLists',
        method : 'GET'
    })
    return promise
}

ToDoListService.prototype.addToDoApi = function(toDo){
    var promise = axios({
        url : 'https://60e0240f6b689e001788c908.mockapi.io/toDoLists',
        method : 'POST',
        data : toDo
    })
    return promise
}

ToDoListService.prototype.deleteToDoApi = function(id){
    var promise = axios({
        url : 'https://60e0240f6b689e001788c908.mockapi.io/toDoLists/' + id,
        method : 'DELETE',
    })
    return promise
}

ToDoListService.prototype.getToDoIdApi = function(id){
    var promise = axios({
        url : 'https://60e0240f6b689e001788c908.mockapi.io/toDoLists/'+ id,
        method : 'GET'
    })
    return promise
}

ToDoListService.prototype.checkToDoApi = function(id , toDo){
    var promise = axios({
        url : 'https://60e0240f6b689e001788c908.mockapi.io/toDoLists/' + id,
        method : 'PUT',
        data : toDo
    })
    return promise
}