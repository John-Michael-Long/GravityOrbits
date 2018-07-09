import React from 'react';

class Planet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x_value: 0,
      y_value: 0,
      z_value: 0,
      mass: 10,
      x_vel: 0,
      y_vel: 0,
      z_vel: 0
    };
  }

  render() {
   // console.log('PROPS:',this.props)
    const positionStyle = {
      left: this.props.planetProps.x_position,
      top: this.props.planetProps.y_position
    }
    return (
      <div className="planet" style={positionStyle}>
      <div>Mass:{this.props.planetProps.mass}</div>
      <div>Z:{this.props.planetProps.z_position}</div>
      </div>
    );
  }
}

export default Planet;

//{top: this.positionY, left: this.positionX}

// function calculateDistance() {
//   let x_dist = Math.abs(this.state.x_value - 10);
//   let y_dist = Math.abs(this.state.y_value - 10);
//   let z_dist = Math.abs(this.state.y_value - 10);

//   let r_dist = Math.sqrt(x_dist * x_dist + y_dist * y_dist + z_dist * z_dist);

//   return r_dist;
// }

// function calculateForce() {
//   let mass1 = this.state.mass;
//   let mass2 = 10;
//   let g = 1;
//   let r = calculateDistance();

//   let force = g * mass1 * mass2 / (r_dist * r_dist)

//   return force;
// }

// p = mv 
// v_f = v_i + F_net * detla_t / m

// r_f = r_i + (v_i - v_f) / 2 * (t_f - t_i)

// acceleration = force / mass;
// position += timestep * velocity;
// velocity += timestep * acceleration;

//F_net = g * mass1 * mass2 / (r*r)

// p_1 = mass * v0
// time += timestep;
// p_2 = p_1 + F_net * delta_t
// r_2 = r_1 + (p_2/mass) * delta_t





// position += timestep * (velocity + timestep * acceleration / 2);
// velocity += timestep * acceleration;
// newAcceleration = force(time, position, velocity) / mass;
// velocity += timestep * (newAcceleration - acceleration) / 2;


// // Adapted from Dan Shiffman, natureofcode.com

// // Attractor: An object type for a draggable attractive body in our world
// var Attractor = function() {
//     this.position = new PVector(width/2, height/2);
//     this.mass = 20;
//     this.G = 1;
//     this.dragOffset = new PVector(0, 0);
//     this.dragging = false;
//     this.rollover = false;
// };

// Attractor.prototype.calculateAttraction = function(mover) {
//     // Calculate direction of force
//     var force = PVector.sub(this.position, mover.position);
//     // Distance between objects       
//     var distance = force.mag();
//     // Limiting the distance to eliminate "extreme"
//     // results for very close or very far objects                            
//     distance = constrain(distance, 5, 25);
//     // Normalize vector                   
//     force.normalize();
//     // Calculate gravitional force magnitude  
//     var strength = (this.G * this.mass * mover.mass) / (distance * distance);
//     // Get force vector --> magnitude * direction
//     force.mult(strength);
//     return force;
// };

// // Method to display
// Attractor.prototype.display = function() {
//     ellipseMode(CENTER);
//     strokeWeight(4);
//     stroke(0);
//     if (this.dragging) {
//         fill(50, 50, 50);
//     } else if (this.rollover) {
//         fill(100, 100, 100);
//     } else {
//         fill(175, 175, 175, 200);
//     }
//     ellipse(this.position.x, this.position.y, this.mass*2, this.mass*2);
// };

// // The methods below are for mouse interaction
  
// Attractor.prototype.handleHover = function(mx, my) {
//     var d = dist(mx, my, this.position.x, this.position.y);
//     if (d < this.mass) {
//         this.rollover = true;
//     } else {
//         this.rollover = false;
//     }
// };

// Attractor.prototype.handlePress = function(mx, my) {
//     var d = dist(mx, my, this.position.x, this.position.y);
//     if (d < this.mass) {
//         debug("setting dragging to true");
//         this.dragging = true;
//         this.dragOffset.x = this.position.x - mx;
//         this.dragOffset.y = this.position.y - my;
//     }
// };

// Attractor.prototype.handleDrag = function(mx, my) {
//     debug("should we be dragging?" + this.dragging);
//     if (this.dragging) {
//         this.position.x = mx + this.dragOffset.x;
//         this.position.y = my + this.dragOffset.y;
//     }
// };

// Attractor.prototype.stopDragging = function() {
//     debug("setting dragging to false");
//     this.dragging = false;
// };


// var Mover = function(mass, x, y) {
//     this.position = new PVector(x, y);
//     this.velocity = new PVector(1, 0);
//     this.acceleration = new PVector(0, 0);
//     this.mass = mass;
// };
  
// Mover.prototype.applyForce = function(force) {
//     var f = PVector.div(force,this.mass);
//     this.acceleration.add(f);
// };
  
// Mover.prototype.update = function() {
//     this.velocity.add(this.acceleration);
//     this.position.add(this.velocity);
//     this.acceleration.mult(0);
// };

// Mover.prototype.display = function() {
//     stroke(0);
//     strokeWeight(2);
//     fill(255, 255, 255, 127);
//     ellipse(this.position.x, this.position.y, this.mass*16, this.mass*16);
// };

// Mover.prototype.checkEdges = function() {
//     if (this.position.x > width) {
//         this.position.x = width;
//         this.velocity.x *= -1;
//     } else if (this.position.x < 0) {
//         this.velocity.x *= -1;
//         this.position.x = 0;
//     }
//     if (this.position.y > height) {
//         this.velocity.y *= -1;
//         this.position.y = height;
//     }
// };

// var movers = [];
// var attractor = new Attractor();

// for (var i = 0; i < 10; i++) {
//     movers[i] = new Mover(random(0.1, 2), random(width), random(height));
// }

// var draw = function() {
//     background(50, 50, 50);

//     attractor.display();
//     for (var i = 0; i < movers.length; i++) {
//         var force = attractor.calculateAttraction(movers[i]);
//         movers[i].applyForce(force);

//         movers[i].update();
//         movers[i].display();
//     }
// };


// var mouseMoved = function() {
//     attractor.handleHover(mouseX, mouseY);
// };

// var mousePressed = function() {
//     attractor.handlePress(mouseX, mouseY);
// };

// var mouseDragged = function() {
//     attractor.handleHover(mouseX, mouseY);
//     attractor.handleDrag(mouseX, mouseY);
// };

// var mouseReleased = function() {
//     attractor.stopDragging();
// };


