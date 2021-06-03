import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Options, ChangeContext } from 'ng5-slider';
import * as posenet from '@tensorflow-models/posenet';
import pose1 from 'src/assets/pose1.json';
import pose2 from 'src/assets/pose2.json';
import pose3 from 'src/assets/pose3.json';
import { ThrowStmt } from '@angular/compiler';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {

  constructor() { }

  public architecture: any = 'ResNet50';
  public multiplier: any = 1.00;
  public outputStride: any = 8;
  public inputResolution: any = 257;
  public quantBytes: any = 2;
  public pose: string = 'single-person';
  public singlePose: any;
  public multiplePose: any;
  public flipHorizontal: any = false;
  public drawKeypoints: any = true;
  public drawSkeleton: any = true;
  public drawBoundingBox: any = false;
  public scoreThresholdOptions: Options = {
    floor: 0.0,
    ceil: 1,
    step: 0.1,
    showSelectionBar: true
  };
  public scoreThreshold: any = 0.5;
  public nmsRadiusOptions: Options = {
    floor: 1,
    ceil: 50,
    step: 1,
    showSelectionBar: true
  };
  public nmsRadius: any = 20;
  public model: any;
  public modelLoaded: boolean = false;
  public title: string = 'Tập luyện tự do';
  public modelText: string = 'Select Model';
  public imgBtnStatus: boolean = true;
  public webBtnStatus: boolean = false;
  public imageElement: any;
  public imageSrc: any = 'assets/white.jpg';
  public imageWidth: number = 410;
  public imageHeight: number = 310;
  @ViewChild('videoElement', {static: false}) videoElement: ElementRef;
  public video: any;
  public videoWidth: number = 410;
  public videoHeight: number = 310;
  public videoStream: any;
  public canvas: any;
  public canvasWidth: number = 400;
  public canvasHeight: number = 300;
  public canvasContext: any;
  @ViewChild("videoCanvas", {static: false}) videoCanvas: ElementRef;
  public maxPoseDetections: any = 5;
  public fileName: string = 'No File Chosen';
  public fileError: boolean = false;
  public animationFrame: any;
  public videoPic: any = false;
  public snapData: any;
  public videoCanvasEnable: boolean = true;

  imgSrcLists = ['assets/pose1.jpg', 'assets/pose2.jpg', 'assets/pose3.jpg'];
  imgIndex = 0;
  poses = []

  leftArm: boolean = false;
  rightArm: boolean = false;
  leftLeg: boolean = false;
  rightLeg: boolean = false;
  upLeftArm: boolean = false;
  upRightArm: boolean = false;
  upLeftLeg: boolean = false;
  upRightLeg: boolean = false;
  leanRight: boolean = false;
  leanLeft: boolean = false;

  public async ngOnInit() {
    this.model = await posenet.load();
    this.modelLoaded = true;
    this.loadPose();
    setTimeout(() => {
      this.setSliderConfig();
    }, 1000);
    this.videoMode();
  }

  public getPose(pose) {
    return {
      leftArm: this.angle(
        pose[5].position.x, pose[5].position.y,
        pose[7].position.x, pose[7].position.y,
        pose[9].position.x, pose[9].position.y),
      rightArm: this.angle(
        pose[6].position.x, pose[6].position.y,
        pose[8].position.x, pose[8].position.y,
        pose[10].position.x, pose[10].position.y),
      leftLeg: this.angle(
        pose[11].position.x, pose[11].position.y,
        pose[13].position.x, pose[13].position.y,
        pose[15].position.x, pose[15].position.y),
      rightLeg: this.angle(
        pose[12].position.x, pose[12].position.y,
        pose[14].position.x, pose[14].position.y,
        pose[16].position.x, pose[16].position.y),
      upLeftArm: this.angle(
        pose[11].position.x, pose[11].position.y,
        pose[5].position.x, pose[5].position.y,
        pose[7].position.x, pose[7].position.y),
      upRightArm: this.angle(
        pose[12].position.x, pose[12].position.y,
        pose[6].position.x, pose[6].position.y,
        pose[8].position.x, pose[8].position.y),
      upLeftLeg: this.angle(
        pose[12].position.x, pose[12].position.y,
        pose[11].position.x, pose[11].position.y,
        pose[13].position.x, pose[13].position.y),
      upRightLeg: this.angle(
        pose[11].position.x, pose[11].position.y,
        pose[12].position.x, pose[12].position.y,
        pose[14].position.x, pose[14].position.y),
      leanLeft: this.angle(
        pose[11].position.x, pose[11].position.y,
        pose[12].position.x, pose[12].position.y,
        pose[6].position.x, pose[6].position.y),
      leanRight: this.angle(
        pose[12].position.x, pose[12].position.y,
        pose[11].position.x, pose[11].position.y,
        pose[5].position.x, pose[5].position.y)
    }
  }

  public loadPose() {
    console.log(pose1)
    this.poses.push(this.getPose(pose1));
    this.poses.push(this.getPose(pose2));
    this.poses.push(this.getPose(pose3));
    console.log(this.poses);
  }

  public angle(xa, ya, xb, yb, xc, yc) {
    let ab = this.length(xa, ya, xb, yb);
    let bc = this.length(xb, yb, xc, yc);
    let ac = this.length(xa, ya, xc, yc);
    let temp = (ab * ab + bc * bc - ac * ac) / (2 * ab * bc)
    return Math.acos(temp) / Math.PI * 180
  }

  public length(point1_x, point1_y, point2_x, point2_y) {
    return Math.sqrt((point1_x - point2_x) * (point1_x - point2_x) + (point1_y - point2_y) * (point1_y - point2_y))
  }

  public videoMode() {
    if (this.imgBtnStatus) {
      cancelAnimationFrame(this.animationFrame);
      this.videoCanvasEnable = true;
      this.fileName = 'No File Chosen';
      this.webBtnStatus = true;
      this.imgBtnStatus = false;
      this.snapData = null;
      this.video = this.videoElement.nativeElement;
      this.initCamera({ video: true, audio: false });
      this.canvas = document.getElementById("canvas");
      this.canvasContext = this.canvas.getContext("2d");
      this.canvasContext.clearRect(0, 0, 400, 300);
      
    }
  }

  public initCamera(config:any) {
    let browser = <any>navigator;
    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);
    browser.mediaDevices.getUserMedia(config).then((stream: any) => {
      if(!stream.stop && stream.getTracks) {
        stream.stop = function(){
          this.getTracks().forEach(function (track: any) {
            track.stop();
          });
        };
      }
      this.videoStream = stream;
      try {
        this.video.srcObject = this.videoStream;
      } catch(err) {
        this.video.src = window.URL.createObjectURL(this.videoStream);
      }
      this.video.play();
    });
  }

  public stopVideo() {
    this.videoStream.stop();
  }

  public setSliderConfig() {
    this.scoreThresholdOptions = {
      floor: 0.0,
      ceil: 1,
      step: 0.1,
      showSelectionBar: true
    };
    this.scoreThreshold = this.scoreThreshold;
    this.nmsRadiusOptions = {
      floor: 1,
      ceil: 50,
      step: 1,
      showSelectionBar: true
    };
    this.nmsRadius = this.nmsRadius;
  }

  public async realTimeVideo() {
    this.imageSrc = this.imgSrcLists[this.imgIndex];
    this.videoPic = false;
    if (this.videoCanvasEnable) {
      if (this.pose === 'single-person') {
        this.singlePose = await this.model.estimatePoses(this.video, {
          flipHorizontal: this.flipHorizontal,
          decodingMethod: 'single-person'
        });
        console.log(this.singlePose)
        this.calculateAndUpdate(this.singlePose[0].keypoints);
        this.renderSinglePoseResult();
      }
      this.animationFrame = requestAnimationFrame(() => {
        this.realTimeVideo();
      });
    }
  }

  public async loadModel() {
    this.canvas = document.getElementById("canvas");
    this.canvasContext = this.canvas.getContext("2d");
    this.canvasContext.clearRect(0, 0, 400, 300);
    let outputStride: any = parseInt(this.outputStride);
    let inputResolution: any = parseInt(this.inputResolution);
    let multiplier: any = parseFloat(this.multiplier);
    let quantBytes: any = parseInt(this.quantBytes);
    if (this.modelText === 'MobileNet V1') {
      this.modelLoaded = false;
      this.model = await posenet.load({
        architecture: 'MobileNetV1',
        outputStride: outputStride,
        inputResolution: inputResolution,
        multiplier: multiplier
      });
      this.modelLoaded = true;
      setTimeout(() => {
        this.setSliderConfig();
        if (this.pose === 'single-person') {
          this.estimatePose();
        }
      }, 1000);
    } else if (this.modelText === 'ResNet 50') {
      this.modelLoaded = false;
      this.model = await posenet.load({
        architecture: 'ResNet50',
        outputStride: outputStride,
        inputResolution: inputResolution,
        quantBytes: quantBytes
      });
      this.modelLoaded = true;
      setTimeout(() => {
        this.setSliderConfig();
        if (this.pose === 'single-person') {
          this.estimatePose();
        }
      }, 1000);
    }
  }

  public estimate() {
    if (this.pose === 'single-person') {
      this.estimatePose();
    }
  }

  public async estimatePose() {
    this.imageElement = await document.getElementById('image');
    this.singlePose = await this.model.estimatePoses(this.imageElement, {
      flipHorizontal: this.flipHorizontal,
      decodingMethod: 'single-person'
    });
    this.canvas = document.getElementById("canvas");
    this.canvasContext = this.canvas.getContext("2d");
    this.canvasContext.clearRect(0, 0, 400, 300);
    this.canvasContext.drawImage(this.imageElement, 0, 0, 400, 300);
    this.drawSinglePoseResult();
  }

  public calculateAndUpdate(curPose) {
    let curAngle = this.getPose(curPose);
    if (Math.abs(curAngle.leanLeft - this.poses[this.imgIndex].leanLeft) > 20) {
      this.leanLeft = true;
    }
    else {
      this.leanLeft = false;
    }
    if (Math.abs(curAngle.leanRight - this.poses[this.imgIndex].leanRight) > 20) {
      this.leanRight = true;
    }
    else {
      this.leanRight = false;
    }
    if (Math.abs(curAngle.leftArm - this.poses[this.imgIndex].leftArm) > 20) {
      this.leftArm = true;
    }
    else {
      this.leftArm = false;
    }
    if (Math.abs(curAngle.rightArm - this.poses[this.imgIndex].rightArm) > 20) {
      this.rightArm = true;
    }
    else {
      this.rightArm = false;
    }
    if (Math.abs(curAngle.leftLeg - this.poses[this.imgIndex].leftLeg) > 20) {
      this.leftLeg = true;
    }
    else {
      this.leftLeg = false;
    }
    if (Math.abs(curAngle.upLeftArm - this.poses[this.imgIndex].upLeftArm) > 20) {
      this.upLeftArm = true;
    }
    else {
      this.upLeftArm = false;
    }
    if (Math.abs(curAngle.upRightArm - this.poses[this.imgIndex].upRightArm) > 20) {
      this.upRightArm = true;
    }
    else {
      this.upRightArm = false;
    }
    if (Math.abs(curAngle.upLeftLeg - this.poses[this.imgIndex].upLeftLeg) > 20) {
      this.upLeftLeg = true;
    }
    else {
      this.upLeftLeg = false;
    }
    if (Math.abs(curAngle.upRightLeg - this.poses[this.imgIndex].upRightLeg) > 20) {
      this.upRightLeg = true;
    }
    else {
      this.upRightLeg = false;
    }
    if (Math.abs(curAngle.rightLeg - this.poses[this.imgIndex].rightLeg) > 20) {
      this.rightLeg = true;
    }
    else {
      this.rightLeg = false;
    }
    if (!this.leanLeft && !this.leanLeft && !this.leftArm && !this.rightArm &&
        !this.leftLeg && !this.rightLeg && !this.upLeftArm && !this.upRightArm &&
        !this.upLeftLeg && !this.upRightLeg) {
          this.imgIndex++;
          if (this.imgIndex == 3) {
            Swal.fire({
              title: 'Đã hoàn thành bài tập',
              confirmButtonText: `OK`,
              icon: 'info'
            }).then((result) => {
              location.reload();
            })
          }
          else {
            this.imageSrc = this.imgSrcLists[this.imgIndex];
          }
        }
  }

  public async drawSinglePoseResult() {
    if (this.drawKeypoints) {
      this.singlePose[0]['keypoints'].forEach((points: any) => {
        this.canvasContext.beginPath();
        this.canvasContext.fillStyle = 'aqua';
        this.canvasContext.arc(points['position']['x'], points['position']['y'], 3, 0, Math.PI*2, true);
        this.canvasContext.closePath();
        this.canvasContext.fill();
      });
    }
    if (this.drawSkeleton) {
      let adjacentKeyPoints = await posenet.getAdjacentKeyPoints(this.singlePose[0]['keypoints'], 0.5);
      for(let i = 0; i < adjacentKeyPoints.length; i++) {
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(adjacentKeyPoints[i][0]['position']['x'], adjacentKeyPoints[i][0]['position']['y']);
        this.canvasContext.lineTo(adjacentKeyPoints[i][1]['position']['x'], adjacentKeyPoints[i][1]['position']['y']);
        this.canvasContext.lineWidth = 2;
        this.canvasContext.strokeStyle = 'aqua';
        this.canvasContext.stroke();
      }
    }
    if(this.drawBoundingBox) {
      let boundingBox = posenet.getBoundingBox(this.singlePose[0]['keypoints']);
      this.canvasContext.beginPath();
      this.canvasContext.strokeStyle = 'red';
      this.canvasContext.rect(boundingBox.minX, boundingBox.minY, boundingBox.maxX - boundingBox.minX, boundingBox.maxY - boundingBox.minY);
      this.canvasContext.stroke();
    }
  }

  public async renderSinglePoseResult() {
    try {
      this.canvas = document.getElementById("videoCanvas");
      this.canvasContext = this.canvas.getContext("2d");
      this.canvasContext.drawImage(this.videoElement.nativeElement, 0, 0, this.canvasWidth, this.canvasHeight);
      this.drawSinglePoseResult();
    } catch(e) { }
  }

}
