/* Author: Joshua Remy
 Script to support the Tic Tac Toe Client side.
 */

//STATIC Deployment and Game Settings

var GAME_HOST = '127.00.1';
var COMPUTER_PACE_MS=100;
var SHOW_SCORES=false;
var SIMULATION_RUN=false;
var turns = -1;
var rowsleft = "";
var lastban = "";
var parameter = "";
var banned = [];
var window_focus;
//Global variables that are necessary for the session.
var playerIcon="",oppPlayerIcon="",clientId;
var gameId = "";
var logViewShow=false;


var gameParams = {
    userName:"",
    wins:0,
    losses:0,
    sessId:"",
    stalemates:0
};


$(document).ready(function () {

    var socket = io(GAME_HOST);

    socket.on('connect', function () {

        clientId = socket.io.engine.id;
        initializeGameParams();
        console.log("ID Assigned - " + clientId);

    });

    /**
     * Starts the game initializes the board and view by showing the grid, if necessary.
     *
     * Passed a Game object.
     */
    socket.on('begin_game', function (game) {
        gameId = game.id;

        if (game.currentPlayer.id == clientId)
            updateBoard(game.board, true,game.aiscore);
        else
            updateBoard(game.board, false,game.aiscore);
        $(".header").slideUp(250);
        $(".gameIconPanel").slideDown(500);
        $(".gameViewBox").slideDown(500);
        if (game.currentPlayer.computerai) {
            //aiTurnPlay(game);
            var row= Math.floor(Math.random() * 3-1) + 1;
            var col= Math.floor(Math.random() * 3-1) + 1;
            var playerInfo = {"gameId": game.id, "player": game.currentPlayer.id, "action": {"row": row, "quad": col}};

            socket.emit('playTurn', playerInfo);
        }

    });

    /**
     * Main turn played and passed a game object.
     *
     * If AI player, the system will invoke the computer's turn.
     *
     */
    socket.on('turn_played', function (game) {

        if (game.currentPlayer.id == clientId) {
			updateBoard(game.board, true,game.aiscore);
			$('#gameMessage').empty().append('Du bist dran!');
            if (game.currentPlayer.computerai) {
                setTimeout(function() {aiTurnPlay(game);},COMPUTER_PACE_MS);
            }
        } else {
            updateBoard(game.board, false,game.aiscore);
            $('#gameMessage').empty().append('Warte auf anderes Team!');
        }

    });

    /**
     * Server message broadcast
     *
     */
    socket.on('server_message', function (data) {

        $('#receiver').append('<li>Message: ' + data + '</li>');
    });


    /**
     * Game message for general updates to game and logged.
     *
     */
    socket.on('game_message', function (data) {

        logEvent(data.message,true);
    });


    /**
     * Provides the avaialble games that are on the server.  After this call,
     * the system uses update player to add and update any other player information.
     *
     */
    socket.on('available_games', function (players) {
        $('#availGames').empty();
        logEvent("Available Games Loading",true);
        for (var i = 0; i < players.length; ++i) {
            if (players[i].id != clientId) {
                $('#availGames').append('<li id="player_' + players[i].id + '"></li>');
                if (players[i].state!="playing") {
                    addOpenGame(players[i]);
                } else {
                    //$("#player_" + players[i].id).replaceWith('Game ' + players[i].state + ' for ' + players[i].playerName);
                }
            }
        }
        logEvent("Lade ein anderes Team ein oder warte auf eine Einladung!",true);
    });


    /**
     * Player updates from properties like name, state and it will update the display after player info changes.
     * States: new, left, pending, and playing.
     *
     */
 	//if (gameParams.userName==)


    socket.on('player_update', function (player) {
        //$('#receiver').append('<li>Player Updated/Added: ' + data.id  + ' to ' + data.state + '</li>');
        //alert("Update for " +player.playerName + ":" +player.state);
        logEvent("Player " + player.playerName+ " Info Updated",false);
        if (player.id != clientId) {

            if (player.state == "new") {
                $('#availGames').append('<li id="player_' + player.id + '"></li>');
                addOpenGame(player);
                logEvent("New Player " + player.playerName,false);
            } else if (player.state == "left") {
                $("#player_" + player.id).remove();
                logEvent("Team " + player.playerName+ " hat den Map Ban verlassen",false);
            } else if (player.state == "pending") {
                $("#player_" + player.id).empty().append('Einladung an Team ' + (player.playerName?player.playerName:player.id)+' gesendet');
                logEvent("Player " + player.playerName+ " Einladung gesendet",false);
            }
            else if (player.state == "playing") {
                $("#player_" + player.id).empty().append('Map Ban mit Team ' + (player.playerName?player.playerName:player.id)+' gestartet.');
                logEvent("Player " + player.playerName+ " Map Ban gestartet",false);
            }


        }
    });


    /**
     * Message listener for request to Join.  Player will see an update on the game list.
     *
     */
    socket.on("request_to_join", function (game) {

        if (game.playerO.id == clientId) {

            var req_id = game.id;
            $("#player_" + game.playerX.id).empty().append('Du wurdest von Team ' + game.playerX.playerName + ' eingeladen | <button id="' + req_id + '" >Beitreten</button>');
			$('#' + req_id).bind('click', function () {
                var joinDetails = {
                    gameId: game.id
                };
				for (var i = 0; i < 3; ++i) {
					for (var r = 0; r < 3; ++r) {
						$("#row" + i + "_" + r +"pick").css('visibility', '');
						$("#row" + i + "_" + r +"banned").css('visibility', '');
						$("#row" + i + "_" + r +"decider").css('visibility', '');
						$("#row" + i + "_" + r).css('color','');
						$("#row" + i + "_" + r).css('backgroundColor', '');	
						}
					}
                socket.emit('joinGame', joinDetails);
            });
        }

    });

    /**
     * Game Won by some player.  Function validates who won and displays the appropriate info.
     *
     *
     */
    socket.on('game_won', function (data) {

        updateBoard(data.game.board, false,data.game.aiscore);
        if (data.winner.id == clientId) {
            gameParams.wins++;
            $('#gameMessage').empty().append("<strong>You Won!</strong>");
        } else {
            gameParams.losses++;
            $('#gameMessage').empty().append("You Lost!");
        }

        saveParams();
        updateDisplay();

        if (SIMULATION_RUN) {
                var startDetails = {
                    requestID: clientId,
                    action: "Request Simulation Game"

                };
                setTimeout(function() {
                    socket.emit('requestSimulation', startDetails)
                },COMPUTER_PACE_MS
            );
        }


    });

    /**
     * Stalemate message and ending the game.
     *
     */
    socket.on('stale_mate', function (data) {
		gameParams.stalemates++;
        saveParams();
        updateBoard(data.board, false);
        updateDisplay();

        if (SIMULATION_RUN) {
            var startDetails = {
                requestID: clientId,
                action: "Request Simulation Game"

            };
            setTimeout(function() {
                    socket.emit('requestSimulation', startDetails)
                },COMPUTER_PACE_MS
            );
        }
    });


    /**
     * Log Event for Console and log view.
     *
     * @param event
     * @param display
     */
    function logEvent(event,display) {
        $('#archiveMessages').append("</br>").append(event);
        if (display) {
            $('#gameMessage').empty().append(event);
        }

    }

    /*
     Main Game Functions
     */

    /**
     * Initialize the main game parameters.  Sets up the buttons and various action a user can do.
     */
    function initializeGameParams(){

        var gameCookie = getCookie("tttGameParams");

        if (gameCookie!="") {
            getGameParams(gameCookie);
            gameParams.sessId=clientId;


        }else
        {	var user = prompt("Gib deinen Teamnamen ein","");
			if (user!=null) {
				gameParams.userName=user;
				saveParams();
				updateDisplay();
				gameParams.sessId=clientId;
				socket.emit("updatePlayerName",{"name": user});
			}else{ 
			gameParams.userName="Kein Name";
            gameParams.sessId=clientId;
			//alert(gameParams.userName);
        }
		}


        $('#updateName').bind("click", function () {
            var user = prompt("Gib einen neuen Teamnamen ein","");
            if (user!=null) {
                gameParams.userName=user;
                saveParams();
                updateDisplay();
                socket.emit("updatePlayerName",{"name": user});
            }


        });

        $('#viewButton').bind("click", function () {
            if (!logViewShow){
                $('#archiveMessages').slideDown(500);
                $('#viewButton').empty().append("Close");
                logViewShow=true;
            }else
            {
                $('#archiveMessages').slideUp(500);
                $('#viewButton').empty().append("All Logs");
                logViewShow=false;
            }


        });


/*         $('#swapIcons').bind("click", function() {
            if (playerIcon=="X".trim()) {
                playerIcon="O";
                oppPlayerIcon="X";
            }else
            {
                playerIcon="X";
                oppPlayerIcon="O";
            }
            $("#myIcon").empty().append(playerIcon);
            $("#oppIcon").empty().append(oppPlayerIcon);
        }); */

        $('#playComputer').bind("click",function(){

            var startDetails = {
                requestID: clientId,
                action: "Request Computer Game"

            };
            socket.emit('requestComputerGame', startDetails);

        });

        $('#computerSimulation').bind("click",function(){

            var startDetails = {
                requestID: clientId,
                action: "Request Simulation Game"

            };
            socket.emit('requestSimulation', startDetails);
            SIMULATION_RUN=true;
        });


        saveParams();
        updateDisplay();
    }


    /**
     *
     * Intermediate function for pass thru...
     *
     * @param row
     * @param quad
     * @returns {Function}
     */
    function playSetup(row, quad) {
        //alert(selection);
        return function () {
            playTurn(row, quad);
        }
    }

    /**
     * Play client turn and update the row.
     *
     * @param row
     * @param quad
     */
    function playTurn(row, quad) {
        var playerInfo = {"gameId": gameId, "player": clientId, "action": {"row": row, "quad": quad}};
        socket.emit('playTurn', playerInfo);

    }

    /**
     * AI turn playing, which will return complete the full turn.
     *
     * @param game
     */
    function aiTurnPlay(game) {
        var player = game.currentPlayer;
        var scores = scoreBoard(game.board, player.id);
        var maxScore = 0;
        var r_move = 0;
        var c_move = 0;
        var scoreHold=[];
        for (var r=0;r<3;r++){
            for (var c=0;c<3;c++) {
                if (maxScore==scores[r][c]){
                    scoreHold.push({r:r,c:c,score:scores[r][c]});
                }else if (maxScore<scores[r][c]) {
                    scoreHold=[];
                    maxScore=scores[r][c];
                    scoreHold.push({r:r,c:c,score:scores[r][c]});
                }
            }
        }

        if (scoreHold.length>1) {
            var select= Math.floor(Math.random() * scoreHold.length-1) + 1;
            r_move=scoreHold[select].r;
            c_move=scoreHold[select].c;
        }else
        {
            r_move=scoreHold[0].r;
            c_move=scoreHold[0].c;
        }


        var playerInfo = {"gameId": game.id, "player": player.id, "action": {"row": r_move, "quad": c_move}};
        socket.emit('playTurn', playerInfo);
    }
 /*
 Cookie Code
  */

    /**
     * Save Params to cookie.
     *
     */
    function saveParams() {
        var cookieStr=gameParams.userName+"|"+gameParams.sessId+"|"+gameParams.wins+"|"+gameParams.losses+"|"+gameParams.stalemates;
        setCookie("tttGameParams",cookieStr,3);
    }

    /**
     * Get the Game Params from the Cookie.
     *
     * @param cookieParams
     */

    function getGameParams(cookieParams) {
        var parseStr = cookieParams.split("|");
        gameParams.userName=parseStr[0];
        gameParams.sessId=parseStr[1];
        gameParams.wins=parseStr[2];
        gameParams.losses=parseStr[3];
        gameParams.stalemates=parseStr[4];

    }


    /**
     * Set the Cookie.
     *
     * @param cname
     * @param cvalue
     * @param exdays
     */
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    /**
     * Get the Cookie from the a specif cookie name.
     *
     * @param cname
     * @returns {string}
     */
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    }


/*
Display code
 */

    /**
     * Request a Game with another person.
     *
     * @param player
     */
    function addOpenGame(player) {

        $("#player_" + player.id).empty().append('Team: ' + player.playerName + ' | <button id="' + player.id + '">Einladen</button>');
        $('#' + player.id).bind('click', function () {
            var startDetails = {
                requestID: clientId,
                openPlayerID: player.id,
                action: "Request Game"

            };
		for (var i = 0; i < 3; ++i) {
            for (var r = 0; r < 3; ++r) {
						$("#row" + i + "_" + r +"pick").css('visibility', '');
						$("#row" + i + "_" + r +"banned").css('visibility', '');
						$("#row" + i + "_" + r +"decider").css('visibility', '');
						$("#row" + i + "_" + r).css('color','');
						$("#row" + i + "_" + r).css('backgroundColor', '');	
		}
		}
            socket.emit('requestGame', startDetails);

        });
    }


    /**
     * Update Display with Player info.
     *
     */
    function updateDisplay(){
		turns=-1
		rowsleft = "#row0_0#row0_1#row0_2#row1_0#row1_1#row1_2#row2_0#row2_1#row2_2";
        $("#playerName").empty().append("Team: " + gameParams.userName);
        $("#wins").empty().append(gameParams.wins);
        $("#losses").empty().append(gameParams.losses);
        $("#ties").empty().append(gameParams.stalemates);

    }

    //Helper Functions
    function selectionSetup(selection) {
        //alert(selection);
        return function () {
            showSelection(selection);
        }
    }


    function showSelection(selection) {
        // alert(selection);
        $(selection).toggleClass("selecting");
    }


    /**
     * Update the Board based on Board passed and if the board open squares should be activated for user.
     *
     * The Scores uses the Global SCORES... Var to show or not show the scores.
     *
     * @param game_data
     * @param activate
     * @param scores
     */
		/**Benachrichtigung*/
	function notifyMe(map,status) {
	  // Let's check if the browser supports notifications
	  if (!("Notification" in window)) {
		alert("This browser does not support desktop notification");
	  }
	  
	  // Let's check whether notification permissions have alredy been granted
	  else if (Notification.permission === "granted") {
		// If it's okay let's create a notification
		var options = {
			body: "Dass Gegnerteam hat "+map+status+"!",
			icon: "http://mister-gaming.de/img/MG.png"
		}
		var notification = new Notification("Du bist dran!", options);
	  }

	  // Otherwise, we need to ask the user for permission
	  else if (Notification.permission !== 'denied') {
		Notification.requestPermission(function (permission) {
		  // If the user accepts, let's create a notification
		  if (permission === "granted") {
			//var notification = new Notification("Du bist dran!");
		  }
		});
	  }

	  // At last, if the user has denied notifications, and you 
	  // want to be respectful there is no need to bother them any more.
	}
    function updateBoard(game_data, activate,scores) {
						turns=turns+1;
						 //alert(turns);
						 //Anzahl der Züge zählen
        var newScores = scoreBoard(game_data,clientId);

        for (var i = 0; i < 3; ++i) {

            for (var r = 0; r < 3; ++r) {
                var rowindex = "#row" + i + "_" + r;
				if (game_data[i][r] == 0 && activate) {
				//alert(rowindex);
                //$(rowindex).empty();
			       /*  if (SHOW_SCORES) {
                        $(rowindex).append("<span class='scoreText'>"+newScores[i][r]+"/" +scores[i][r] + "</span>");
                    }*/
                    if (!SIMULATION_RUN) {
                        $(rowindex).hover(
					  function() {
						$( this ).addClass( "selecting" );
					  }, function() {
						$( this ).removeClass( "selecting" );
					  }
					);

					} 
                    $(rowindex).bind('click', playSetup(i, r));

                } else if (game_data[i][r] == 0 && !activate) {
                    //$(rowindex).empty();
                   /*  if (!SIMULATION_RUN&&!SHOW_SCORES) {
                        $(rowindex).append("<span class='scoreText'>"+newScores[i][r]+"/" +scores[i][r] + "</span>");
                    } */
                    $(rowindex).unbind();
                }
                else if (game_data[i][r] != 0) {
					//var degrees = Math.floor(Math.random() * (10 - (-80))) + -80;
					$(rowindex).unbind();
					//alert(rowindex);
					rowsleft = rowsleft.replace(rowindex,'')
										
					switch (true) {
						case (turns<=6):
						//alert(rowindex)
							$(rowindex+"banned").css('visibility', 'visible');
							break;
						case (turns==7):
						//alert(rowindex)
							if ( $(rowindex+"banned").css('visibility') == 'hidden'){
								$(rowindex+"pick").css('visibility', 'visible');
								$(rowindex).css('color','#52bf14');
								}
							break;
						case (turns==8):
						//alert(rowindex)
							if ( $(rowindex+"banned").css('visibility') == 'hidden' &&  $(rowindex+"pick").css('visibility') == 'hidden'){
								$(rowindex+"pick").css('visibility', 'visible');
								$(rowindex).css('color','#52bf14');
								$(rowsleft).css('backgroundColor', '#ffd90040');
								$(rowsleft+"decider").css('visibility', 'visible');
								$(rowsleft).css('color','#dc710e');
								
							}
							break;
					}
                    if (game_data[i][r] == clientId) {
					$( rowindex ).removeClass( "selecting" );
					$(rowindex).css('backgroundColor', '#0900ff57');
											
                    } else {
					$(rowindex).css('backgroundColor', '#bd13138a');
					if (!banned.includes($(rowindex).text())){
						banned.push($(rowindex).text());
						lastban = banned[banned.length - 1];
						if (turns>6){parameter=" gewählt"}
						else{parameter=" gebannt"}
						$(window).focus(function() {
							window_focus = true;
						}).blur(function() {
							window_focus = false;
						});
						if (!window_focus){notifyMe(lastban,parameter)};
						//notifyMe(lastban,parameter);
					}
					}
                }
            }
		}		
    }

});