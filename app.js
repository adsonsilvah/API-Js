const express = require('express');

const app = express();

const mongoose = require("mongoose")

require("./models/Artigo");

const Artigo = mongoose.model('artigo');

mongoose.connect('mongodb://localhost/celke', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com MongoDB realizada com sucesso!");
}).catch((erro) => {
    console.log("Erro: Conexão com MongoDB não foi realizada com sucesso!");
});

app.use(express.json());

app.get("/", (req, res ) => {
    Artigo.find({}).then((artigo) =>{
        return res.json(artigo);
    }).catch((erro)=>{
        return res.status(400).json({
            erro: true,
            message: "nenhum artigo encontrado"
        })
    })
});

app.get("/artigo/:titulo", (req,res) => {
    Artigo.findOne({titulo: req.params.titulo}).then((artigo) => {
        return res.json(artigo)
    }).catch((erro) =>{
        return res.status(400).json({
            erro: true,
            message: "Nenhum artigo encontrado"
        })
    })
})


app.post("/artigo", (req,res) => {
   const artigo = Artigo.create(req.body, (err) =>{
       if(err) return res.status(400).json({
           error: true,
           message: "Erro: Artigo não foi cadastrado"
       });

       return res.status(200).json({
        error: false,
        message: "Artigo foi cadastrado"
    })
   })

});

app.put("/artigo/:titulo", (req, res) => {
    const artigo = Artigo.updateOne({ _titulo: req.params.titulo}, req.body, (err) =>{
        if(err) return res.status(400).json({
            erro: true,
            message: "Erro artigo não foi editado"
        });
        return res.json({
            erro : false,
            message: "Artigo editado por sucesso"
        });
    });
});

app.delete("/artigo/:titulo", (req,res) =>{
    const artigo = Artigo.deleteOne({_titulo: req.params.titulo}, req.body, (err) =>{
        if(err) return res.status(400).json({
            erro: true,
            message: "Erro artigo não foi deletado"
        });
        return res.json({
            erro: false,
            message: "Artigo foi deletado com sucesso"
        })
    })
})

app.listen(8080, () => {
    console.log("Server rodando na porta 8080: http://localhost:8080/ ")
})