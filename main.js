song = ""
leftWrist_x = 0;
leftWrist_y = 0;

rightWrist_x = 0;
rightWrist_y = 0;
score_leftWrist = 0;
score_rightWrist = 0;
song_2 = " ";
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video,moldLoaded);
poseNet.on("pose",gotPose);
}

function draw(){
image(video,0,0,600,500);

fill("#ff0000")
stroke("#ff0000")
song1_status = song.isPlaying();
song2_status = song_2.isPlaying();
if(score_leftWrist > 0.02){
circle(leftWrist_x,leftWrist_y,20);
song.stop();
if (song2_status == false){
    song_2.play();
    document.getElementById("song").innerHTML = "Playing Harry potter song.";
}
}

if(score_rightWrist > 0.002){
    circle(rightWrist_x,rightWrist_y,20);
    song_2.stop();
    if (song1_status == false){
        song.play();
        document.getElementById("song").innerHTML = "Playing Peter Pan song.";
    }
}
}

function preload(){
song  = loadSound("music.mp3");
song_2 = loadSound("music2.mp3");
}
function moldLoaded(){
console.log("Model is loaded");
}

function gotPose(results){
if (results.length>0){
    console.log(results);
    
    score_leftWrist = results[0].pose.keypoints[9].score;
    score_rightWrist = results[0].pose.keypoints[10].score;
    console.log("Score of left Wrist: " + score_leftWrist + "Score of Rigth Wrist: " + score_rightWrist);
   
    leftWrist_x = results[0].pose.leftWrist.x;
    leftWrist_y = results[0].pose.leftWrist.y;
    console.log("leftWrist X: " + leftWrist_x + "leftWrist Y: " + leftWrist_y);

    rightWrist_x = results[0].pose.rightWrist.x;
    rightWrist_y = results[0].pose.rightWrist.y;
    console.log("rightWrist X: " + rightWrist_x + "rightWrist Y: " + rightWrist_y);
}
}
