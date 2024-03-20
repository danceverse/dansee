// may actually need to define the proper locations
import Slider from './Slider Imports/slider.js';
import Component from './Slider Imports/component.js';
import * as Dom from './Slider Imports/dom.js';
import {clamp} from './Slider Imports/num.js';
import {IS_IOS, IS_ANDROID} from './Slider Imports/browser.js';
class SpeedSliderTest extends Slider {
 
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
        const mousePlaybackRateDisplay // WHERE YOU LEFT OFF //
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