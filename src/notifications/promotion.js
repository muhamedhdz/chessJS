// src/notifications/promotion.js
const Notification = require('./notification.js');

/**
 * PromotionNotification constructor.
 * @param {?Object} options - optional parameters
 *   - pos: {rank, file}  position where promotion happened
 *   - newType: string     constructor name of the new piece (e.g., "Queen")
 * @constructor
 */
const PromotionNotification = function (options = {}) {
  this.pos = options.pos || { rank: 1, file: 1 };
  this.newType = options.newType || 'Queen';
};

// Inheritance definition
PromotionNotification.prototype = Object.create(Notification.prototype);
PromotionNotification.prototype.constructor = PromotionNotification;

module.exports = PromotionNotification;
