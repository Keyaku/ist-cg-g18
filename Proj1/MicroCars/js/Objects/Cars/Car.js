class Car extends MotionBody {
	constructor(x=0, y=0, z=0) {
		super();
		this.type = 'Car';

		// Creating mesh
		this.mesh = new CarMesh();
		this.add(this.mesh);

		// Creating Bounds
		this.bounds = new BoundingSphere(this.mesh);

		/* FIXME: hacked our way through a BoundingSphere for our car */
		var vertices = this.mesh.children[0].geometry.vertices
		var min = new THREE.Vector3(0, 0, 0);
		var max = new THREE.Vector3(0, 0, 0);
		for (var i = 0; i < vertices.length; i++) {
			var v = vertices[i];
			min.min(v);
			max.max(v);
		}
		var radius = 0.6 * Math.max((max.x-min.x), (max.y-min.y), (max.z-min.z))

		var center = max.clone();
		center.sub(min);
		center.divideScalar(2);
		center.multiplyScalar(0.5);

		this.bounds.updateBounds(radius, center);
		/* FIXME: attempt to remove the code above later */

		this.add(this.bounds);

		// Adding our own data
		this.velocity = 0;
		this.forwardAcceleration = CAR_ACCELERATION;

		// Positioning the car
		this.position.set(x, y, z);

		// Adding to scene graph
		scene.add(this);
	}

	update(delta) {
		var left  = Input.is_pressed("ArrowLeft");
		var right = Input.is_pressed("ArrowRight");
		var up    = Input.is_pressed("ArrowUp");
		var down  = Input.is_pressed("ArrowDown");

		var acceleration = 0;
		if (up && !down) {
			acceleration = -this.forwardAcceleration;
		} else if (down && !up) {
			acceleration = this.forwardAcceleration;
		}

		// Updating car motion
		this.velocity += acceleration * delta - FRICTION * this.velocity;
		this.move(X_AXIS_HEADING, this.velocity);

		//Rotates the mesh
		var angle = 0;
		if (left && !right) {
			angle = WHEEL_ROTATION;
		}
		if (right && !left) {
			angle = -WHEEL_ROTATION;
		}
		if (angle != 0) {
			angle *= Math.abs(this.velocity) * TURN_ASSIST;
			this.rotateY(angle);
		}
	}

	move(axis, distance) {
		// TODO: Proper motion with Vector3 that points to the next location?
		var colliding = super.move(axis, distance);
		this.translateOnAxis(axis, distance);
		return colliding;
	}
}
