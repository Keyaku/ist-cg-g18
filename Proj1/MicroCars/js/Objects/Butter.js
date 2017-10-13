class Butter {
	constructor(name=undefined, x=0, y=0, z=0, angle=undefined) {
		var mesh = new THREE.Object3D();
		if (name == undefined) {
			name = "Butter" + mesh.uuid;
		}
		mesh.name = name;
		// FIXME: Apply different textures to different sides
		var tex = RemoteTextures.load('https://i.imgur.com/KKvp36A.png');
		var material = new THREE.MeshBasicMaterial({ map: tex });

		var pos = new THREE.Vector3(0, 0, 0)
		var size = new THREE.Vector3(7, 10, 20);
		new ButterBox(mesh, material, pos, size);

		// Places it in a given position
		mesh.position.set(x, y, z);
		if (angle == undefined) {
			angle = Math.random() + 360 * TO_RADIANS;
		}
		mesh.rotateY(angle);
		scene.add(mesh);
		return mesh;
	}
}

class ButterBox {
	constructor(obj, material, pos, size) {
		var geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.copy(pos);

		obj.add(mesh);
		return mesh;
	}
}
