$(document).ready(function(){
	  	//DEBUG JS
	  	//$(".char").css("visibility", "hidden")
	  	$('#song').prop('volume', 0.1);

	  	var killCount = 0;
	  	var arenaFilled = 0;
	  	console.log(arenaFilled);

	  	var playerHp;
	  	var playerHpFull;
	  	var playerAtk;
	  	var playerAtkBonus;

	  	var enemyHp;
	  	var enemyHpFull;
	  	var enemyCounter;

	  	var clickityClack;//holds atk-btn function

	  	var that; // stores class char parent for player
	  	var thut; //stores class char parent for opponent
	  	//Character selection
	  	$(".char").on("click",function(){		
	  		if (arenaFilled === 0){
	  			that = this;
	  			arenaFilled = 1;
	  			playerHp = $(this).attr('data-hp');
	  			playerHpFull = $(this).attr('data-hp');
	  			playerAtk = $(this).attr('data-atk');
	  			playerAtkBonus = $(this).attr('data-atk');
	  			
	  			$(this).appendTo("#player-stage");
	  			//off click to prevent player from becoming opponent
	  			$(this).off('click');

					$(this).css('visibility', 'hidden');	  			
					$(".atk-btn").off('click');

	  			$(".top-bar").html("Please Select A Genetically Modified Gluten Filled Inorganic Post Nuclear Threat:")

	  			

	  			console.log("Arena: " + arenaFilled);
	  			console.log("Player: " + playerHp + " HP");
	  			console.log("Player: " + playerAtk + " ATK");
	  		}
	  
	  	//Enemy selection
	  		else if (arenaFilled === 1){
	  			thut=this;
	  		 	arenaFilled = 2;
	  		 	enemyHp = $(this).attr('data-hp');
	  		 	enemyHpFull = $(this).attr('data-hp');
	  			enemyCounter = $(this).attr('data-counter');

	  		 	$(this).appendTo("#opponent-stage");
	  		 	$(this).addClass("enemy");

	  		 	$(".char").css("visibility", "hidden");
	  		 	$(that).css("visibility","visible");
	  		 	$(this).css("visibility","visible");
	  		 	$(".fight-club").css("visibility","visible")
	  		 	$(".top-bar").html("Post Nuclear Apocalyptic Survival Simulation: Begin")

	  		 	//turns on atk-btn with function clickityClack
	  		 	$(".atk-btn").on('click', clickityClack);

	  		 	console.log("Arena: " + arenaFilled);
	  		 	console.log("Opponent: " + enemyHp + " HP");
	  			console.log("Opponent: " + enemyCounter + " COUNTERATK");
	  		 }

			});

			// function typingLoop(){
			// 	$('#top-bar').css("overflow", "hidden");
			// 	$("#top-bar").animate('typing', start);
			// };

	  	//Attack Button
	  	function clickityClack(){
	  		//Fight must occur in phases: Player Attacks, checks if opponent is defeated. If not, opponent attacks, checks if player is defeated.

	  		//Player attacks
	  		enemyHp -= playerAtk;
	  		playerAtk = parseInt(playerAtk) + parseInt(playerAtkBonus);
	  		console.log("Player Attacked for " + playerAtk + " damage!");
	  		console.log("Opponent: " + enemyHp + " HP");

	  		//After opponent is defeated
	  		if (enemyHp <= 0){
	  			$(".enemy").remove();
	  			arenaFilled = 1;
	  			killCount += 1;

	  			enemyHp = 0;
	  			enemyHpFull = 0;
	  			enemyCounter = 0;

	  			//turns off atk-btn when opponent hp is dead
	  			$(".atk-btn").off('click');

	  			$(".char").css("visibility", "visible");
	  			$(that).css('visibility', 'hidden');
	  			$(".fight-club").css('visibility','hidden');
	  			$(".top-bar").html("Please Select Another Genetically Modified Gluten Filled Inorganic Post Nuclear Threat:")

	  			console.log("Kill Count: " + killCount)
				}

	  		//Enemy counter attacks
	  		playerHp -= enemyCounter;
	  		console.log("Enemy countered for " + enemyCounter + " damage!");
	  		console.log("Player: " + playerHp + " HP");

	  		//HP and Health Bars
		  		// function hp(a,b){
		  		// 	(parseInt(a)/parseInt(b))*100+ "%";
		  		// }

		  		// var playerHpBar = hp(playerHp, playerHpFull);
		  		// var enemyHpBar = hp(enemyHp, enemyHpFull);

	  		var playerHpBar = (parseInt(playerHp)/parseInt(playerHpFull))*100+ "%";
				var enemyHpBar = (parseInt(enemyHp)/parseInt(enemyHpFull))*100+ "%";

	  		function healthBar(x,y,z){
	  			$(x).find(".progress-bar").css({"width": y});
	  			$(x).find(".hp-display").html(z);
					console.log(y);
			  };

			  healthBar(that, playerHpBar, playerHp);
			  healthBar(thut, enemyHpBar, enemyHp);



				// $(that).find(".progress-bar").css({"width": playerHpBar});
	  	// 	$(that).find(".hp-display").html(playerHp);
				// console.log(playerHpBar);

				
				// $(thut).find(".progress-bar").css({"width": enemyHpBar});
				// $(thut).find(".hp-display").html(enemyHp);
				// console.log(enemyHpBar);


				//Result text	  		 
	  		$("#result-box").html(
	  			"<p>" + "You did " + playerAtk + " pts of damage!" + "</p>" + "<p>" + "Your opponent did " + enemyCounter + " pts of damage to you!" + "</p>"

	  		);

	  		//Loss Condition
	  		if (playerHp <= 0){
	  			$(".atk-btn").off('click');
	  			$(that).css('visibility', 'hidden');
	  			$("#result-box").html("<h1 class='loss-text'>Your Representative has Died. You are no longer eligible for Vault-Tec services in the event of a true nuclear fallout. Good luck out there!</h1>")
	  			$("#result-box").css("top", "19%")
	  			//reset invisible until loss
	  			$(".reset-btn").css("visibility","visible");
	  			console.log("GAME OVER! YOU SUUUUCK!");
	  		}
	  		


	  		//Win condition
				if (killCount === 3){
					$(".top-bar").html("<h1 class='final-text-adjust'>Congratulations on the Completion of the Vault-tec post nuclear survival simulation. You will be contacted by a Vault-tec Representative for access to the nearest vault in the event of an actual nuclear fallout.</h1> <h1>Have a wonderful day!</h1>");
					$(".row").css('height', 0);
					$(".reset-btn").css({
						"visibility": "visible",
						"top": "90%",
						"left": "46%"
					});

					$('.logo').css('top', '24%');
					$('.music-logo').css('top', '-23%');
					console.log("YOU WIN!");
				}	
	  	};

	  	//Reset Button
	  	$(".reset-btn").on("click",function(){
	  		location.reload();
	  	});

	  	//font #0dfe17
	  	//TURN OFF BUTTON ATTACK WHEN NO OPPONENT SO IT DOESNT KEEP GOING UP


	  //Fun with music icon! :D	
	  $(".music-logo").on("click",function(){
	  	$("#song").get(0).play();
	  });

	  $(".music-logo").mouseover(function() {
  		$('.warning').css("visibility","visible");
		});

		$(".music-logo").mouseout(function() {
  		$('.warning').css("visibility","hidden");
		});

});
