import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Options, ChangeContext } from 'ng5-slider';
import * as posenet from '@tensorflow-models/posenet';

@Component({
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

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
  imgIndex = 2;

  public async ngOnInit() {
    this.model = await posenet.load();
    this.modelLoaded = true;
    setTimeout(() => {
      this.setSliderConfig();
    }, 1000);
    this.videoMode();
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
        console.log(this.singlePose[0]);
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
