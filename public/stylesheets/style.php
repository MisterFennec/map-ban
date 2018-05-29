html, body {margin: 0; padding: 0; height: 100%; text-align: center;}
html, body {margin: 0; padding: 0; height: 100%; text-align: center;}
section {min-height: 100%; padding: 100px 0;}
a {text-decoration: none;}
li{list-style-type: none;}
h1,h2,h3,h4,h5,a {font-family: 'Roboto', sans-serif; font-weight: 500; text-transform: uppercase;}
h3 {margin-bottom: 5px; font-size: 40px;}
p {font-family: 'Roboto-Slab', serif;}
hr {border: 0px;}
 #logo, li, img, .button{transition: all 300ms; -webkit-transition: all 300ms; -moz-transition: 
all 300ms; -o-transition: all 300ms; }

.content:before {
  content: "";
  position: fixed;
  left: 0;
  right: 0;
  z-index: -1;
  background-size: cover;
  background-position : center center;
  background-attachment: fixed;




  width: 100%;
  height: 100%;
  
  left: -5px;
  top:-5px;
  bottom:-5px;
  right: -5px;
  transform: scale(1.1);/
}
/* LINK ************************************************************************/

a{
color:#fff;
text-decoration:none;
}
a:visited{
color:#fff;
text-decoration: none;	
}
 a:active{
color:#585858;
text-decoration: none;	
}
a:hover{
color:#585858;
text-decoration: none;
}
a:focus{
color:#585858;
text-decoration: none;	
}

/* HEADER ************************************************************************/

header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #00000000;
  box-shadow: 0 1px 30px rgba(0, 0, 0, 1);
  z-index: 1;
  text-transform: uppercase;
  display: table;
  padding-bottom: 15px;
}

#logo {
  width: 144px;
  float: left;
  margin: 15px 0 0 45px;
  font-size: 15px;
  margin-left: 15px;
  }

#logo:hover {
  opacity: 0.5;
}

header nav {
  float: right;
  margin: center 45px 0 0;
}

header nav ul li {
  float: left;
  margin-right: 25px;
}

header nav ul li {
  font-size: 15px;
}

header nav ul li:hover {
  opacity: 0.5;
}
/* HOME ************************************************************************/

/*#home {
  background: url(../img/green.png);
  background-size: cover;
  background-position : center center;
  background-attachment: fixed;
}*/

#home h1 {
  margin: 350px auto 0 auto;
  font-size: 60px;
  color:white;
}

#home h2 {
  margin: 0 auto 0 auto;
  font-size: 40px;
  color:white;
}

#home img {
  width: 32px;
  margin-top: 250px;
  opacity: 0.5;
  border-radius: 18px;
}

#home img:hover{
  opacity: 1;
}
/* ABOUT ************************************************************************/

#about {
background-color: <?php echo $color ?> ;

}

#about img {
  width:350px;
  margin-bottom: 30px;
}

#about h3 {
  color: white;
  margin: 0 0 0 0;
}

#about h4 {
  color: lightgray;
  font-size: 25px;
}

#about p {
  color: lightgray;
  width: 800px;
  margin: 0 auto 0 auto;
  font-size: 19px;
  opacity: 0.8;
}

#about video {
  margin: center;
  border-style: solid;
  border-width: 3px;
  border-color: white;
}

#about script {
  margin-top: 90px;
}

footer {
 width: 100%;
 height: 100px;
 background-color: #494949;
}

footer div {
  padding-top: 12px;
  margin-left: 80px;
  margin-right: 80px;
}

footer a {
  color: white;
  font-size: 14px;
  font-family: 'Roboto', sans-serif; 
  font-weight: 500; 
  text-transform: uppercase; 
}

footer p {
  color: white;
  font-size: 14px;
  font-family: 'Roboto', sans-serif; 
  font-weight: 500; 
  text-transform: uppercase; 
}

#Mitte {
 margin-right: 310px;   
}

#loadOverlay{display: none;}
@media (max-width: 500px) {


   .viewBox {
        width:100%;
    }
    .gameViewBox {
        height:300px;
        width:300px;
        margin:0px auto;
        font-size: 5em;
        display:none;
		position:static;
		left: 50%;

    }

    .gameIconPanel{
        display:none;
    }

    #boardView{
        display:none;
    }

    .playerInfoBox{
    

    }

    .playerStatsBox {
        font-family: "Lucida Grande", "Helvetica Nueue", Arial, sans-serif;
        font-size: .6em;
        color: darkblue;
        margin-top:8px;
        margin-bottom:8px;
        float:right;

    }

    .playerHeader {
        width:100%;
        height:30px;

    }



    .gameActionPanel{

        width:100%;
        height:20px;

    }

    .gameIconPanel {
        width:100%;
        height:20px;
    }

}



@media (min-width: 500px) {

    .viewBox {
        width:100%;
    }
    .gameViewBox {
        height:600px;
        width:600px;
        margin:0px auto;
        font-size: 8em;
    }

    .playerInfoBox{
       

    }

    .playerStatsBox {
        font-family: "Lucida Grande", "Helvetica Nueue", Arial, sans-serif;
        font-size: .6em;
        color: darkblue;
        margin-top:8px;
        margin-bottom:8px;
        float:right;

    }

    .playerHeader {
        width:100%;
        height:30px;
    }

    .gameActionPanel{
        float:left;
        width:50%;
        height:20px;
    }

    .gameIconPanel {
        float:right;
        width:50%;
        height:20px;
    }
}

@media (min-width: 900px) {

    .viewBox {

    }

    .gameViewBox {
        height:600px;
        width:600px;
        margin:0px auto;
        font-size: 3em;

    }

	.clear {
   clear: both;
   height:25px;
	} 
	
    .menu {
		margin: auto auto auto auto;
		font-family: 'Roboto',serif		
	}
    .playerInfoBox{
    }

    .playerStatsBox {
        font-family: "Lucida Grande", "Helvetica Nueue", Arial, sans-serif;
        font-size: .6em;
        color: darkblue;
        margin-top:8px;
        margin-bottom:8px;
        float:right;
        width:50%;
    }

    .playerHeader {
        width:100%;
        height:30px;
    }
}

.spacer {
    height:10px;
}

.coldim {
    height:100%;
    width:100%;

	}
.selecting {
    filter: contrast(200%);
	
}
.banned {
   	background-size: contain,0 0,0 0,auto 200px !important;
	background-repeat: no-repeat;
	
}
.decider {
  	background-size:0 0,contain,0 0,auto 200px !important;
	background-repeat: no-repeat;
	
}
.pick {
	background-size:0 0,0 0,contain,auto 200px !important;
	background-repeat: no-repeat;
	
}
.colbox {
    height:200px;
    width:200px;
	
	}

#row0_0.boxdims {
	background-image:url("../img/Banned.png"),url("../img/Decider.png"),url("../img/Pick.png"),url("https://steamuserimages-a.akamaihd.net/ugc/933804182311104777/C4390D0148B566954591989CD25E60B0B396BBAE/"); 
	background-position:,center,center,center,center;
	background-size:0 0,0 0,0 0,auto 200px;
	background-repeat: no-repeat;
	}
#row0_1.colbox {
   	background-image:url("../img/Banned.png"),url("../img/Decider.png"),url("../img/Pick.png"),url("http://imguol.com/xleague/news/e0/2017/07/23/rainbow-six-siege---mapa-consulado-1500840798297_800x449.jpg");
	background-position:center,center,center,center;
	background-size:0 0,0 0,0 0,auto 200px;
	background-repeat: no-repeat;
	}
#row0_2.colbox {
   	background-image:url("../img/Banned.png"),url("../img/Decider.png"),url("../img/Pick.png"),url("http://static9.cdn.ubi.com/resource/en-US/game/rainbow6/siege/R6-game-info-map-bank-08_229700.jpg");
	background-position:center,center,center,center;
	background-size:0 0,0 0,0 0,auto 200px;
	background-repeat: no-repeat;
	 }
#row1_0.boxdims {
   	background-image:url("../img/Banned.png"),url("../img/Decider.png"),url("../img/Pick.png"),url("http://static9.cdn.ubi.com/resource/en-US/game/rainbow6/siege/R6-game-info-map-kafe-dostoyevsky-07_229733.jpg");
	background-position:center,center,center,center;
	background-size:0 0,0 0,0 0,auto 200px;
	background-repeat: no-repeat;
	}
#row1_1.colbox {
   	background-image:url("../img/Banned.png"),url("../img/Decider.png"),url("../img/Pick.png"),url("https://vignette.wikia.nocookie.net/rainbowsix/images/f/f6/051060.png/revision/latest/zoom-crop/width/320/height/320?cb=20160515171604");
	background-position:center,center,center,center;
	background-size:0 0,0 0,0 0,auto 200px;
	background-repeat: no-repeat;
	}
#row1_2.colbox {
   	background-image:url("../img/Banned.png"),url("../img/Decider.png"),url("../img/Pick.png"),url("https://steamuserimages-a.akamaihd.net/ugc/933804182311066499/CFBE8060BA8EA960FA2D090A746204738E547C72/");
	background-position:center,center,center,center;
	background-size:0 0,0 0,0 0,auto 200px;
	background-repeat: no-repeat;
	}
#row2_0.boxdims {
   	background-image:url("../img/Banned.png"),url("../img/Decider.png"),url("../img/Pick.png"),url("http://static9.cdn.ubi.com/resource/en-US/game/rainbow6/siege/R6-game-info-map-oregon-14_229739.jpg");
	background-position:center,center,center,center;
	background-size:0 0,0 0,0 0,auto 200px;
	background-repeat: no-repeat;
	}
#row2_1.colbox {
   	background-image:url("../img/Banned.png"),url("../img/Decider.png"),url("../img/Pick.png"),url("http://d1vr6n66ssr06c.cloudfront.net/wp-content/uploads/2016/11/Rainbow-Six-Siege-map.jpg");
	background-position:center,center,center,center;
	background-size:0 0,0 0,0 0,auto 200px;
	background-repeat: no-repeat;
	}
#row2_2.colbox {
   	background-image:url("../img/Banned.png"),url("../img/Decider.png"),url("../img/Pick.png"),url("http://static9.cdn.ubi.com/resource/en-US/game/rainbow6/siege/R6-game-info-map-chalet-14_229707.jpg");
	background-position:center,center,center,center;
	background-size:0 0,0 0,0 0,auto 200px;
	background-repeat: no-repeat;
	}

.boxdims {
    height:200px;
    width:200px;
	display:inline;
}

.playerNameBox {
    width:100%;


}

.wins {
    padding:5px;
    margin:5px;
    border-radius: 25px;
    background-color: #04B486;


}
.losses {
    padding:5px;
    margin:5px;
    border-radius: 25px;
    background-color: #FF0000;

}
.ties {
    padding:5px;
    margin:5px;
    border-radius: 25px;
    background-color: #A4A4A4;

}

.basetext {
  color: lightgray;
  margin: 0 auto 0 auto;
  font-size: 19px;
  opacity: 0.8;

}

.gameTitle {
    font-family:  "Helvetica Nueue", Arial, sans-serif;
    color:white;
    text-align: center;
    padding:5px;
    margin:5px;
    border-radius: 25px;
    background-color: #A4A4A4;
    font-size: .8em;
    width:60%;
}

.iconView{
    font-family:  "Helvetica Nueue", Arial, sans-serif;
    color:white;
    text-align: center;
    padding:5px;
    margin:5px;
    border-radius: 25px;
    background-color: #A4A4A4;
    font-size: .7em;

}

.gameHeader {
    width:90%;
    height:10px;
    margin:5px;
    padding:5px;
}


#playerName {
    text-align: right;
}

.updateBut {
    margin-left: 2px;

}

.gameButton {
    color:white;
    text-align: center;
	margin: 0 auto 0 auto;
    font-size: 24px;
  }

#updateName {
	transform: scaleX(-1);
	-moz-transform: scaleX(-1);
	-webkit-transform: scaleX(-1);
	display: inline-block;
	color:white;
	text-align: left;
	top: 2px;
    position: relative;
}

.header {
    font-family:  "Helvetica Nueue", Arial, sans-serif;
    border: 2px solid;
    text-align: center;
    color: white;
    border-radius: 25px;
    background-color: #000099;
	width:600px;
	margin: 30px auto 0 auto;

}

.scoreText {
    font-family: "Lucida Grande", "Helvetica Nueue", Arial, sans-serif;
    font-size: .2em;
    margin: auto;

    color: lightgray;
}

.gameMessage {
    /*font-family: "Lucida Grande", "Helvetica Nueue", Arial, sans-serif;
    font-size: .7em;
    color: darkblue;*/

}



#messages {
    width:100%;
    height:100%;
    min-height: 10px;
    margin:5px;

}




#gameMessage {
     /*width:300px;
    text-align: center;
    height:15px;
    padding: 5px;
    border-radius: 25px;
    background-color: #A4A4A4; 
	margin: 0 auto 0 auto;*/
}

#viewButton {
    float:right;
    width:15%;
    font-size: .7em;
    text-align: center;
    height:20px;
    padding: 5px;
    left:5px;
}



#archiveMessages {
    font-family: "Lucida Grande", "Helvetica Nueue", Arial, sans-serif;
    font-size: .7em;
    color: darkblue;
    display:none;
    width:80%;
    margin:10px;
    padding: 10px;
    border-radius: 25px;
    background-color: lightgray;
}

.menu {
    font-family: "Lucida Grande", "Helvetica Nueue", Arial, sans-serif;
    font-size: .8em;


}
ul {
  list-style-type: none;
}
.gameList {
/*     background-color: lightgray; 
    border-radius: 25px;
    background-color: #336699; */
	margin-top: 10px;
}


.instructions {
    background-color: lightgray;
    border-radius: 25px;
    background-color: #336699;
}

/*.gameTitle {*/
    /*font-family: "Lucida Grande", "Helvetica Nueue", Arial, sans-serif;*/
    /*font-size: 1.3em;*/
    /*color: white;*/
    /*margin:5px;*/
    /*text-align: center;*/
    /*width:200px;*/
/*}*/

.gameText {
	color: lightgray;
	margin: 0 auto 0 auto;
	font-size: 14px;
	opacity: 0.8;
	color: black;
	padding-left: 0
 
}

.log {
    display:none;
}

.tictacbox {

    font-family: "Lucida Grande", "Helvetica Nueue", Arial, sans-serif;

    text-align: center;
    height:600px;
    width:600px;
	margin: 30px auto 80px auto;

}

.row0 {

    width:600px;
    height:200px;
}

.row1 {
    width:600px;
    height:200px;
}

.row2 {

    width:100%;
    height:200px;

}




#row0_0 {
    float: left;

}

#row0_1 {
    float: left;


}

#row0_2 {
    float: left;

}

#row1_0 {
    float: left;

}

#row1_1 {
    float: left;

}

#row1_2 {
    float: left;

}

#row2_0 {
    float: left;


}

#row2_1 {
    float: left;
 

}

#row2_2 {
    float: left;

}