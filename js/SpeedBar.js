// may actually need to define the proper locations
import Slider from './Slider Imports/slider.js';
import Component from './Slider Imports/component.js';
import * as Dom from './Slider Imports/dom.js';
import {clamp} from './Slider Imports/num.js';
import {IS_IOS, IS_ANDROID} from './Slider Imports/browser.js';
class SpeedBar extends Slider {
 
    constructor(player, options) {
        // Calling the constructor of parent class (Slider)
        super(player, options);

        // Initializing event listeners
        this.on('slideractive', (e) => this.updateLastSpeed_(e));
        this.on(player, 'ratechange', (e) => this.updateARIAAttributes(e));
        
        player.ready(() => this.updateARIAAttributes());
    }

    /**
     * Create the 'Component`' DOM element
     * 
     * @return {Element}
     *         The element that was created.
     */
    createEl() {
        return super.createEl('div', {
            // may need to alter slightly
            className: 'vjs-volume-bar vjs-slider-bar'
        }, {
            'aria-label': this.localize('Playback Rate'),
            'aria-live': 'polite'
        });
    }

    /**
     * Handle mouse down on playback rate bar
     * 
     * @param {Event} event
     *        The 'mousedown' event that caused this to run.
     * 
     * @listens mousedown
     */
    handleMouseDown(event) {
        if (!Dom.isSingleLeftClick(event)) {
            return;
        }

        super.handleMouseDown(event);
    }

    /**
     *                               not sure if this @link part makes sense lol
     * Handle movement events on the {@link PlaybackRateMenuButton}.
     * 
     * @param {Event} event
     *        The event that caused this function to run.
     * 
     * @listens mousemove
     */
    handleMouseMove(event) {
        const mousePlaybackRateDisplay = this.getChild('mousePlaybackRateDisplay'); // WHERE YOU LEFT OFF //

        if (mousePlaybackRateDisplay) {
            const speedBarEl = this.el();
            const speedBarRect = Dom.getBoundingClientRect(speedBarEl);
            const vertical = this.vertical();
            let speedBarPoint = Dom.getPointerPosition(speedBarEl, event);

            speedBarPoint = vertical ? speedBarPoint.y : speedBarPoint.x;
            // The default skin has a gap on either side of the `SpeedBar`. This means
            // that it's possible to trigger this behavior outside the boundaries of
            // the `SpeedBar`. This ensures we stay within it at all times.
            speedBarPoint = clamp(speedBarPoint, 0, 1);
            mousePlaybackRateDisplay.update(speedBarRect, speedBarPoint, vertical);
        }

        if (!Dom.isSingleLeftClick(event)) {
            return;
        }

        // might need to like console.log this shit or sum cuz i have no idea what range of values the
        // calculateDistance thing returns and we may need to scale the value appropriately
        this.player_.playbackRate(this.calculateDistance(event));
    }

    /**
     * Update ARIA accessibility attributes
     * 
     * @param {Event} [event]
     *      the 'ratechange' event that caused this function to run
     * 
     * @listens Player#ratechange
     */
    updateARIAAttributes(event) {
        const ariaValue = this.player_.playbackRate();
        this.el_.setAttribute('aria-valuenow', ariaValue);
        this.el_.setAttribute('aria-valuetext', ariaValue + 'x');
    }

    /**
     * When user drags the SpeedBar, store the speed and listen for
     * the end of the drag. When the drag ends, if the speed was set
     * to zero, set lastSpeed to the stored speed.
     * 
     * @listens slideractive
     * @private
     */
    updateLastSpeed_() {
        const speedBeforeDrag = this.player_.playbackRate();

        this.one('sliderinactive', () => {
            if (this.player_.playbackRate() === 0) {
                // volume bar: this.player_.lastVolume_(volumeBeforeDrag);
                this.player_.playbackRate(speedBeforeDrag);
            }
        });
    }
}

/**
 * Default options for the `SpeedBar`
 *
 * @type {Object}
 * @private
 */
SpeedBar.prototype.options_ = {
    children: [
      'speedLevel'
    ],
    barName: 'speedLevel'
};
  
// MouseVolumeLevelDisplay tooltip should not be added to a player on mobile devices
if (!IS_IOS && !IS_ANDROID) {
  SpeedBar.prototype.options_.children.splice(0, 0, 'mousePlaybackRateDisplay');
}
  
/**
 * Call the update event for this Slider when this event happens on the player.
 *
 * @type {string}
 */
SpeedBar.prototype.playerEvent = 'speedchange';
  
Component.registerComponent('SpeedBar', SpeedBar);
export default SpeedBar;