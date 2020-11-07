/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';

import { __ } from '@wordpress/i18n';

import './style.scss';

import Edit from './edit';
import save from './save';

registerBlockType('create-block/flipbox', {
	title: __('Flipbox', 'flipbox'),

	description: __('Example block written with ESNext standard and JSX support – build step required.', 'flipbox'),

	category: 'widgets',
	icon: 'smiley',
	supports: {
		html: false
	},

	attributes: {

		flipStyle: {
			type: 'string',
			default: 'up'
		},
		uploadAvatar: {
			type: 'object',
			default: {}
		},
		flipSpeed: {
			type: 'number',
			default: 0.7
		},
		flipDepth: {
			type: 'boolean',
			default: false
		},
		flipHeight: {
			type: 'number',
			default: 300
		},
		frontTitle: {
			type: 'string',
			default: 'John Doe'
		},
		frontTitleFontSize: {
			type: 'number',
			default: 26
		},
		frontContentFontSize: {
			type: 'number',
			default: 16
		},
		frontContent: {
			type: 'string',
			default:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
		},

		frontBgColor: {
			type: 'string',
			default: '#f5f5f5'
		},

		frontTitleColor: {
			type: 'string',
			default: '#000'
		},

		frontContentColor: {
			type: 'string',
			default: '#000'
		},


		backTitle: {
			type: 'string',
			default: 'John Doe'
		},
		backTitleFontSize: {
			type: 'number',
			default: 26
		},
		backContentFontSize: {
			type: 'number',
			default: 16
		},
		backContent: {
			type: 'string',
			default:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
		},

		backBgColor: {
			type: 'string',
			default: '#f5f5f5'
		},

		backTitleColor: {
			type: 'string',
			default: '#000'
		},

		backContentColor: {
			type: 'string',
			default: '#000'
		},
	},

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save
});
