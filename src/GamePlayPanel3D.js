import GLB from 'GLB.js';
import Block from 'Block.js';
import Pool from 'Pool.js';
import Case from 'Case.js';

export default function GamePlayPanel3D(s){
	this.__proto__=new THREE.Group();

	this.MyAPI={};
	let cs=[];
	let ground;

	this.MyAPI.render=function(){
		for(let i=0;i<cs.length;i++){
			cs[i].MyAPI.render.bind(cs[i])();
		}
	}

	this.MyAPI.levelStart=function(){
		let geo=new THREE.PlaneGeometry(10,10,1,1);
		let mat=new THREE.MeshLambertMaterial({color:0x00ff00});
		mat.side=THREE.DoubleSide;
		ground=new THREE.Mesh(geo,mat);
		this.add(ground);
		ground.rotation.set(Math.PI*3/2,0,0);
		ground.receiveShadow=true;


		cs[0]=new Case();
		this.add(cs[0])
		cs[0].MyAPI.setPos.bind(cs[0])({x:0.1,y:0,z:0.1});
		cs[0].MyAPI.set.bind(cs[0])([
			[0,0],
			[0,1]
		]);

		cs[1]=new Case();
		this.add(cs[1]);
		cs[1].MyAPI.setPos.bind(cs[1])({x:-2.1,y:0,z:0.1});
		cs[1].MyAPI.set.bind(cs[1])([
			[0,1],
			[0,0]
		]);

		cs[0].MyAPI.startRotate.bind(cs[0])();

	}







}