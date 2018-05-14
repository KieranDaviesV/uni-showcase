/**
 * Created by c1542273 on 12/02/2018.
 */

import React, {Component} from 'react';
import {signal} from './signalling';
import {chosenTankIpAddress} from './../../../../utils/socketEvents.js';
import {sendHit} from '../../../../utils/socketEvents.js';
import {sendPoints} from '../../../../utils/socketEvents.js';
import { gameHitAccuracy } from '../../../GamePlayActions/GameActions.js';
import { gameHitsGiven } from '../../../GamePlayActions/GameActions.js';
import { AvailableAmmoChange } from '../../../GamePlayActions/GunActions.js';
import gameStore from '../../../GamePlayStore/GameStore.js'
import gunStore from '../../../GamePlayStore/GunStore.js'
import {gamePoints} from '../../../GamePlayActions/GameActions';
import {gameShotsFired} from '../../../GamePlayActions/GameActions';
import {CurrentAmmoChange} from '../../../GamePlayActions/GunActions';
import {BounceLoader} from 'react-spinners';

// Qr reading library source: https://www.npmjs.com/package/jsqr
const jsQR = require('jsqr');

let videoStyle = 'videoStream';

class Video extends Component {
	constructor(props) {
		super();
		this.state = {
			isStreaming: false,
			signalObj: null,
						// address: 'ws://192.168.1.250:80/webrtc',
			// address: 'ws://192.168.0.60:80/webrtc',      	//RD home
			// address: 'ws://10.247.21.108:80/webrtc',     //RD UNI
			// address: 'ws://10.156.12.93:80/webrtc',      //RD UNI - 2
			// address: 'ws://192.168.0.60:80/webrtc',      	//RD home
			// address: 'ws://192.168.0.60:80/webrtc',      	//RD home
			address: `ws://${chosenTankIpAddress}:80/webrtc`,      	//RD home
			// address: 'ws://' + {chosenTankIpAddress} + ':80/webrtc',
     		// address: 'ws://10.10.10.44:80/webrtc',
      		//address: 'ws://10.10.10.44:80/webrtc',
			isDetecting: false,
			distance: 0,
			videoVisibility: true,
			isFireDisabled: false,
			spaceKeyCode: 32,
			loading: true
		};
		console.log("bob: ", this.state.address);
		this.startStream = this.handleStart.bind(this);
		this.stopStream = this.handleStop.bind(this);
		this.canPlayVid = this.videoCanPlay.bind(this);
		this.fire = this.videoAnalysis.bind(this);
	}
	componentDidMount(){
		this.handleStart();
	}
	componentWillUnmount(){
		if(!this.state.loading || this.state.isStreaming){
			this.handleStop();
		}
	}
	//handles the start of video stream
	handleStart = () => {
		if (!this.state.isStreaming) {
			let self = this;
			let videoRef = this.refs.videoRef;
			console.log(videoRef);
			let canvasRef = this.refs.canvasRef;
			this.setState({videoVisibility: true});
			//sets the signal as a state so you can call that specific signal
			// means you can run the callbacks
			this.setState({
				signalObj: new signal(this.state.address,
					function (stream) {
						//sends back the stream to the client
						console.log('Stream recieved');

						videoRef.srcObject = stream;
						let playing = videoRef.play();
						if (playing !== undefined) {
							playing.then(_ => {
								console.log('video started');
								self.setState({
									loading: false,
									isStreaming: true
								})
							})
								.catch(error => {
									console.log(error);
								});
						}
					}, function (error) {
						//sends back any erors to the client
						alert(error);
					}, function () {
						//closes the webscoket
						console.log('websocket closed');
						if(videoRef == undefined){
							return;
						}
						if (!videoRef.srcObject == null) {
							videoRef.srcObject = null;
							console.log('Cleared video source');
						}
						let ctx = canvasRef.getContext('2d');
						ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
						self.setState({isStreaming: false});
					}, function (message) {
						alert(message);
					},
				),
			});

		}
	};

	// stops the stream by hanging up the websocket connection
	handleStop = () => {
		// Hide video on stop
		this.setState({videoVisibility: false});
		console.log(this.state.signalObj);
		if (this.state.signalObj) {
			this.state.signalObj.hangup();
			this.setState({signalObj: null});
			this.setState(prevState => {
				return {count: prevState.hitCount = 0};
			});
		}
	};

	//checks if the stream can play and sets the stream to true if it can
	videoCanPlay = () => {
		let canvasRef = this.refs.canvasRef;
		console.log('Video available');
		if (!this.state.isStreaming) {
			canvasRef.setAttribute('width', this.refs.videoRef.videoWidth);
			canvasRef.setAttribute('height', this.refs.videoRef.videoHeight);
			this.videoBufferCheck();
			this.setState({isStreaming: true});
		}
	};

	greyscaleImage = (data) => {
		// Code to make the image greyscaled from https://www.html5canvastutorials.com/advanced/html5-canvas-grayscale-image-colors-tutorial/
		// Loop to turn the image into greyscale pixel by pixel
		for (let i = 0; i < data.length; i += 4) {
			let brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
			// Red
			data[i] = brightness;
			// Green
			data[i + 1] = brightness;
			// Blue
			data[i + 2] = brightness;
		}
	};

	findCodeSize = (imageHeight, objectHeight) => {
		// Equation for finding size of code based on height comes from https://photo.stackexchange.com/questions/12434/how-do-i-calculate-the-distance-of-an-object-in-a-photo
		// Focal length of Raspicam V2 in Millimetres
		let focalLength = 3.04;
		// Height of the actual QR code in Millimetres needs to be changed on final printed codes
		let realHeight = 55;
		// Sensor height of Raspicam V2 in Millimetres
		let sensorHeight = 2.76;

		// As well as FocalLength, RealHeight, and SensorHeight distance also takes in the height of the printed canvas and the height of the QR code on the canvas
		let distance = (focalLength * realHeight * imageHeight) / (objectHeight * sensorHeight);

		// console.log("Distance = ", distance);

		// Distance is returned in Millimetres.
		return distance;
	};

	lineLength = (topLeftPoint, bottomLeftPoint) => {
		// Simple function using Pythag to get the length of a line
		let x = bottomLeftPoint.x - topLeftPoint.x;
		let xOutcome = x * x;

		let y = bottomLeftPoint.y - topLeftPoint.y;
		let yOutcome = y * y;

		return Math.sqrt(xOutcome + yOutcome);
	};

	accuracy = () => {
		let hitAccuracy = '0';
		if(hitAccuracy < 100) {
			hitAccuracy = Math.round(gameStore.getGame().gameHitsGiven / gameStore.getGame().gameShotsFired * 100);
		}
		gameHitAccuracy(hitAccuracy);
		// return hitAccuracy;
	};

	scorePoints = () => {
		let oldPoints = gameStore.getGame().gamePoints;
		let newPoints = oldPoints + 10;
		gamePoints(newPoints);
		sendPoints(newPoints)
	};

	hitGiven = () => {
		let oldHitsGiven = gameStore.getGame().gameHitsGiven;
		let newHitsGiven = oldHitsGiven + 1;
		gameHitsGiven(newHitsGiven);
	};

	shotFired = () => {
		let oldShotsFired = gameStore.getGame().gameShotsFired;
		let newShotsFired = oldShotsFired + 1;

		gameShotsFired(newShotsFired);
		console.log(oldShotsFired);
	};

	ammoChange = () => {
		let oldAvailableAmmo = gunStore.getAvailableAmmo() ;
		if(oldAvailableAmmo === 0){
			this.setState({
				isFireDisabled: true,
				spaceKeyCode: null
			});
			setTimeout(function(){
				this.setState({
					isFireDisabled: false,
					spaceKeyCode: 32
				},function(){
					let currentAmmo = gunStore.getAmmo();
					if(currentAmmo >= 1) {
						AvailableAmmoChange(+ gunStore.getStandardAvailableAmmo());
						CurrentAmmoChange(currentAmmo - gunStore.getStandardAvailableAmmo())
					}
					else if(currentAmmo === 0 ){
						this.setState({isFireDisabled: true});
						alert('Change Weapons');
					}
				});
			}.bind(this), gunStore.getGunReloadTime());
		} else{
			AvailableAmmoChange(oldAvailableAmmo - gunStore.getGunRoundBurst());
		}
	};



	//the method to run image analysis
	// change  the if(isDetecting) to do the image detection
	videoAnalysis = () => {
		if (this.state.isStreaming) {
			let videoRef = this.refs.videoRef;
			let canvasRef = this.refs.canvasRef;
			let ctx = canvasRef.getContext('2d');
			let width = this.refs.videoRef.videoWidth;
			let height = this.refs.videoRef.videoHeight;
			ctx.imageSmoothingEnabled = false;
			// Resets the Distance on the page to 0 so that the distance of the object can be added when a code is detected.
			this.setState(prevState => {
				return {distance: prevState.distance = 0,
				};
			});
			this.ammoChange();
			this.shotFired();
			console.log('FIRING!!');


			for (let i = 0; i < gunStore.getGunRoundBurst(); i++) {
				// Draw the initial video snapshot on the page in a canvas
				ctx.drawImage(videoRef, 0, 0);

				// Retrieving the image data from the canvas
				let imageData = ctx.getImageData(0, 0, width, height);
				let data = imageData.data;

				const code = jsQR(data, width, height);

				// Converting the image to greyscale
				this.greyscaleImage(data);

				// Redrawing the image on the canvas after the greyscaling has taken place
				ctx.putImageData(imageData, 0, 0);

				// If statement only runs if a QR code is detected.
				if (code) {
					let codeHeight = this.lineLength(code.location.topLeftCorner, code.location.bottomLeftCorner);
					this.findCodeSize(height, codeHeight);
					let distanceToTarget = Math.round(this.findCodeSize(height, codeHeight));
					// let oldPoints = gameStore.getGame().gamePoints;
					// let newPoints = oldPoints + 1;
					this.scorePoints();
					this.hitGiven();

					// If a code is detected a Square is drawn around the code based on the location of the codes corners.
					ctx.lineWidth = 5;
					ctx.beginPath();
					ctx.moveTo(code.location.topLeftCorner.x, code.location.topLeftCorner.y);
					ctx.lineTo(code.location.bottomLeftCorner.x, code.location.bottomLeftCorner.y);
					ctx.lineTo(code.location.bottomRightCorner.x, code.location.bottomRightCorner.y);
					ctx.lineTo(code.location.topRightCorner.x, code.location.topRightCorner.y);
					ctx.lineTo(code.location.topLeftCorner.x, code.location.topLeftCorner.y);
					ctx.stroke();
					ctx.font = '20px Arial';
					ctx.fillText('Distance to target = ' + distanceToTarget, code.location.topLeftCorner.x - 50, code.location.topLeftCorner.y);
					console.log('Code Found = ', code.data);
					sendHit(code.data, this.scorePoints());

					// Sets the hit counter to plus 1 when a code is found within the page
					this.setState(prevState => {
						return {
							distance: prevState.distance + distanceToTarget,
							// count: prevState.hitCount + 1
						};
					});
					break;
				} else {
					console.log('Target not found');
				}
			}
			this.accuracy();

	};

}




	// buffer AI ;)
		// will check if the streams behind on the buffer and restart the stream
		videoBufferCheck = () => {
			let checkInterval = 100;
			let lastPlayPos = 0;
			let currentPlayPo = 0;
			let bufferingDetect = false;
			let videoRef = this.refs.videoRef;
			let offset = 0;
			let self = this;

			if (videoRef.paused || videoRef.ended ||
				videoRef.srcObject == null || !this.state.isStreaming ||
				this.state.signalObj == null) {
				return;
			}
			setInterval(function () {
				currentPlayPo = videoRef.currentTime;
				offset = (checkInterval - 20) / 1000;
				console.log(offset);
				if (!bufferingDetect
					&& currentPlayPo < (lastPlayPos + offset)
					&& !videoRef.paused) {

					console.log('buffering');
					if (self.state.signalObj == null) {
						clearInterval();
					}
					self.state.signalObj.hangup();
					self.setState({signalObj: null});
					bufferingDetect = true;
				}

				if (bufferingDetect
					&& currentPlayPo > (lastPlayPos + offset)
					&& !videoRef.paused
				) {
					console.log('NOt buffering');
					if (self.state.signalObj == null) {
						self.setState({isStreaming: false});
						self.startStream();
						bufferingDetect = false;
						clearInterval();
					}
					bufferingDetect = false;

				}

				lastPlayPos = currentPlayPo;
			}, 33);
		};


			// On click of stream stop button, change the className of the video to show/hide it
			startStopStream = () => {
				videoStyle =
					this.state.videoVisibility ? 'videoStream' : 'videoStreamDead';
				this.forceUpdate();
			};


			keyPressed = (event) => {
				if (this.state.signalObj) {
					this.state.signalObj.sendKeyStroke(event.keyCode);
					if (event.keyCode === this.state.spaceKeyCode) {
						this.fire();
					}
				} else {
					console.log('Stream has to be started for gameplay');
				}
			};


			// On click of stream stop button, change the className of the video to show/hide it
			startStopStream = () => {
				videoStyle =
					this.state.videoVisibility ? 'videoStream' : 'videoStreamDead';
				this.forceUpdate();
			};


	render()
	{
		// if(!this.state.isStreaming){
		// 	this.startStream();
		// }
		return (
			<div className="videoStream" onKeyDown={this.keyPressed} tabIndex="0">

				<div>
					<button className="streamButton streamButtonStart"
							onClick={this.startStream}>Start Stream
					</button>
					<button className="streamButton fireButton"
							disabled={this.state.isFireDisabled}
							onClick={this.fire}>!!! FIRE !!!

					</button>
					<button className="streamButton streamButtonStop"
							onClick={this.stopStream}>Stop Stream
					</button>
				</div>

				{/*Viewable stream*/}
				<video
					className={videoStyle}
					ref="videoRef"
					onCanPlay={this.canPlayVid}
					onPlay={this.startStopStream}
					onEnded={this.startStopStream}
				>
				</video>

				{/*Canvas for Object Detection*/}
				<canvas className="canvas"
						ref="canvasRef">
				</canvas>

				{/*Ranging displays range to target in mm*/}
				<div className="rangingContainer">
					<div className='sweet-loading'>
						<BounceLoader
							color={'#ff0000'}
							loading={this.state.loading}/>
					</div>
					<p className="rangingDistance">
						Range: {this.state.distance}mm
					</p>
				</div>
			</div>
		);
	}

}

export default Video;
