const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const uuid = require('uuid')

app.use(bodyParser.json()); 

let todos = [
    {
        id:1,
        desc:"write cpp code",
        status:true,
    },
    {
        id:2,
        desc:"write java code",
        status:false,
    },
]

app.get('/', function(req,res){
    res.send("ToDO List"); 
})
app.get('/todos', function(req,res){
    res.json(todos);
})

app.get("/todos/:id", function(req,res){
    let todo = todos.filter((todo) => todo.id == req.params.id);
    res.json(todo);
})

app.post("/todos", function(req,res){
    const body = req.body;    
    todos.push({id:uuid.v4(), ...body})
    res.json([todos])
})

app.put("/todos/:id",function(req,res){
    const body = req.body;
    let todo = todos.find((todo) => req.params.id == todo.id)

    if(todo){
        if(body.desc){
            todo.desc = body.desc
        }
        if(body.status){
            todo.status = body.status
        }
        res.json(todos)
    }else{
        res.send("Given id does not exist")
    }
})

app.delete("/todos/:id",function(req,res){
    let index = todos.findIndex((todo) => req.params.id == todo.id)
    todos.splice(index,1)
    res.json([todos])
})

app.listen(3000)