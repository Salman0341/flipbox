import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	RichText,
	BlockControls
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	SelectControl,
	RangeControl,
	FormToggle,
	PanelRow,
	ColorPalette,
	__experimentalRadio as Radio,
	__experimentalRadioGroup as RadioGroup,
	ToolbarGroup,
	ToolbarButton
} from '@wordpress/components';
import { isEmpty, get } from 'lodash';

import './editor.scss';

function Edit(props) {
	const [ flipSwitch, setFlipSwitch ] = useState('front');

	const ALLOWED_MEDIA_TYPES = [ 'image' ];
	const {
		uploadAvatar,
		frontTitle,
		frontContent,
		backTitle,
		backContent,
		flipStyle,
		flipSpeed,
		flipDepth,
		frontTitleFontSize,
		frontContentFontSize,
		backTitleFontSize,
		backContentFontSize,
		frontBgColor,
		backBgColor,
		backTitleColor,
		backContentColor,
		frontContentColor,
		frontTitleColor,
		flipHeight
	} = props.attributes;

	const allowDepth = flipDepth && 'depth-effect';

	const colors = [
		{ name: 'red', color: '#f00' },
		{ name: 'white', color: '#fff' },
		{ name: 'blue', color: '#00f' }
	];

	return (
		<Fragment>
			<div
				className={`cwp_flipbox_wrapper ${flipStyle} ${allowDepth} ${flipSwitch}`}
				style={{ minHeight: flipHeight }}
			>
				<div className="cwp_flipper">
					<div
						className="cwp_front"
						style={{
							transitionDuration: flipSpeed + 's',
							backgroundColor: frontBgColor,
							minHeight: flipHeight
						}}
					>
						<div className="cwp_front_wrapper">
							<div className="et_pb_front_flipbox_image">
								{!isEmpty(uploadAvatar) && <img src={get(uploadAvatar, 'url')} />}
							</div>
							<div className="et_pb_flipbox_container">
								<RichText
									style={{ fontSize: frontTitleFontSize, color: frontTitleColor }}
									value={frontTitle}
									tagName="h2"
									onChnage={(newFrontTitle) => props.setAttributes({ frontTitle: newFrontTitle })}
								/>
								<div className="cwp_front_description">
									<RichText
										style={{ fontSize: frontContentFontSize, color: frontContentColor }}
										value={frontContent}
										tagName="p"
										onChnage={(newFrontContent) =>
											props.setAttributes({ frontContent: newFrontContent })}
									/>
								</div>
							</div>
						</div>
					</div>
					<div
						className="cwp_back"
						style={{
							transitionDuration: flipSpeed + 's',
							backgroundColor: backBgColor,
							minHeight: flipHeight
						}}
					>
						<div className="cwp_back_wrapper">
							<div className="et_pb_flipbox_container">
								<RichText
									style={{ fontSize: backTitleFontSize, color: backTitleColor }}
									value={backTitle}
									tagName="h2"
									onChange={(newBackTitle) => props.setAttributes({ backTitle: newBackTitle })}
								/>
								<div className="cwp_back_description">
									<RichText
										style={{ fontSize: backContentFontSize, color: backContentColor }}
										value={backContent}
										tagName="p"
										onChange={(newBackContent) =>
											props.setAttributes({ backContent: newBackContent })}
									/>
								</div>
								<div className="cwp_button_wrapper" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<InspectorControls>
				<PanelBody title="General">
					<SelectControl
						label="Flipbox Style"
						value={flipStyle}
						options={[
							{ label: 'up', value: 'up' },
							{ label: 'Left', value: 'left' },
							{ label: 'Right', value: 'right' },
							{ label: 'Bottom', value: 'down' }
						]}
						onChange={(newflipStyle) => props.setAttributes({ flipStyle: newflipStyle })}
					/>
					<PanelRow>
						<span>Upload Front Image</span>
						<MediaUploadCheck>
							<MediaUpload
								label="Flipbox Style"
								onSelect={(media) => props.setAttributes({ uploadAvatar: media })}
								allowedTypes={ALLOWED_MEDIA_TYPES}
								value={uploadAvatar}
								render={({ open }) => {
									return (
										<Button
											isPrimary
											onClick={() => {
												if (isEmpty(uploadAvatar)) {
													open();
													console.log('salman');
												} else {
													props.setAttributes({ uploadAvatar: {} });
												}
											}}
										>
											{isEmpty(uploadAvatar) ? ' Open Image ' : ' remove Image'}
										</Button>
									);
								}}
							/>
						</MediaUploadCheck>
					</PanelRow>
					<RangeControl
						label="Speed (sec)"
						value={flipSpeed}
						onChange={(newFlipSpeed) => props.setAttributes({ flipSpeed: newFlipSpeed })}
						min={0}
						max={5}
						step={0.1}
					/>
					<PanelRow>
						<span>3D Depth</span>
						<FormToggle
							checked={flipDepth}
							onChange={(newflipDepth) => props.setAttributes({ flipDepth: !flipDepth })}
						/>
					</PanelRow>

					<RangeControl
						label="Flibox Height"
						value={flipHeight}
						onChange={(newflipHeight) => props.setAttributes({ flipHeight: newflipHeight })}
						min={1}
						max={1000}
					/>
				</PanelBody>
				<PanelBody title="Front">
					<span>Background Color</span>
					<br />
					<br />
					<ColorPalette
						colors={colors}
						value={frontBgColor}
						onChange={(newfrontBgColor) => props.setAttributes({ frontBgColor: newfrontBgColor })}
					/>
					<RangeControl
						label="Title Font Size"
						value={frontTitleFontSize}
						onChange={(newfrontTitleFontSize) =>
							props.setAttributes({ frontTitleFontSize: newfrontTitleFontSize })}
						min={1}
						max={100}
					/>
					<span>Title Color</span>
					<br />
					<br />
					<ColorPalette
						colors={colors}
						value={frontTitleColor}
						onChange={(newfrontTitleColor) => props.setAttributes({ frontTitleColor: newfrontTitleColor })}
					/>
					<RangeControl
						label="Content Font Size"
						value={frontContentFontSize}
						onChange={(newfrontContentFontSize) =>
							props.setAttributes({ frontContentFontSize: newfrontContentFontSize })}
						min={1}
						max={100}
					/>
					<span>Content Color</span>
					<br />
					<br />
					<ColorPalette
						colors={colors}
						value={frontContentColor}
						onChange={(newfrontContentColor) =>
							props.setAttributes({ frontContentColor: newfrontContentColor })}
					/>
				</PanelBody>

				<PanelBody title="Back">
					<span>Background Color</span>
					<br />
					<br />
					<ColorPalette
						colors={colors}
						value={backBgColor}
						onChange={(newbackBgColor) => props.setAttributes({ backBgColor: newbackBgColor })}
					/>
					<RangeControl
						label="Title Font Size"
						value={backTitleFontSize}
						onChange={(newbackTitleFontSize) =>
							props.setAttributes({ backTitleFontSize: newbackTitleFontSize })}
						min={1}
						max={100}
					/>
					<span>Title Color</span>
					<br />
					<br />
					<ColorPalette
						colors={colors}
						value={backTitleColor}
						onChange={(newbackTitleColor) => props.setAttributes({ backTitleColor: newbackTitleColor })}
					/>
					<RangeControl
						label="Content Font Size"
						value={backContentFontSize}
						onChange={(newbackContentFontSize) =>
							props.setAttributes({ backContentFontSize: newbackContentFontSize })}
						min={1}
						max={100}
					/>
					<span>Content Color</span>
					<br />
					<br />
					<ColorPalette
						colors={colors}
						value={backContentColor}
						onChange={(newbackContentColor) =>
							props.setAttributes({ backContentColor: newbackContentColor })}
					/>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton onClick={() => setFlipSwitch(flipSwitch === 'front' ? 'back' : 'front')}>
						{flipSwitch === 'front' ? 'Switch to Back' : 'Switch to Front'}
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>
		</Fragment>
	);
}

export default Edit;
