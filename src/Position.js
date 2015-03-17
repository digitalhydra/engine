'use strict';

var Transitionable = require('famous-transitions').Transitionable;

/**
 * @class Position
 * @constructor
 * @component
 * @param {LocalDispatch} dispatch LocalDispatch to be retrieved from corresponding Render Node of the Position component
 */
function Position(dispatch) {
    this._dispatch = dispatch;
    this._id = dispatch.addComponent(this);
    this._x = new Transitionable(0);
    this._y = new Transitionable(0);
    this._z = new Transitionable(0);
}

/** 
*
* stringifies Position constructor
*
* @method
* @return string the definition of the Component Class: 'Position'
*/
Position.toString = function toString() {
    return 'Position';
};

/**
*
* Gets object containing stringified constructor, x, y, z coordinates
*
* @method
* @return object
*/
Position.prototype.getState = function getState() {
    return {
        component: this.constructor.toString(),
        x: this._x.get(),
        y: this._y.get(),
        z: this._z.get()
    };
};

/**
*
* Setter for position coordinates
*
* @method
* @param {object} state Object -- component: stringified constructor, x: number, y: number, z: number
* @return boolean true on success
*/
Position.prototype.setState = function setState(state) {
    if (state.component === this.constructor.toString()) {
        this.set(state.x, state.y, state.z);
        return true;
    }
    return false;
};

/**
*
* Getter for X position
*
* @method
* @return number
*/
Position.prototype.getX = function getX() {
    return this._x.get();
};

/**
*
* Getter for Y position
*
* @method
* @return number
*/
Position.prototype.getY = function getY() {
    return this._y.get();
};

/**
*
* Getter for Z position
*
* @method
* @return number
*/
Position.prototype.getZ = function getZ() {
    return this._z.get();
};

/**
*
* Getter for any active coordinates
*
* @method
* @return boolean
*/
Position.prototype.isActive = function isActive() {
    return this._x.isActive() || this._y.isActive() || this._z.isActive();
};

/** 
*
* If true, component is to be updated on next engine tick
*
* @method
* @return boolean
*/
Position.prototype.clean = function clean() {
    var context = this._dispatch.getContext();
    context.setPosition(this._x.get(), this._y.get(), this._z.get());
    return this.isActive();
};

/** 
*
* Setter for X position
*
* @method
* @param {number} val used to set x coordinate
* @param {object} options options hash
* @param {function} callback function to execute after setting X
* @chainable
*/
Position.prototype.setX = function setX(val, options, callback) {
    this._dispatch.dirtyComponent(this._id);
    this._x.set(val, options, callback);
    return this;
};

/** 
*
* Setter for Y position
*
* @method
* @param {number} val used to set y coordinate
* @param {object} options options hash
* @param {function} callback function to execute after setting Y
* @chainable
*/
Position.prototype.setY = function setY(val, options, callback) {
    this._dispatch.dirtyComponent(this._id);
    this._y.set(val, options, callback);
    return this;
};

/** 
*
* Setter for Z position
*
* @method
* @param {number} val used to set z coordinate
* @param {object} options options hash
* @param {function} callback function to execute after setting Z
* @chainable
*/
Position.prototype.setZ = function setZ(val, options, callback) {
    this._dispatch.dirtyComponent(this._id);
    this._z.set(val, options, callback);
    return this;
};


/**
*
* Setter for XYZ position with callback
*
* @method
* @param {number} x used to set x coordinate
* @param {number} y used to set y coordinate
* @param {number} z used to set z coordinate
* @param {object} options options hash
* @param {function} callback function to execute after setting each coordinate
* @chainable
*/
Position.prototype.set = function set(x, y, z, options, callback) {
    this._dispatch.dirtyComponent(this._id);
    this._x.set(x, options);
    this._y.set(y, options);
    this._z.set(z, options, callback);
    return this;
};

/**
*
* Stops transition of Position component
*
* @method
* @chainable
*/
Position.prototype.halt = function halt() {
    this._x.halt();
    this._y.halt();
    this._z.halt();
    return this;
};

module.exports = Position;
