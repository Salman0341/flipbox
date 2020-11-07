/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { isEmpty, get } from 'lodash';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
function save(props) {

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
		flipHeight,
		flipSwitch
	} = props.attributes;

	const allowDepth = flipDepth && 'depth-effect';

	return (
		<div className={`cwp_flipbox_wrapper ${flipStyle} ${allowDepth} ${flipSwitch}`} style={{minHeight:flipHeight}}>
				<div className="cwp_flipper">
					<div className="cwp_front" style={{ transitionDuration: flipSpeed + 's', backgroundColor: frontBgColor, minHeight:flipHeight }}>
						<div className="cwp_front_wrapper">
							<div className="et_pb_front_flipbox_image">
								{!isEmpty(uploadAvatar) && <img src={get(uploadAvatar, 'url')} />}
							</div>
							<div className="et_pb_flipbox_container">
								<div dangerouslySetInnerHTML={{__html: frontTitle }} style={{ fontSize: frontTitleFontSize, color: frontTitleColor }}></div> 
								<div className="cwp_front_description">
								   <div dangerouslySetInnerHTML={{__html: frontContent }} style={{ fontSize: frontContentFontSize, color: frontContentColor }}></div> 
								</div>
							</div>
						</div>
					</div>
					<div className="cwp_back" style={{ transitionDuration: flipSpeed + 's', backgroundColor: backBgColor, minHeight:flipHeight }}>
						<div className="cwp_back_wrapper">
							<div className="et_pb_flipbox_container">
							  <div dangerouslySetInnerHTML={{__html: backTitle }} style={{ fontSize: backTitleFontSize, color: backTitleColor }}></div> 
								<div className="cwp_back_description">
								  <div dangerouslySetInnerHTML={{__html: backContent }} style={{ fontSize: backContentFontSize, color: backContentColor }}></div> 
								</div>
								<div className="cwp_button_wrapper" />
							</div>
						</div>
					</div>
				</div>
			</div>
	);
}

export default save;
