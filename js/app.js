const container = document.getElementById('container')
const width=40, height=30;
let squares=[]
let current = 0 
let contador=0
let isMoving=true
let takeName
let click=false

menuStart()

function startGame(){ 

    const divbtn = document.getElementById('divbtn')  
    const btnStart = document.getElementById('btnstart')
    const warnDiv = document.getElementById('warnDiv')

    btnStart.onclick =()=>
    {
        if(inputName.value==''){       
            warnDiv.style.display='block'
            return false
        }
        else{
            isMoving=true
            contador=0      
            container.innerHTML=''
            container.style.borderImage='none' 
            container.style.backgroundColor='#b1e2f2'
            divbtn.style.borderRadius='50%'  
            divbtn.style.margin='150px'        
            divbtn.style.backgroundImage='url(./static/img/explosao.gif)'
            divbtn.style.backgroundColor='black' 
            container.style.flexDirection = 'column'

            createCount()
            createSquares()
        }  
    }
  
   
}
function menuStart(){
    container.innerHTML=''
    container.style.flexDirection = 'row'
    current = 0
    squares.length=0;   
    const innerContainer = document.createElement('div')   
    const divTitleGame = document.createElement('div')
    container.appendChild(divTitleGame)
    divTitleGame.id = 'divTitleGame'
    const titleGame = document.createElement('h3')
    divTitleGame.appendChild(titleGame)
    titleGame.innerHTML='Campo Minado'
    titleGame.id='titleGame'
    container.appendChild(innerContainer)
    innerContainer.id = 'innerContainer'
    const divStart = document.createElement('div') 
    divStart.id='divStart'
    innerContainer.appendChild(divStart)  
    let divbtn = document.createElement('div')
    divStart.appendChild(divbtn)
    divbtn.id='divbtn'
    let btnStart = document.createElement('button')
    btnStart.innerHTML='Start Game'
    divbtn.appendChild(btnStart)     
    btnStart.id='btnstart'
    let nomePlayer = document.createElement('div')  
    let inputName = document.createElement('input')
    let warnMessage = document.createElement('p') 
    warnMessage.id = 'warnMessage'  
    nomePlayer.appendChild(inputName)
    divStart.appendChild(nomePlayer)
    nomePlayer.appendChild(warnMessage)
    inputName.setAttribute('type','text')
    inputName.setAttribute('name','inputName') 
    nomePlayer.id='namePlayer'
    warnMessage.innerHTML='*Campo obrigatório'
    nomePlayer.style.fontSize='14px'
    warnMessage.style.margin='0'    
    inputName.setAttribute('id','inputName')
    inputName.setAttribute('placeholder','Insira seu apelido')
    let getName=document.getElementById('inputName')
    let warnDiv =document.createElement('div')
    warnDiv.id = 'warnDiv'
    warnDiv.innerHTML='Preencha o campo Apelido'
    warnDiv.style.color='red'
    divStart.appendChild(warnDiv)
    warnDiv.style.display='none'

    getName.onchange = ()=>{ takeName=getName.value}

    startGame()

}  

function createSquares(){

    const grid = document.createElement('grid')
    grid.classList.add('grid')
    container.appendChild(grid)
    let col=0
    let row=0
    for (let i = 0; i < width*height; i++){        
        let square = document.createElement('div')
        grid.appendChild(square)
        square.classList.add("square")
        if(i>0){
            col++
        if(i%width==0){
            row++     
            col=0
        }

    }
    square.id=`d${row},${col}` 
    squares.push(square)

}

addPLayer()

}

function addPLayer(){

    let  playerDiv=document.createElement('div')
    playerDiv.id='playerDiv'
    let playerImg = document.createElement('img')
    playerImg.setAttribute("id",'playerImg')
    playerImg.setAttribute("src","./img/formiga.jpg")
    playerDiv.appendChild(playerImg)
    squares[current].appendChild(playerDiv)
    addMine()
}

function addMine(){
    const mines = document.createElement('div')
    var  shuffedArray =[]
    const bombs=100;
    const empySquare=1100
    mines.classList.add('mines')
    mines.style.display='none';
    mines.style.backgroundImage='url(./img/bomba.png)'
    var bombsArray = Array(bombs).fill(true)
    var emptyArray = Array(empySquare).fill(false)   
    let concatedArray = bombsArray.concat(emptyArray)
    shuffedArray = concatedArray.sort(()=>Math.random() -0.5)        
    for (let i = 0; i < width*height; i++){
        if(shuffedArray[i] && i>2 && i!=width && i!=squares.length-1 ){      
          squares[i].innerHTML+= mines.outerHTML
        }

    }

    document.addEventListener("keydown",movePlayer)   

}

function movePlayer(event){

    let keyName = event.keyCode
    switch(keyName){
        case 39:
        
        moveRight()    
        break;
        case 37:
        
        moveLeft()
        break
        case 38:
        
        moveUp()
        break
        case 40:
        
        moveDown()
        break  

    }
}

function moveRight(){
 
     if(current%width<=38 && current<squares.length && isMoving){
        isMoving=false
        current=current+1
        squares[current].appendChild(playerDiv)
        detectMines()
        addAudio()
        contador++
        addPontos(contador) 
     }
    
}

function moveLeft(){
 
  if(current>0 && current%width>0  && isMoving){ 
    isMoving=false     
    current=current-1
    squares[current].appendChild(playerDiv)  
    detectMines()
    addAudio()
    contador++
    addPontos(contador)
  }

}
function moveUp(){
  if(current>width  && isMoving){
    isMoving=false
    current=current-width  
    squares[current].appendChild(playerDiv)
    detectMines()
    addAudio()
    contador++
    addPontos(contador)
  }
 
}
function moveDown(){

  if(current<(height*width)-width  && isMoving){
    isMoving=false 
    current=current+width
    squares[current].appendChild(playerDiv)    
    detectMines()
    addAudio()
    contador++
    addPontos(contador)
  }

}

function detectMines(){ 

    if(squares[current].childNodes.length==2){
        isMoving=false      
        var element = document.getElementsByClassName('mines')
    for (let i =0; i < 96; i++) {
         element[i].style.display='block'    
    
    }    
     addAudio1()
     setTimeout(()=>{     

        var pCounter = document.getElementById('count')
        pCounter.innerHTML=`Você Perdeu com ${contador} pontos`
        var grid = document.querySelector('.grid')
        grid.style.backgroundImage='url(./img/explosao.gif)'},1500)

      setTimeout(function(){

      menuStart()  

    },3000)
      
  }
    if(squares[current].childNodes.length==1){
        isMoving=true
    }
    if(squares[current]==squares[squares.length-1]){
        isMoving=false
        addAudio1()
        setTimeout(()=>{ 
        var pCounter = document.getElementById('count')
        var grid = document.querySelector('.grid')
        pCounter.innerHTML=`Você Ganhou com ${contador} pontos`
        grid.style.backgroundImage='url(./img/explosao.gif)'},1500)

      setTimeout(()=>{    
        
        menuStart()      
      },3000)
      
    }

}

function addAudio(){

    var audio = new Audio('./img/pim.mp3');
    audio.addEventListener('canplaythrough', function() {
    audio.play();

  });
     return audio.play()
  }

function addAudio1(){

  var audio = new Audio('./img/pu.mp3');
  audio.addEventListener('canplaythrough', function() {
    audio.play();
  });
  return audio.play()
  }

  function createCount(){

    let CountDiv = document.createElement('div')
    let pCount =document.createElement('p')
    pCount.id='count'
    container.appendChild(CountDiv)
    CountDiv.appendChild(pCount)
   

  }

  function addPontos(contador){ 
       
   let pCounter = document.querySelector('#count') 
    pCounter.innerHTML=`Pontuação: ${contador}`
   
  }
  
 


