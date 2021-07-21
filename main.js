song="";
rightwrist_y = "";
leftwrist_y = "";
rightwrist_x = "";
leftwrist_x = "";
leftWristscore = "";
rightWristscore = "";
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(600,500);
    posenet = ml5.poseNet(video,model_loaded);
    posenet.on("pose",gotposes);
}
function gotposes(results){
    if(results.length>0){
        console.log(results);
        rightwrist_x = results[0].pose.rightWrist.x
        rightwrist_y = results[0].pose.rightWrist.y
        leftwrist_x = results[0].pose.leftWrist.x
        leftwrist_y = results[0].pose.leftWrist.y
        leftWristscore = results[0].pose.keypoints[9].score
        rightWristscore = results[0].pose.keypoints[10].score
    }
}
function model_loaded(){
    console.log('model loaded');
}
function draw(){
    image(video,0,0,600,500);
    fill("red")
    stroke("red")
    if(leftWristscore>0.2){
        circle(leftwrist_x,leftwrist_y,20)
        leftwrist_y_num = Number(leftwrist_y);
        remove_decimals = floor(leftwrist_y_num)
        volume = remove_decimals/500
        document.getElementById("volume").innerHTML = "volume = "+volume;
        song.setVolume(volume)
    }
    if(rightWristscore>0.2){
        circle(rightwrist_x,rightwrist_y,20)

        if(rightwrist_y > 0 && rightwrist_y <= 100){
            document.getElementById("speed").innerHTML = "speed = 0.5X"
            song.rate(0.5);
        }
        else if(rightwrist_y > 100 && rightwrist_y <= 200){
            document.getElementById("speed").innerHTML = "speed = 1X"
            song.rate(1);
        }
        else if(rightwrist_y > 200 && rightwrist_y <= 300){
            document.getElementById("speed").innerHTML = "speed = 1.5X"
            song.rate(1.5);
        }
        else if(rightwrist_y > 300 && rightwrist_y <= 400){
            document.getElementById("speed").innerHTML = "speed = 2X"
            song.rate(2);
        }
        else if(rightwrist_y > 400){
            document.getElementById("speed").innerHTML = "speed = 2.5X"
            song.rate(2.5);
        }
    }
}
function preload(){
  song = loadSound("music.mp3");  
}
function play(){
    song.play();
    song.setVolume(1)
    song.rate(1)
}
function stop(){
    song.stop();
}