//定义按钮及图片
var button_help;
var button_pick;
var button_start;

var first_label;
var second_label;
var third_label;

var first_total_label;
var second_total_label;
var third_total_label;

var time_logo_label;
var score_logo_label;
var score_label;
var time_label;

var help_part;	//帮助页面图片

var final_label;	//结束页得分标签
var high_score_label;
var answer_label;



 //定义界面
var layer_startUI;
var layer_gameUI;
var layer_scoreUI;
var layer_shareUI;

//定义数值变量
var score;
var third_num;
var first_num;
var second_num;
var now_third;
var now_second;
var now_first;
var game_time;
var high_score;

var first_total_num;
var second_total_num;
var third_total_num;

//定义常量
var INDEX_BUTTON_SIZE_SCALE = 0.3;
var INDEX_BOY_SIZE_SCALE = 0.3;


window.onload = function(){
	cc.game.onStart = function(){

/************************
	初始化界面尺寸
*************************/

		cc.view.adjustViewPort(true); 
		if (cc.sys.isMobile) 
			cc.view.setDesignResolutionSize(500,320,cc.ResolutionPolicy.FIXED_WIDTH); 
		else 
			cc.view.setDesignResolutionSize(540,320,cc.ResolutionPolicy.SHOW_ALL); 
		cc.view.resizeWithBrowserSize(true); 

/************************
	载入资源部分
*************************/

		cc.LoaderScene.preload(["src/img/word_click.png"], function () {
			var MyScene = cc.Scene.extend({
				onEnter: function(){
					this._super();
					layer_startUI = new StartUI()
					this.addChild(layer_startUI, 0)
					layer_gameUI = new GameUI()
					this.addChild(layer_gameUI, -1)
					layer_scoreUI = new ScoreUI()
					this.addChild(layer_scoreUI, -2)
				}
			})
			cc.director.runScene(new MyScene());
		}, this);
	};

/************************
             layer部分
*************************/

	//得分界面
	var ScoreUI = cc.Layer.extend({
		ctor: function(){
			this._super();
			var bg_color = new cc.LayerColor(cc.color("#f4cfaf"));
			this.addChild(bg_color);
		},
		onEnter:function () {
			this._super();
			var size = cc.director.getWinSize();


			final_label = cc.LabelTTF.create("your score is"+ score+"!!", "Arial", 35);
			final_label.setPosition(size.width / 2, size.height / 1.7);
			this.addChild(final_label, 1);

			high_score_label = cc.LabelTTF.create("最高分 " + high_score + "！", "Arial", 35);
			high_score_label.setPosition(size.width / 2, size.height / 1.3);
			this.addChild(high_score_label, 1);

			answer_label = cc.LabelTTF.create("zhazha", "Arial", 35);
			answer_label.setPosition(size.width / 2, size.height / 2.7);
			this.addChild(answer_label, 1);


			button_restart = cc.Sprite.create("src/img/button_start.png");
			button_restart.setPosition(size.width /2, size.height / 6);
			button_restart.setScale(INDEX_BUTTON_SIZE_SCALE * 2);
			this.addChild(button_restart, 1);
			cc.eventManager.addListener(help_touchlistener.clone(), button_restart);
		},
		init:function ()
		{
			var temp = parseInt(Math.random()*10);
			var temp_ans = "zhazha";
			if (temp<3)
			{
				temp_ans = "为何这么蠢！";
			}
			else if ((temp ==5)&& (temp==6))
			{
				temp_ans = "剁手剁手，笨死了！";
			}
			else if (temp>8)
			{
				temp_ans = "渣渣！是不是不会数数咩！";
			}
			else
			{
				temp_ans = "逗逼，快去给28号投票！";
			}
			score -= 1;			
			if (score > high_score)
			{
				high_score = score;
				answer_label.setString("新纪录！大神请收膝盖！");
			}
			else if (score == high_score)
			{
				answer_label.setString("就差一只手了！");
			}
			else
			{
				answer_label.setString(temp_ans);
			}
			final_label.setString("剁了 "+ score+"分！");
			high_score_label.setString("最高分 " + high_score + "！");
		}
             })

	//游戏界面
	var GameUI = cc.Layer.extend({
		ctor: function(){
			this._super();
			var bg_color = new cc.LayerColor(cc.color("#f4cfaf"));
			this.addChild(bg_color);
		},
             	onEnter: function(){
			this._super();
		},
		timeCallback: function(dt){
			game_time -= 0.01;
			game_time = Math.round(game_time*100)/100.00;
			if ((first_total_num > 0)&&(second_total_num > 0)&&(third_total_num > 0))
			{
				first_total_num -= 1;
				second_total_num -= 1;
				third_total_num -= 1;
				game_time += 2;
				first_total_label.setString(first_total_num.toString());
				second_total_label.setString(second_total_num.toString());
				third_total_label.setString(third_total_num.toString());
			}
			time_label.setString(game_time.toString());
			if (game_time == 0){
				layer_gameUI.setLocalZOrder(-3);
				layer_scoreUI.init();
				score += 1;
			}
		},
		update: function(dt){

		},
		initGame: function(){
			var size = cc.director.getWinSize();
			/**
			var sprite = cc.Sprite.create("src/img/word_click.png");

			sprite.setPosition(size.width / 2, size.height / 1.2);
			sprite.setScale(0.3);
			this.addChild(sprite, 0);
**/
			now_third = parseInt(Math.random()*30);
			now_second = parseInt(Math.random()*30);
			now_first = parseInt(Math.random()*30);

			high_score = 150;

			first_num = 0;
			second_num = 0;
			third_num = 0;
			first_total_num = 0;
			second_total_num = 0;
			third_total_num = 0;
			score = 0;
			game_time = 20;

			//开启定时器
			this.schedule(this.timeCallback, 0.01);

			//初始化按钮及图标
			button_first = cc.Sprite.create("src/img/blueround.png");
			button_first.setPosition(size.width / 5, size.height / 2.5);
			button_first.setScale(INDEX_BUTTON_SIZE_SCALE);
			this.addChild(button_first, 1);
			cc.eventManager.addListener(game_listener, button_first);

			first_label = cc.LabelTTF.create(first_num.toString()+"/"+now_first.toString(), "Arial", 30);
			first_label.setPosition(size.width / 5, size.height / 6);
			first_label.setColor(cc.color("#519e96"));
			this.addChild(first_label, 1);

			button_second = cc.Sprite.create("src/img/greenround.png");
			button_second.setPosition(size.width / 2, size.height / 2.5);
			button_second.setScale(INDEX_BUTTON_SIZE_SCALE);
			this.addChild(button_second, 1);
			cc.eventManager.addListener(game_listener.clone(), button_second);

			second_label = cc.LabelTTF.create(second_num.toString()+"/"+now_second.toString(), "Arial", 30);
			second_label.setPosition(size.width / 2, size.height / 6);
			second_label.setColor(cc.color("#a84266"));
			this.addChild(second_label, 1);

			button_third = cc.Sprite.create("src/img/redround.png");
			button_third.setPosition(size.width /1.25, size.height / 2.5);
			button_third.setScale(INDEX_BUTTON_SIZE_SCALE);
			this.addChild(button_third, 1);
			cc.eventManager.addListener(game_listener.clone(), button_third);

			third_label = cc.LabelTTF.create(third_num.toString()+"/"+now_third.toString(), "Arial", 30);
			third_label.setPosition(size.width / 1.25, size.height / 6);
			third_label.setColor(cc.color("#a83e46"));
			this.addChild(third_label, 1);

			//符号总数计算
			first_total_label = cc.LabelTTF.create(first_total_num.toString(), "Arial", 30);
			first_total_label.setPosition(size.width / 5, size.height / 1.5);
			first_total_label.setColor(cc.color("#519e96"));
			this.addChild(first_total_label, 1);

			second_total_label = cc.LabelTTF.create(second_total_num.toString(), "Arial", 30);
			second_total_label.setPosition(size.width / 2, size.height / 1.5);
			second_total_label.setColor(cc.color("#a84266"));
			this.addChild(second_total_label, 1);

			third_total_label = cc.LabelTTF.create(third_total_num.toString(), "Arial", 30);
			third_total_label.setPosition(size.width / 1.25, size.height / 1.5);
			third_total_label.setColor(cc.color("#a83e46"));
			this.addChild(third_total_label, 1);


			//得分和时间
			score_logo_label = cc.LabelTTF.create("SCORE", "Arial", 25);
			score_logo_label.setPosition(size.width/1.15, size.height/1.05);
			this.addChild(score_logo_label ,1);

			score_label = cc.LabelTTF.create(score.toString(), "Arial", 20);
			score_label.setPosition(size.width/1.15, size.height/1.15);
			this.addChild(score_label ,1);

			time_logo_label = cc.LabelTTF.create("TIME", "Arial", 25);
			time_logo_label.setPosition(size.width/10, size.height/1.05);
			this.addChild(time_logo_label ,1);

			time_label = cc.LabelTTF.create(game_time.toString(), "Arial", 20);
			time_label.setPosition(size.width/10, size.height/1.15);
			this.addChild(time_label ,1);

		},
		resetGame: function(){
				now_third = parseInt(Math.random()*30);
				now_second = parseInt(Math.random()*30);
				now_first = parseInt(Math.random()*30);
				
				first_num = 0;
				second_num = 0;
				third_num = 0;
				first_total_num = 0;
				second_total_num = 0;
				third_total_num = 0;
				score = 0;
				game_time = 20;

				third_label.setString(third_num.toString()+"/"+now_third.toString());   
				second_label.setString(second_num.toString()+"/"+now_second.toString());      
				first_label.setString(first_num.toString()+"/"+now_first.toString());
				first_total_label.setString(first_total_num.toString());
				second_total_label.setString(second_total_num.toString());
				third_total_label.setString(third_total_num.toString());

				//开启定时器
				this.unscheduleAllCallbacks();
				this.schedule(this.timeCallback, 0.01);
		}
	})


	//开始界面
	var StartUI = cc.Layer.extend({
		ctor: function()
		{
			this._super();
			var bg_color = new cc.LayerColor(cc.color("#f4cfaf"));
			this.addChild(bg_color);
		},
		onEnter:function () 
		{
			this._super();
			var size = cc.director.getWinSize();

			var sprite = cc.Sprite.create("src/img/word_click.png");

			sprite.setPosition(size.width / 2, size.height / 1.2);
			sprite.setScale(0.3);
			this.addChild(sprite, 0);

			button_help = cc.Sprite.create("src/img/kid_singing.png");
			button_help.setPosition(size.width / 5, size.height / 2);
			button_help.setScale(INDEX_BOY_SIZE_SCALE);
			this.addChild(button_help, 1);

			button_help = cc.Sprite.create("src/img/button_help.png");
			button_help.setPosition(size.width / 5, size.height / 4.5);
			button_help.setScale(INDEX_BUTTON_SIZE_SCALE);
			this.addChild(button_help, 1);
			cc.eventManager.addListener(help_touchlistener, button_help);

			button_pick = cc.Sprite.create("src/img/kid_rockandroll.png");
			button_pick.setPosition(size.width / 2, size.height / 2);
			button_pick.setScale(INDEX_BOY_SIZE_SCALE);
			this.addChild(button_pick, 1);

			button_pick = cc.Sprite.create("src/img/button_pick.png");
			button_pick.setPosition(size.width / 2, size.height / 4.5);
			button_pick.setScale(INDEX_BUTTON_SIZE_SCALE);
			this.addChild(button_pick, 1);
   				cc.eventManager.addListener(help_touchlistener.clone(), button_pick);

			button_start = cc.Sprite.create("src/img/kid_redguitar.png");
			button_start.setPosition(size.width /1.25, size.height / 2);
			button_start.setScale(INDEX_BOY_SIZE_SCALE);
			this.addChild(button_start, 1);

			button_start = cc.Sprite.create("src/img/button_start.png");
			button_start.setPosition(size.width /1.25, size.height / 4.5);
			button_start.setScale(INDEX_BUTTON_SIZE_SCALE);
			this.addChild(button_start, 1);
			cc.eventManager.addListener(help_touchlistener.clone(), button_start);

			help_part = cc.Sprite.create("src/img/help.png");
			help_part.setPosition(size.width / 2, size.height /2);
			help_part.setScale(0.5);
			this.addChild(help_part, -3);
			cc.eventManager.addListener(help_touchlistener.clone(), help_part);

		}
             })
 	//游戏运行
  	cc.game.run("gameCanvas");
};

/************************
             listener部分
*************************/

	//开始界面按钮listener
	var help_touchlistener = cc.EventListener.create({
		event: cc.EventListener.TOUCH_ONE_BY_ONE,
		swallowTouches: true,
		onTouchBegan: function (touch, event){
			var target =  event.getCurrentTarget();
			var locationInNode = target.convertToNodeSpace(touch.getLocation());    
			var s = target.getContentSize();
			var rect = cc.rect(0, 0, s.width, s.height);

			if (cc.rectContainsPoint(rect, locationInNode)) {       // 判断触摸点是否在按钮范围内
				cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
				target.opacity = 180;
				return true;
			}
			return false; 
		},
		onTouchEnded: function (touch, event) {         // 实现onTouchEnded事件处理回调函数
			var target = event.getCurrentTarget();
			cc.log("sprite onTouchesEnded.. ");
			target.setOpacity(255);
			if (target == button_restart){
				layer_gameUI.setLocalZOrder(-1);
				layer_gameUI.resetGame();
			}
	            		if (target == button_help) {                    
				help_part.setLocalZOrder(4);            // 重新设置 ZOrder，显示的前后顺序将会改变
			} 
			else if (target == button_pick) 
			{
				button_pick.setLocalZOrder(-2);
			}
			else if (target == button_start)
			{
				layer_startUI.removeFromParent();
				layer_gameUI.initGame();
			}
			else if (target == help_part)
			{
				help_part.setLocalZOrder(-4);
			}
		}
	})
	
	//游戏界面按钮listener
	var game_listener = cc.EventListener.create({
		event: cc.EventListener.TOUCH_ONE_BY_ONE,
		swallowTouches: true,
		onTouchBegan: function (touch, event){
			var target =  event.getCurrentTarget();
			var locationInNode = target.convertToNodeSpace(touch.getLocation());    
			var s = target.getContentSize();
			var rect = cc.rect(0, 0, s.width, s.height);

			if (cc.rectContainsPoint(rect, locationInNode)) {       // 判断触摸点是否在按钮范围内
				cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
				target.opacity = 180;
				return true;
			}
			return false; 
		},
		onTouchEnded: function (touch, event) {         // 实现onTouchEnded事件处理回调函数
			var target = event.getCurrentTarget();
			cc.log("sprite onTouchesEnded.. ");
			target.setOpacity(255);

			if (target == button_first) {                    
	    		first_num += 1;
				score += 1;
				score_label.setString(score.toString());
				if (first_num >now_first)
				{ 
					layer_gameUI.setLocalZOrder(-3);
					layer_scoreUI.init();
				}
				else if (first_num == now_first)
				{
					now_first = 0;
					first_num = 0;
					first_total_num += 1;
					first_total_label.setString(first_total_num.toString());
					if ((now_third == 0)  && (now_second == 0) && (now_first == 0))
					{
						rand = parseInt(Math.random()*7);
						if (rand == 0 )
						{
							now_third = parseInt(Math.random()*50)+1;
						}
						else if (rand == 1)
						{
							now_second = parseInt(Math.random()*50)+1
						}
						else if (rand == 2)
						{
							now_first = parseInt(Math.random()*50)+1
						}
						else if (rand == 3)
						{
							now_third = parseInt(Math.random()*50)+1
							now_second = parseInt(Math.random()*50)+1
						}
						else if (rand == 4)
						{
							now_third = parseInt(Math.random()*50)+1
							now_first = parseInt(Math.random()*50)+1
						}                                                              
						else if (rand == 5)
						{
							now_third = parseInt(Math.random()*50)+1
							now_second = parseInt(Math.random()*50)+1
						}
						else if (rand >= 6)
						{
							now_second = parseInt(Math.random()*50)+1
							now_third = parseInt(Math.random()*50)+1
							now_first = parseInt(Math.random()*50)+1
						}                          
						third_label.setString(third_num.toString()+"/"+now_third.toString());   
						second_label.setString(second_num.toString()+"/"+now_second.toString());      
						first_label.setString(first_num.toString()+"/"+now_first.toString());                                                        	
					}
					first_label.setString(first_num.toString()+"/"+now_first.toString())  
				}
				else
				{
					first_label.setString(first_num.toString()+"/"+now_first.toString())
					var a = parseInt(Math.random()*30)
					var b = parseInt(Math.random()*30)
					var c = parseInt(Math.random()*30)
					if ((a == 10)&&(now_first == 0))
					{
						now_first = parseInt(Math.random()*50)+1
					}
					if ((b == 10)&&(now_second == 0))
					{
						now_second = parseInt(Math.random()*50)+1
					}
					if ((b == 10)&&(now_third == 0))
					{
						now_third = parseInt(Math.random()*50)+1
					}                      

					third_label.setString(third_num.toString()+"/"+now_third.toString());   
					second_label.setString(second_num.toString()+"/"+now_second.toString());      
					first_label.setString(first_num.toString()+"/"+now_first.toString());                     	            			
				}
			} 
			else if (target == button_second) {
				second_num += 1;
				score += 1;
				score_label.setString(score.toString());
				if (second_num >now_second)
				{
					layer_gameUI.setLocalZOrder(-3);
					layer_scoreUI.init();
				}
				else if (second_num == now_second)
				{
					now_second = 0;
					second_num = 0;
					second_total_num += 1;
					second_total_label.setString(second_total_num.toString())
					if ((now_third == 0) && (now_second == 0)&&(now_first == 0))
					{
						rand = parseInt(Math.random()*7)
						if (rand == 0 )
						{
							now_third = parseInt(Math.random()*50)+1
						}
						else if (rand == 1)
						{
							now_second = parseInt(Math.random()*50)+1
						}
						else if (rand == 2)
						{
							now_first = parseInt(Math.random()*50)+1
						}
						else if (rand == 3)
						{
							now_third = parseInt(Math.random()*50)+1
							now_second = parseInt(Math.random()*50)+1
						}
						else if (rand == 4)
						{
							now_third = parseInt(Math.random()*50)+1
							now_first = parseInt(Math.random()*50)+1
						}                                                              
						else if (rand == 5)
						{
							now_third = parseInt(Math.random()*50)+1
							now_second = parseInt(Math.random()*50)+1
						}
						else if (rand >= 6)
						{
							now_second = parseInt(Math.random()*50)+1
							now_third = parseInt(Math.random()*50)+1
							now_first = parseInt(Math.random()*50)+1
						}                                                                                      	

						third_label.setString(third_num.toString()+"/"+now_third.toString());   
						second_label.setString(second_num.toString()+"/"+now_second.toString());      
						first_label.setString(first_num.toString()+"/"+now_first.toString());      
					}
					second_label.setString(second_num.toString()+"/"+now_second.toString())        
				}
				else
				{
					second_label.setString(second_num.toString()+"/"+now_second.toString())    
					var a = parseInt(Math.random()*30)
					var b = parseInt(Math.random()*30)
					var c = parseInt(Math.random()*30)
					if ((a == 10)&&(now_first == 0))
					{
						now_first = parseInt(Math.random()*50)+1
					}
					if ((b == 10)&&(now_second == 0))
					{
						now_second = parseInt(Math.random()*50)+1
					}
					if ((b == 10)&&(now_third == 0))
					{
						now_third = parseInt(Math.random()*50)+1
					}           

					third_label.setString(third_num.toString()+"/"+now_third.toString());   
					second_label.setString(second_num.toString()+"/"+now_second.toString());      
					first_label.setString(first_num.toString()+"/"+now_first.toString());                                           			
				}
			}
	            		else if (target == button_third){
				third_num += 1;
				score += 1;
				score_label.setString(score.toString());
				if (third_num >now_third)
				{
					layer_gameUI.setLocalZOrder(-3);
					layer_scoreUI.init();
				}
				else if (third_num == now_third)
				{
					now_third = 0;
					third_num = 0;
					third_total_num += 1;
					third_total_label.setString(third_total_num.toString());
					if ((now_third == 0) && (now_second == 0)&&(now_first == 0))
					{
						rand = parseInt(Math.random()*7)
						if (rand == 0 )
						{
							now_third = parseInt(Math.random()*50)+1
						}
						else if (rand == 1)
						{
							now_second = parseInt(Math.random()*50)+1
						}
						else if (rand == 2)
						{
							now_first = parseInt(Math.random()*50)+1
						}
						else if (rand == 3)
						{
							now_third = parseInt(Math.random()*50)+1
							now_second = parseInt(Math.random()*50)+1
						}
						else if (rand == 4)
						{
							now_third = parseInt(Math.random()*50)+1
							now_first = parseInt(Math.random()*50)+1
						}                                                              
						else if (rand == 5)
						{
							now_third = parseInt(Math.random()*50)+1
							now_second = parseInt(Math.random()*50)+1
						}
						else if (rand >= 6)
						{
							now_second = parseInt(Math.random()*50)+1
							now_third = parseInt(Math.random()*50)+1
							now_first = parseInt(Math.random()*50)+1
						}                                        

						third_label.setString(third_num.toString()+"/"+now_third.toString());   
						second_label.setString(second_num.toString()+"/"+now_second.toString());      
						first_label.setString(first_num.toString()+"/"+now_first.toString());      
					}

					third_label.setString(third_num.toString()+"/"+now_third.toString());             
				}
				else
				{
					third_label.setString(third_num.toString()+"/"+now_third.toString());
					var a = parseInt(Math.random()*30)
					var b = parseInt(Math.random()*30)
					var c = parseInt(Math.random()*30)
					if ((a == 10)&&(now_first == 0))
					{
						now_first = parseInt(Math.random()*50)+1
					}
					if ((b == 10)&&(now_second == 0))
					{
						now_second = parseInt(Math.random()*50)+1
					}
					if ((b == 10)&&(now_third == 0))
					{
						now_third = parseInt(Math.random()*50)+1
					}                

					third_label.setString(third_num.toString()+"/"+now_third.toString());   
					second_label.setString(second_num.toString()+"/"+now_second.toString());      
					first_label.setString(first_num.toString()+"/"+now_first.toString());                                  
				}
			}
		}
	})
