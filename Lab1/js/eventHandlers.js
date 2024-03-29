function onResize() {
	'use strict';

	renderer.setSize(window.innerWidth, window.innerHeight);
	if (window.innerHeight > 0 && window.innerWidth > 0) {
		camera.aspect = renderer.getSize().width / renderer.getSize().height;
		camera.updateProjectionMatrix();
	}
}

function onKeyDown(e) {
	'use strict';

	switch(e.keyCode) {
	case 65: //A
	case 97: //a
		scene.traverse(function (node) {
			if (node instanceof THREE.Mesh) {
				node.material.wireframe = !node.material.wireframe;
			}
		});
		break;

	case 83: //S
	case 115: //s
		ball.userData.jumping = !ball.userData.jumping;
		break;
	}
}
